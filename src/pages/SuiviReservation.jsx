import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, CalendarDays, CheckCircle2, Clock, RefreshCw, Search } from 'lucide-react';
import { getReservationByToken } from '../../services/reservationApi';

// Suivi de réservation client — même modèle que SuiviCommande.jsx :
// URL publique avec JETON aléatoire (32 hex) au lieu de l'id (anti-énumération),
// payload public sans données personnelles (nom/email/téléphone/message
// retirés côté serveur), rafraîchissement auto toutes les 30 s.
const TOKEN_REGEX = /^[a-f0-9]{32}$/i;

const SuiviReservation = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchToken, setSearchToken] = useState('');
    const intervalRef = useRef(null);

    const loadReservation = async (tkn, { poll = false } = {}) => {
        // Le n° de suivi affiché dans les emails est groupé : on retire les
        // espaces avant de valider/coller dans l'URL.
        const normalized = String(tkn).replace(/\s+/g, '');
        if (!TOKEN_REGEX.test(normalized)) {
            if (poll) return; // jamais d'erreur pendant un rafraîchissement auto
            setReservation(null);
            setError('N° de suivi invalide (32 caractères hexadécimaux).');
            return;
        }

        // Polling silencieux : pas de spinner, l'affichage en cours reste visible.
        if (!poll) setLoading(true);

        try {
            if (!poll) setError(null);
            const response = await getReservationByToken(normalized, { poll });
            if (response.unchanged) {
                // Throttle serveur partagé par session (multi-onglets) :
                // déjà servi il y a < 10 s — l'affichage actuel reste valable.
                return;
            }
            setReservation(response.reservation);
        } catch (err) {
            if (poll) {
                // Onglet devenu invisible / 429 transitoire : on garde l'affichage.
                console.warn('Poll suivi réservation ignoré :', err?.status ?? err);
                return;
            }
            setReservation(null);
            if (err?.status === 404) {
                setError('Aucune réservation ne correspond à ce n° de suivi. Vérifiez-le dans votre confirmation.');
            } else if (err?.status === 429) {
                setError(err?.message || 'Trop de rafraîchissements : réessayez dans quelques instants.');
            } else {
                setError('Impossible de récupérer la réservation. Réessayez plus tard.');
                console.error(err);
            }
        } finally {
            if (!poll) setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            loadReservation(token);
            setSearchToken(String(token));
        } else {
            setReservation(null);
            setError(null);
        }
    }, [token]);

    // Rafraîchissement automatique (30 s) tant qu'une réservation est affichée.
    // Multi-onglets : tick flaggé poll=1 (throttle serveur partagé par session
    // → 1 lecture complète / 10 s tous onglets confondus), pause si l'onglet
    // est caché, rafraîchissement immédiat au retour au premier plan.
    useEffect(() => {
        if (!reservation || loading) return undefined;
        const tick = () => {
            if (document.hidden) return; // onglet en arrière-plan : aucune requête
            loadReservation(token, { poll: true });
        };
        intervalRef.current = setInterval(tick, 30000);
        const onVisibility = () => {
            if (!document.hidden) loadReservation(token); // retour au 1er plan : frais
        };
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            clearInterval(intervalRef.current);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [reservation, loading, token]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Espaces acceptés : on peut coller le n° tel qu'il apparaît dans l'email.
        const trimmed = searchToken.replace(/\s+/g, '');
        if (!TOKEN_REGEX.test(trimmed)) {
            toast.error('N° de suivi invalide : 32 caractères hexadécimaux.');
            return;
        }
        navigate(`/suivi-reservation/${trimmed.toLowerCase()}`);
    };

    const isConfirmed = reservation?.is_completed == 1;

    return (
        <div className='w-full px-4 sm:px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto py-6 md:py-12'>
            <div className='mb-3'>
                <Link to='/' className='ml-4 cursor-pointer flex items-center gap-1 text-gray-700 hover:text-yellow-600 transition-colors'>
                    <ArrowLeft />Retour
                </Link>
            </div>

            <div className='max-w-2xl mx-auto'>
                <div className='text-center mb-8'>
                    <h1 className='text-2xl md:text-4xl font-bold font-outfit text-gray-900 mb-2'>
                        Suivi de réservation
                    </h1>
                    <p className='text-gray-600'>
                        Collez votre n° de suivi (fourni après la réservation) pour vérifier son statut.
                    </p>
                </div>

                <form onSubmit={handleSearch} className='flex items-stretch gap-2 mb-8'>
                    <input
                        type='text'
                        value={searchToken}
                        onChange={(e) => setSearchToken(e.target.value)}
                        placeholder='N° de suivi (32 caractères)'
                        className='flex-1 px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500'
                    />
                    <button
                        type='submit'
                        disabled={loading}
                        className='px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold rounded shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
                    >
                        <Search size={18} />
                        Rechercher
                    </button>
                </form>

                {loading && (
                    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center'>
                        <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500 mx-auto mb-4'></div>
                        <p className='text-gray-500'>Recherche de la réservation…</p>
                    </div>
                )}

                {!loading && error && (
                    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center'>
                        <div className='w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <CalendarDays size={28} className='text-red-500' />
                        </div>
                        <p className='text-gray-800 font-semibold mb-2'>Réservation introuvable</p>
                        <p className='text-gray-600 text-sm mb-6'>{error}</p>
                        <Link
                            to='/#reservation'
                            className='inline-block px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors'
                        >
                            Réserver une table
                        </Link>
                    </div>
                )}

                {!loading && !error && reservation && (
                    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
                        {/* En-tête : n° + statut + date de demande */}
                        <div className='bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-100 p-6 flex items-center justify-between flex-wrap gap-4'>
                            <div>
                                <p className='text-xs text-gray-500 uppercase tracking-wide'>Réservation</p>
                                <h2 className='text-2xl font-bold text-gray-900'>#{reservation.id_reservation}</h2>
                                <p className='text-sm text-gray-600 mt-1'>
                                    Demande effectuée le {new Date(reservation.created_at).toLocaleString('fr-FR')}
                                </p>
                            </div>
                            <div className='flex items-center gap-3'>
                                {isConfirmed ? (
                                    <span className='px-3 py-1.5 text-sm rounded-full bg-green-100 text-green-700 font-medium'>✅ Confirmée</span>
                                ) : (
                                    <span className='px-3 py-1.5 text-sm rounded-full bg-yellow-100 text-yellow-700 font-medium'>⏳ En attente</span>
                                )}
                                <button
                                    onClick={() => loadReservation(reservation.tracking_token)}
                                    className='p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-yellow-600 hover:border-yellow-300 transition-colors cursor-pointer'
                                    title='Actualiser le statut'
                                >
                                    <RefreshCw size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Déroulé en 2 étapes (is_completed : 0 = en attente, 1 = confirmée) */}
                        <div className='px-6 py-4 border-b border-gray-100 flex items-center gap-3 flex-wrap'>
                            <div className='flex items-center gap-2'>
                                <div className='w-7 h-7 bg-green-100 rounded-full flex items-center justify-center'>
                                    <CheckCircle2 size={16} className='text-green-600' />
                                </div>
                                <span className='text-sm font-medium text-gray-800'>Demande reçue</span>
                            </div>
                            <div className='flex-1 min-w-[40px] h-px bg-gray-200'></div>
                            <div className='flex items-center gap-2'>
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isConfirmed ? 'bg-green-100' : 'bg-yellow-100'}`}>
                                    {isConfirmed
                                        ? <CheckCircle2 size={16} className='text-green-600' />
                                        : <Clock size={16} className='text-yellow-600' />}
                                </div>
                                <span className={`text-sm font-medium ${isConfirmed ? 'text-gray-800' : 'text-yellow-700'}`}>
                                    {isConfirmed ? 'Confirmée par le restaurant' : 'Confirmation en cours'}
                                </span>
                            </div>
                        </div>

                        {/* Détails de la réservation */}
                        <div className='p-6'>
                            <h3 className='font-bold text-gray-900 mb-4'>Détails de votre réservation</h3>
                            <ul className='divide-y divide-gray-100'>
                                <li className='flex items-center justify-between py-3'>
                                    <span className='text-sm text-gray-600'>Date</span>
                                    <span className='text-sm font-medium text-gray-900'>
                                        {new Date(reservation.date_).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                </li>
                                <li className='flex items-center justify-between py-3'>
                                    <span className='text-sm text-gray-600'>Heure</span>
                                    <span className='text-sm font-medium text-gray-900'>{reservation.heure}</span>
                                </li>
                                <li className='flex items-center justify-between py-3'>
                                    <span className='text-sm text-gray-600'>Nombre de places</span>
                                    <span className='text-sm font-medium text-gray-900'>{reservation.nb_place} place(s)</span>
                                </li>
                            </ul>

                            <p className='text-xs text-gray-500 mt-4'>
                                Cette page se met à jour automatiquement. Un changement à prévoir ?{' '}
                                <Link to='/#contact' className='text-yellow-600 hover:underline'>Contactez-nous</Link>.
                            </p>
                        </div>
                    </div>
                )}

                {!loading && !error && !reservation && (
                    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center'>
                        <div className='w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <CalendarDays size={28} className='text-yellow-600' />
                        </div>
                        <p className='text-gray-800 font-semibold mb-1'>Où trouver mon n° de suivi ?</p>
                        <p className='text-gray-600 text-sm'>
                            Il figure dans la confirmation affichée après votre réservation (« N° de suivi »)
                            et dans votre lien de suivi.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuiviReservation;
