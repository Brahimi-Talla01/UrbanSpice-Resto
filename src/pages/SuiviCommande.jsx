import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, CheckCircle2, Clock, Package, RefreshCw, Search } from 'lucide-react';
import { getOrderByToken } from '../../services/orderApi';

// Suivi de commande client (roadmap featureAvenir n°6) — route PUBLIQUE.
// L'URL contient un JETON aléatoire (32 hex, généré à la création, renvoyé
// par order→create) au lieu de l'id : impossible de deviner l'existence
// d'une commande en incrémentant un numéro (le backend retire aussi les
// données personnelles du payload public).
const TOKEN_REGEX = /^[a-f0-9]{32}$/i;

const SuiviCommande = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);   // message d'erreur affichable
    const [searchToken, setSearchToken] = useState('');
    const intervalRef = useRef(null);          // polling (rafraîchissement auto)

    const loadOrder = async (tkn, { poll = false } = {}) => {
        // Le n° de suivi affiché dans les emails est groupé (« 0d28e6c6 bd23… ») :
        // on retire les espaces avant de valider/coller dans l'URL.
        const normalized = String(tkn).replace(/\s+/g, '');
        if (!TOKEN_REGEX.test(normalized)) {
            if (poll) return; // jamais d'erreur pendant un rafraîchissement auto
            setOrder(null);
            setError('N° de suivi invalide (32 caractères hexadécimaux).');
            return;
        }

        // Polling silencieux : pas de spinner, l'affichage en cours reste visible.
        if (!poll) setLoading(true);

        try {
            if (!poll) setError(null);
            const response = await getOrderByToken(normalized, { poll });
            if (response.unchanged) {
                // Throttle serveur partagé par session (multi-onglets) :
                // déjà servi il y a < 10 s — l'affichage actuel reste valable.
                return;
            }
            setOrder(response.order);
        } catch (err) {
            if (poll) {
                // Onglet devenu invisible / 429 transitoire : on garde l'affichage,
                // le prochain tick réessaiera (le serveur reste protegé).
                console.warn('Poll suivi commande ignoré :', err?.status ?? err);
                return;
            }
            setOrder(null);
            if (err?.status === 404) {
                // Même réponse côté serveur pour jeton inconnu / malformé :
                // aucun oracle, on invite l'utilisateur à vérifier son n°.
                setError('Aucune commande ne correspond à ce n° de suivi. Vérifiez-le dans votre confirmation.');
            } else if (err?.status === 429) {
                setError(err?.message || 'Trop de rafraîchissements : réessayez dans quelques instants.');
            } else {
                setError('Impossible de récupérer la commande. Réessayez plus tard.');
                console.error(err);
            }
        } finally {
            if (!poll) setLoading(false);
        }
    };

    // Chargement à chaque changement d'URL (/suivi/<jeton>) — sans jeton : saisie
    useEffect(() => {
        if (token) {
            loadOrder(token);
            setSearchToken(String(token));
        } else {
            setOrder(null);
            setError(null);
        }
    }, [token]);

    // Rafraîchissement automatique toutes les 30 s tant qu'une commande est
    // affichée (le bouton « Actualiser » reste disponible pour forcer).
    // Multi-onglets : chaque tick est flaggé poll=1 → le throttle serveur,    // partagé par la session PHP, ne sert qu'1 lecture complète / 10 s quel
    // que soit le nombre d'onglets ; l'onglet caché ne poll pas, et le retour
    // au premier plan déclenche un rafraîchissement immédiat.
    useEffect(() => {
        if (!order || loading) return undefined;
        const tick = () => {
            if (document.hidden) return; // onglet en arrière-plan : aucune requête
            loadOrder(token, { poll: true });
        };
        intervalRef.current = setInterval(tick, 30000);
        const onVisibility = () => {
            if (!document.hidden) loadOrder(token); // retour au 1er plan : frais
        };
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            clearInterval(intervalRef.current);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [order, loading, token]);

    // Recherche par n° de suivi : navigation vers /suivi/<jeton>
    // (l'URL reste partageable / copiable depuis la confirmation).
    const handleSearch = (e) => {
        e.preventDefault();
        // Espaces acceptés : on peut coller le n° tel qu'il apparaît dans l'email.
        const trimmed = searchToken.replace(/\s+/g, '');
        if (!TOKEN_REGEX.test(trimmed)) {
            toast.error('N° de suivi invalide : 32 caractères hexadécimaux (ex. : 0d28e6c6…).');
            return;
        }
        navigate(`/suivi/${trimmed.toLowerCase()}`);
    };

    const isCompleted = order?.is_completed == 1;

    return (
        <div className='w-full px-4 sm:px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto py-6 md:py-12'>
            <div className='mb-3'>
                <Link to='/' className='ml-4 cursor-pointer flex items-center gap-1 text-gray-700 hover:text-yellow-600 transition-colors'>
                    <ArrowLeft />Retour
                </Link>
            </div>

            <div className='max-w-2xl mx-auto'>
                {/* Titre + recherche par n° de suivi */}
                <div className='text-center mb-8'>
                    <h1 className='text-2xl md:text-4xl font-bold font-outfit text-gray-900 mb-2'>
                        Suivi de commande
                    </h1>
                    <p className='text-gray-600'>
                        Collez votre n° de suivi (fourni après la commande) pour connaître le statut en temps réel.
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

                {/* Chargement */}
                {loading && (
                    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center'>
                        <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500 mx-auto mb-4'></div>
                        <p className='text-gray-500'>Recherche de la commande…</p>
                    </div>
                )}

                {/* Erreur (jeton inconnu, invalide, réseau) */}
                {!loading && error && (
                    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center'>
                        <div className='w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <Package size={28} className='text-red-500' />
                        </div>
                        <p className='text-gray-800 font-semibold mb-2'>Commande introuvable</p>
                        <p className='text-gray-600 text-sm mb-6'>{error}</p>
                        <Link
                            to='/card'
                            className='inline-block px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors'
                        >
                            Passer commande
                        </Link>
                    </div>
                )}

                {/* Commande trouvée */}
                {!loading && !error && order && (
                    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
                        {/* En-tête : n° + statut + date */}
                        <div className='bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-100 p-6 flex items-center justify-between flex-wrap gap-4'>
                            <div>
                                <p className='text-xs text-gray-500 uppercase tracking-wide'>Commande</p>
                                <h2 className='text-2xl font-bold text-gray-900'>#{order.id_commande}</h2>
                                <p className='text-sm text-gray-600 mt-1'>
                                    Passée le {new Date(order.created_at).toLocaleString('fr-FR')}
                                </p>
                            </div>
                            <div className='flex items-center gap-3'>
                                {isCompleted ? (
                                    <span className='px-3 py-1.5 text-sm rounded-full bg-green-100 text-green-700 font-medium'>✅ Terminée</span>
                                ) : (
                                    <span className='px-3 py-1.5 text-sm rounded-full bg-yellow-100 text-yellow-700 font-medium'>⏳ En attente</span>
                                )}
                                <button
                                    onClick={() => loadOrder(order.tracking_token)}
                                    className='p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-yellow-600 hover:border-yellow-300 transition-colors cursor-pointer'
                                    title='Actualiser le statut'
                                >
                                    <RefreshCw size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Déroulé en 2 étapes (seule la valeur métier existe : is_completed) */}
                        <div className='px-6 py-4 border-b border-gray-100 flex items-center gap-3 flex-wrap'>
                            <div className='flex items-center gap-2'>
                                <div className='w-7 h-7 bg-green-100 rounded-full flex items-center justify-center'>
                                    <CheckCircle2 size={16} className='text-green-600' />
                                </div>
                                <span className='text-sm font-medium text-gray-800'>Commande reçue</span>
                            </div>
                            <div className='flex-1 min-w-[40px] h-px bg-gray-200'></div>
                            <div className='flex items-center gap-2'>
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-100' : 'bg-yellow-100'}`}>
                                    {isCompleted
                                        ? <CheckCircle2 size={16} className='text-green-600' />
                                        : <Clock size={16} className='text-yellow-600' />}
                                </div>
                                <span className={`text-sm font-medium ${isCompleted ? 'text-gray-800' : 'text-yellow-700'}`}>
                                    {isCompleted ? 'Terminée' : 'En préparation'}
                                </span>
                            </div>
                        </div>

                        {/* Articles commandés */}
                        <div className='p-6'>
                            <h3 className='font-bold text-gray-900 mb-4'>Articles commandés</h3>
                            {order.items && order.items.length > 0 ? (
                                <ul className='divide-y divide-gray-100'>
                                    {order.items.map((item, index) => (
                                        <li key={index} className='flex items-center justify-between py-3'>
                                            <div>
                                                <p className='text-sm font-medium text-gray-900'>{item.title}</p>
                                                <p className='text-xs text-gray-500'>
                                                    {item.quantity} × {Number(item.price).toLocaleString('fr-FR')} XAF
                                                </p>
                                            </div>
                                            <span className='text-sm font-semibold text-gray-900'>
                                                {(Number(item.price) * item.quantity).toLocaleString('fr-FR')} XAF
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className='text-sm text-gray-500'>Détail des articles non disponible pour cette commande.</p>
                            )}

                            <div className='mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex justify-between items-center'>
                                <span className='font-bold text-gray-900'>Total</span>
                                <span className='text-xl font-bold text-yellow-600'>
                                    {Number(order.total_amount).toLocaleString('fr-FR')} {order.currency || 'XAF'}
                                </span>
                            </div>

                            <p className='text-xs text-gray-500 mt-4'>
                                Cette page se met à jour automatiquement. Une question sur votre livraison ?{' '}
                                <Link to='/' className='text-yellow-600 hover:underline'>Contactez-nous</Link>.
                            </p>
                        </div>
                    </div>
                )}

                {/* Pas de jeton dans l'URL : invite à utiliser le n° de suivi */}
                {!loading && !error && !order && (
                    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center'>
                        <div className='w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <Package size={28} className='text-yellow-600' />
                        </div>
                        <p className='text-gray-800 font-semibold mb-1'>Où trouver mon n° de suivi ?</p>
                        <p className='text-gray-600 text-sm'>
                            Il figure dans la confirmation affichée après votre commande (« N° de suivi »)
                            et dans votre lien de suivi. Ex. : 0d28e6c6bd23c0b567c3a3828f469664
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuiviCommande;
