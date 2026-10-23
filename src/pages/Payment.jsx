// frontend/src/pages/Payment.jsx — page de paiement SIMULÉE (frontend only)
// Aucun appel backend : le clic sur « Payer » simule un traitement (1,5 s)
// puis affiche « Merci d'avoir effectué le paiement, à la prochaine ! ».
// Entrée : bouton « Payer (simulation) » du panier (Card.jsx).
// Voir docs/paiement_simulation.md
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../contexts/StoreContext';
import { ToastContainer, toast } from 'react-toastify';
import { CreditCard, Smartphone, CheckCircle, ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';

const PAY_MESSAGE = "Merci d'avoir effectué le paiement, à la prochaine !";

const Payment = () => {
    const { getTotalAmount } = useContext(StoreContext);
    const navigate = useNavigate();
    const total = getTotalAmount();

    const [method, setMethod] = useState('mobile');
    const [identifier, setIdentifier] = useState('');
    const [cardName, setCardName] = useState('');
    const [processing, setProcessing] = useState(false);
    const [paid, setPaid] = useState(false);

    const handlePay = (e) => {
        e.preventDefault();
        if (total <= 0 || processing) return;

        if (!identifier.trim()) {
            toast.error(
                method === 'mobile'
                    ? 'Entrez votre numéro Mobile Money'
                    : 'Entrez le numéro de votre carte'
            );
            return;
        }
        if (method === 'card' && !cardName.trim()) {
            toast.error('Entrez le nom inscrit sur la carte');
            return;
        }

        setProcessing(true);
        // Simulation : aucun appel réseau, aucune donnée envoyée
        window.setTimeout(() => {
            setProcessing(false);
            setPaid(true);
            toast.success(PAY_MESSAGE);
        }, 1500);
    };

    // ── Écran de succès (simulation terminée) ─────────────────────────
    if (paid) {
        return (
            <div className='w-full px-4 sm:px-8 max-w-lg mx-auto py-16'>
                <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden text-center'>
                    <div className='bg-gradient-to-r from-green-500 to-green-600 p-6 text-white'>
                        <div className='flex justify-center mb-3'>
                            <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-bounce'>
                                <CheckCircle size={36} className='text-white' />
                            </div>
                        </div>
                        <h1 className='text-2xl font-bold'>Paiement effectué !</h1>
                        <p className='text-sm opacity-90 mt-1'>
                            {total.toLocaleString('fr-FR')} XAF — démonstration
                        </p>
                    </div>

                    <div className='p-6'>
                        <p className='text-lg font-semibold text-gray-900 mb-2'>{PAY_MESSAGE} 🎉</p>
                        <p className='text-sm text-gray-500 mb-6'>
                            Ceci était une simulation : aucun paiement réel n'a été effectué et
                            aucune donnée n'a été envoyée.
                        </p>
                        <div className='flex gap-3'>
                            <button
                                onClick={() => navigate('/')}
                                className='flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors cursor-pointer font-semibold flex items-center justify-center gap-2'
                            >
                                <ArrowLeft size={18} />
                                Retour à l'accueil
                            </button>
                            <button
                                onClick={() => navigate('/card')}
                                className='flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer font-semibold'
                            >
                                Voir le panier
                            </button>
                        </div>
                    </div>
                </div>

                <ToastContainer
                    position='top-right'
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        );
    }

    // ── Panier vide : rien à payer ────────────────────────────────────
    if (total <= 0) {
        return (
            <div className='w-full px-4 sm:px-8 max-w-lg mx-auto py-16 text-center'>
                <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8'>
                    <p className='text-4xl mb-3'>🛒</p>
                    <h1 className='text-xl font-bold text-gray-900 mb-2'>Aucun montant à payer</h1>
                    <p className='text-gray-500 text-sm mb-6'>
                        Ajoutez des articles à votre panier pour tester le paiement simulé.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className='px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors cursor-pointer font-semibold'
                    >
                        Voir les menus
                    </button>
                </div>

                <ToastContainer
                    position='top-right'
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        );
    }

    // ── Formulaire de paiement (simulation) ───────────────────────────
    return (
        <div className='w-full px-4 sm:px-8 max-w-lg mx-auto py-10'>
            <button
                onClick={() => navigate('/card')}
                className='ml-4 mb-4 cursor-pointer flex items-center gap-1 text-gray-700'
            >
                <ArrowLeft size={18} />
                Retour au panier
            </button>

            <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8'>
                <h1 className='text-2xl font-bold text-gray-900 mb-1'>Paiement</h1>
                <p className='text-sm text-gray-500 mb-6'>
                    Paiement <span className='font-semibold text-yellow-600'>simulé</span> — démonstration, aucun envoi réel.
                </p>

                {/* Total à payer */}
                <div className='bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-4 mb-6 flex justify-between items-center'>
                    <span className='text-lg font-bold text-gray-900'>Total à payer</span>
                    <span className='text-2xl font-bold text-yellow-600'>
                        {total.toLocaleString('fr-FR')} XAF
                    </span>
                </div>

                <form onSubmit={handlePay} className='space-y-5'>
                    {/* Moyen de paiement */}
                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700'>Moyen de paiement</label>
                        <div className='grid grid-cols-2 gap-3'>
                            <button
                                type='button'
                                onClick={() => setMethod('mobile')}
                                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 cursor-pointer font-semibold text-sm transition-all ${
                                    method === 'mobile'
                                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                                        : 'border-gray-200 bg-white text-gray-600 hover:border-yellow-300'
                                }`}
                            >
                                <Smartphone size={18} />
                                Mobile Money
                            </button>
                            <button
                                type='button'
                                onClick={() => setMethod('card')}
                                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 cursor-pointer font-semibold text-sm transition-all ${
                                    method === 'card'
                                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                                        : 'border-gray-200 bg-white text-gray-600 hover:border-yellow-300'
                                }`}
                            >
                                <CreditCard size={18} />
                                Carte bancaire
                            </button>
                        </div>
                    </div>

                    {/* Identifiant de paiement */}
                    <div className='space-y-2'>
                        <label htmlFor='pay-identifier' className='block text-sm font-medium text-gray-700'>
                            {method === 'mobile' ? 'Numéro Mobile Money *' : 'Numéro de carte *'}
                        </label>
                        <input
                            id='pay-identifier'
                            type='tel'
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                            maxLength={25}
                            placeholder={method === 'mobile' ? '+237 6XX XX XX XX' : '0000 0000 0000 0000'}
                            className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500'
                        />
                    </div>

                    {method === 'card' && (
                        <div className='space-y-2'>
                            <label htmlFor='pay-cardname' className='block text-sm font-medium text-gray-700'>
                                Nom sur la carte *
                            </label>
                            <input
                                id='pay-cardname'
                                type='text'
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                required
                                maxLength={60}
                                placeholder='EX : SAMUEL ESSINO'
                                className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500'
                            />
                        </div>
                    )}

                    {/* Bouton Payer */}
                    <button
                        type='submit'
                        disabled={processing}
                        className='w-full py-3 px-6 cursor-pointer bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold text-lg rounded shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'
                    >
                        {processing ? (
                            <>
                                <Loader2 size={20} className='animate-spin' />
                                Paiement en cours...
                            </>
                        ) : (
                            <>Payer {total.toLocaleString('fr-FR')} XAF</>
                        )}
                    </button>

                    {/* Mention de simulation */}
                    <p className='flex items-start gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3'>
                        <ShieldCheck size={16} className='text-green-600 shrink-0 mt-0.5' />
                        Démonstration : cette page n'envoie aucune donnée et n'effectue aucun paiement réel.
                    </p>
                </form>
            </div>

            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Payment;
