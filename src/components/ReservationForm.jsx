import { useState } from 'react';
import { assets } from '../assets/assets/assets';
import { createReservation } from '../../services/reservationApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ReservationForm = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(30);
    const [reservationId, setReservationId] = useState(null);
    const [trackingToken, setTrackingToken] = useState(null); // jeton de suivi
    let countdownInterval = null;

    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        telephone: '',
        date: '',
        heure: '',
        nb_place: 1,
        message: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Fonction pour démarrer le compte à rebours
    const startCountdown = () => {
        if (countdownInterval) clearInterval(countdownInterval);
        
        countdownInterval = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
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

    // Suivre la réservation : ouvre la page de suivi publique
    // /suivi-reservation/<jeton> (annule le compte à rebours)
    const goToTracking = () => {
        if (countdownInterval) clearInterval(countdownInterval);
        setShowSuccessPopup(false);
        navigate(`/suivi-reservation/${trackingToken}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validation
        if (!formData.nom || !formData.email || !formData.telephone) {
            toast.error("Veuillez remplir tous les champs obligatoires");
            setIsSubmitting(false);
            return;
        }

        if (!formData.date || !formData.heure) {
            toast.error("Veuillez choisir une date et une heure");
            setIsSubmitting(false);
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0); 
    
        const reservationDate = new Date(formData.date);
        reservationDate.setHours(0, 0, 0, 0);
        
        if (reservationDate < today) {
            toast.error("Vous ne pouvez pas réserver pour une date passée. Veuillez choisir une date future.");
            setIsSubmitting(false);
            return;
        }
        
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        if (reservationDate > maxDate) {
            toast.error("Vous ne pouvez pas réserver plus d'un an à l'avance.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await createReservation(formData);

            if (response.success) {
                setReservationId(response.reservation_id);
                setTrackingToken(response.tracking_token);
                setShowSuccessPopup(true);
                startCountdown();
            } else {
                toast.error(response.message || "Erreur lors de la réservation");
            }
        } catch (error) {
            toast.error("Erreur lors de la création de la réservation");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className='w-full bg-background-top-light'>
                <div className='w-full px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-36 mx-auto overflow-hidden md:mt-16 pb-6'>
                    <h1 className='text-xl md:text-4xl font-semibold text-light text-center py-8 font-outfit'>Réservez un séjour chez-nous!</h1>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-0 md:gap-8 overflow-hidden py-6'>

                        <div className='bg-white rounded-md overflow-hidden order-1 md:order-1'>
                            <img 
                                src={assets.urbanSpice} 
                                alt="Hero about" 
                                className='w-full h-full object-cover' 
                            />
                        </div>

                        <div className='w-full h-full order-2 md:order-2'>
                            <form onSubmit={handleSubmit} className='space-y-6'>
                                {/* Nom et Email */}
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>Nom *</label>
                                        <input 
                                            type="text" 
                                            name="nom"
                                            value={formData.nom}
                                            onChange={handleInputChange}
                                            required
                                            placeholder='Entrez votre nom' 
                                            className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200'
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>Email *</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder='votre@email.com' 
                                            className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200'
                                        />
                                    </div>
                                </div>
                                
                                {/* Téléphone */}
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>Téléphone *</label>
                                    <input 
                                        type="tel" 
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder='+237 XXX XXX XXX' 
                                        className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200'
                                    />
                                </div>
                                
                                {/* Date */}
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>Date *</label>                                
                                    <input 
                                        type="date" 
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                        className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200'
                                    />
                                </div>
                                
                                {/* Heure et Nombre de places */}
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>Heure *</label>
                                        <input 
                                            type="time" 
                                            name="heure"
                                            value={formData.heure}
                                            onChange={handleInputChange}
                                            required
                                            className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500'
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>Nombre de places</label>
                                        <input 
                                            type="number" 
                                            name="nb_place"
                                            value={formData.nb_place}
                                            onChange={handleInputChange}
                                            min="1"
                                            max="20"
                                            className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500'
                                        />
                                    </div>
                                </div>
                                
                                {/* Message */}
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>Votre message</label>
                                    <textarea 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder='Votre message ici...' 
                                        rows="3"
                                        className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200'
                                    />
                                </div>
                                
                                {/* Bouton de soumission */}
                                <div className='pt-4'>
                                    <button 
                                        type='submit' 
                                        disabled={isSubmitting}
                                        className='w-full cursor-pointer py-2 px-6 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold text-lg rounded shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                                    >
                                        <span className='flex items-center justify-center gap-2'>
                                            {isSubmitting ? (
                                                <> Envoi en cours...</>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                    Réservez maintenant
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup de confirmation de réservation */}
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
                        
                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white text-center">
                            <div className="flex justify-center mb-2">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-xl font-bold">Réservation confirmée !</h2>
                            <p className="text-sm opacity-90">
                                Réservation #{reservationId}
                            </p>
                        </div>
                        
                        <div className="p-6 text-center">
                            <p className="text-gray-800 font-medium mb-2">
                                Merci d'avoir réservé chez <span className="font-bold text-yellow-600">UrbanSpice</span> ! 🍽️
                            </p>
                            <p className="text-gray-600 text-sm mb-4">
                                Nous vous contacterons dans les minutes qui suivent pour confirmer votre réservation.
                            </p>

                            {/* N° de suivi : à conserver pour retrouver la réservation */}
                            {trackingToken && (
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4 text-left">
                                    <p className="text-xs text-gray-500 mb-1">N° de suivi (à conserver) :</p>
                                    <p className="text-sm font-mono font-semibold text-gray-900 break-all select-all">{trackingToken}</p>
                                </div>
                            )}
                            
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
                        
                        <div className="bg-gray-50 p-4 flex gap-3">
                            <button
                                onClick={goToTracking}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors cursor-pointer flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Suivre ma réservation
                            </button>
                            <button
                                onClick={closePopupAndRedirect}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Accueil
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReservationForm;