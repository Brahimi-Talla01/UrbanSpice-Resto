import { useContext, useState } from 'react'
import { StoreContext } from '../contexts/StoreContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, CheckCircle, Home } from 'lucide-react';
import { createOrder } from '../../services/orderApi';
import { toast } from 'react-toastify';

const OrderForm = () => {
    const { getTotalAmount, getTotalCart, cartItems, card_menu } = useContext(StoreContext);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(30);
    const [orderId, setOrderId] = useState(null);
    let countdownInterval = null;

    // État local pour le formulaire
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        city: '',
        neighborhood: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Fonction pour récupérer les articles du panier
    const getOrderItems = () => {
        const items = [];
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const menuItem = card_menu.find(item => String(item.id) === String(itemId));
                if (menuItem) {
                    const price = typeof menuItem.price === 'number' 
                        ? menuItem.price 
                        : parseFloat(String(menuItem.price).split(' ')[0]) || 0;
                    
                    items.push({
                        id: itemId,
                        title: menuItem.title,
                        price: price,
                        quantity: cartItems[itemId],
                        total: price * cartItems[itemId]
                    });
                }
            }
        }
        return items;
    };
 
    // Fonction pour démarrer le compte à rebours
    const startCountdown = () => {
        if (countdownInterval) clearInterval(countdownInterval);
        
        countdownInterval = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                    // Rediriger vers l'accueil après 30s
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Fonction pour fermer la popup et rediriger immédiatement
    const closePopupAndRedirect = () => {
        if (countdownInterval) clearInterval(countdownInterval);
        setShowSuccessPopup(false);
        navigate('/');
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Validation
        if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone) {
            toast.error("Veuillez remplir tous les champs obligatoires");
            setIsSubmitting(false);
            return;
        }
        
        const items = getOrderItems();
        const totalAmount = getTotalAmount();
        
        if (items.length === 0) {
            toast.error("Votre panier est vide");
            setIsSubmitting(false);
            return;
        }
        
        const orderData = {
            ...formData,
            items: items,
            total_amount: totalAmount
        };
        
        try {
            const response = await createOrder(orderData);
            
            if (response.success) {
                // Réinitialiser le compte à rebours
                setSecondsLeft(30);
                setOrderId(response.order_id);
                // Afficher la popup de succès
                setShowSuccessPopup(true);
                // Démarrer le compte à rebours
                startCountdown();
                
                // Vider le panier (optionnel)
                // Vous pouvez ajouter une fonction pour vider le panier ici
                
            } else {
                toast.error(response.message || "Erreur lors de la création");
            }
        } catch (error) {
            toast.error("Erreur lors de la création de la commande");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className='w-full px-4 sm:px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto py-6 md:py-12'>
                <div className='mb-3'>
                    <button onClick={() => navigate('/card')} className='ml-4 cursor-pointer flex items-center gap-1'> 
                        <ArrowLeft />Retour
                    </button>
                </div>
                
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
                    
                    {/* Section Formulaire */}
                    <div className='lg:col-span-2'>
                        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-8'>
                            <h1 className='text-xl md:text-4xl font-bold font-outfit mb-8 text-gray-900'>
                                Informations de livraison
                            </h1>
                            
                            <form onSubmit={handleSubmitOrder} className='space-y-6'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>Prénom *</label>
                                        <input 
                                            type="text" 
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder='Entrez votre prénom' 
                                            className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500'
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>Nom de famille *</label>
                                        <input 
                                            type="text" 
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder='Entrez votre nom' 
                                            className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500'
                                        />
                                    </div>
                                </div>
                                
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>Adresse e-mail *</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder='votre@email.com' 
                                        className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500'
                                    />
                                </div>
                                
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>Adresse complète</label>                                
                                    <input 
                                        type="text" 
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder='Numéro et nom de rue' 
                                        className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500'
                                    />
                                </div>
                                
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>Ville</label>
                                        <input 
                                            type="text" 
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder='Votre ville' 
                                            className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500'
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>Quartier</label>
                                        <input 
                                            type="text" 
                                            name="neighborhood"
                                            value={formData.neighborhood}
                                            onChange={handleInputChange}
                                            placeholder='Votre quartier' 
                                            className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500'
                                        />
                                    </div>
                                </div>
                                
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>Numéro de téléphone *</label>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder='+237 6XX XXX XXX' 
                                        className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500'
                                    />
                                </div>
                                
                                <div className='pt-4'>
                                    <button 
                                        type='submit' 
                                        disabled={isSubmitting}
                                        className='w-full cursor-pointer py-2 px-6 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold text-lg rounded shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                                    >
                                        <span className='flex items-center justify-center gap-2'>
                                            {isSubmitting ? (
                                                <>⏳ Envoi en cours...</>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                    Commander votre menu
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Section Summary */}
                    <div className='lg:col-span-1'>
                        <div className='bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6'>
                            <h2 className='text-lg font-outfit font-bold text-gray-900 mb-6 flex items-center gap-2'>
                                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                </svg>
                                Résumé de commande
                            </h2>

                            <div className='space-y-4 mb-6'>
                                <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                                    <span className='text-gray-600 font-medium'>Nombre de plats</span>
                                    <span className='font-bold text-gray-900 bg-yellow-100 px-3 py-1 rounded-full text-sm'>{getTotalCart()}</span>
                                </div>
                                <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                                    <span className='text-gray-600 font-medium'>Frais de livraison</span>
                                    <span className='font-semibold text-green-600'>Gratuit</span>
                                </div>
                            </div>
                            
                            <div className='bg-yellow-50 border border-yellow-200 rounded p-4 mb-6'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-lg font-bold text-gray-900'>Total à payer</span>
                                    <span className='text-2xl font-bold text-yellow-600'>{getTotalAmount().toLocaleString('fr-FR')} XAF</span>
                                </div>
                            </div>
                            
                            <div className='text-xs text-gray-500 space-y-3 bg-gray-50 rounded-lg p-4'>
                                <div className='flex items-center gap-2 font-medium'>
                                    <div className='w-5 h-5 bg-green-100 rounded-full flex items-center justify-center'>
                                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    Paiement 100% sécurisé
                                </div>
                                <div className='flex items-center gap-2 font-medium'>
                                    <div className='w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center'>
                                        <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    Livraison en 30-45 min
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup de confirmation de commande */}
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
                        
                        {/* Header de la popup */}
                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white text-center">
                            <div className="flex justify-center mb-2">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                                    <CheckCircle size={32} className="text-white" />
                                </div>
                            </div>
                            <h2 className="text-xl font-bold">Commande confirmée !</h2>
                            <p className="text-sm opacity-90">
                                Commande #{orderId}
                            </p>
                        </div>
                        
                        {/* Corps de la popup */}
                        <div className="p-6 text-center">
                            <p className="text-gray-800 font-medium mb-2">
                                Merci d'avoir commandé chez <span className="font-bold text-yellow-600">UrbanSpice</span> ! 🍽️
                            </p>
                            <p className="text-gray-600 text-sm mb-4">
                                Nous vous contacterons dans les minutes qui suivent afin d'organiser la livraison de votre commande.
                            </p>
                            
                            {/* Icônes de livraison */}
                            <div className="flex justify-center gap-6 my-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                        </svg>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-1">En cuisine</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-1">Préparation</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-1">Livraison</span>
                                </div>
                            </div>
                            
                            {/* Compte à rebours */}
                            <div className="bg-gray-100 rounded-lg p-3 mt-4">
                                <p className="text-sm text-gray-600">
                                    Redirection vers l'accueil dans
                                </p>
                                <div className="flex justify-center items-baseline gap-1">
                                    <span className="text-3xl font-bold text-yellow-600">{secondsLeft}</span>
                                    <span className="text-gray-500">secondes</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                    <div 
                                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-1.5 rounded-full transition-all duration-1000"
                                        style={{ width: `${(secondsLeft / 30) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Footer de la popup */}
                        <div className="bg-gray-50 p-4 flex gap-3">
                            <button
                                onClick={closePopupAndRedirect}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer flex items-center justify-center gap-2"
                            >
                                <Home size={18} />
                                Accueil maintenant
                            </button>
                            <button
                                onClick={closePopupAndRedirect}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors cursor-pointer flex items-center justify-center gap-2"
                            >
                                <CheckCircle size={18} />
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderForm;