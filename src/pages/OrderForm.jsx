import { useContext } from 'react'
import { StoreContext } from '../contexts/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const OrderForm = () => {

    const { getTotalAmount, getTotalCart } = useContext(StoreContext);

    const navigate = useNavigate();

    return (
        <div className='w-full px-4 sm:px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto py-6 md:py-12'>

            <div className='mb-3'>
                <button onClick={() => navigate('/card')} className='ml-4 cursor-pointer flex items-center gap-1'> <ArrowLeft />Retour</button>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
                {/* Section Formulaire */}
                <div className='lg:col-span-2'>
                    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-8'>
                        <h1 className='text-xl md:text-4xl font-bold font-outfit mb-8 text-gray-900'>
                            Informations de livraison
                        </h1>
                        
                        <form className='space-y-6'>
                            {/* Nom et Prénom */}
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>Prénom</label>
                                    <input 
                                        type="text" 
                                        placeholder='Entrez votre prénom' 
                                        className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200 hover:border-gray-300' 
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>Nom de famille</label>
                                    <input 
                                        type="text" 
                                        placeholder='Entrez votre nom' 
                                        className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200 hover:border-gray-300' 
                                    />
                                </div>
                            </div>
                            
                            {/* Email */}
                            <div className='space-y-2'>
                                <label className='block text-sm font-medium text-gray-700'>Adresse e-mail</label>
                                <input 
                                    type="email" 
                                    placeholder='votre@email.com' 
                                    className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200 hover:border-gray-300' 
                                />
                            </div>
                            
                            {/* Adresse */}
                            <div className='space-y-2'>
                                <label className='block text-sm font-medium text-gray-700'>Adresse complète</label>                                
                                <input 
                                    type="text" 
                                    placeholder='Numéro et nom de rue' 
                                    className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200 hover:border-gray-300' 
                                />
                            </div>
                            
                            {/* Ville et Quartier */}
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>Ville</label>
                                    <input 
                                        type="text" 
                                        placeholder='Votre ville' 
                                        className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200 hover:border-gray-300' 
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>Quartier</label>
                                    <input 
                                        type="text" 
                                        placeholder='Votre quartier' 
                                        className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200 hover:border-gray-300' 
                                    />
                                </div>
                            </div>
                            
                            {/* Téléphone */}
                            <div className='space-y-2'>
                                <label className='block text-sm font-medium text-gray-700'>Numéro de téléphone</label>
                                <input 
                                    type="tel" 
                                    placeholder='+237 6XX XXX XXX' 
                                    className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200 hover:border-gray-300' 
                                />
                            </div>
                            
                            {/* Bouton de soumission */}
                            <div className='pt-4'>
                                <button 
                                    type='submit' 
                                    className='w-full py-2 px-6 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold text-lg rounded shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-200'
                                >
                                    <span className='flex items-center justify-center gap-2'>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Procéder au paiement
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
                                <span className='text-2xl font-bold text-yellow-600'>{getTotalAmount()} XAF</span>
                            </div>
                        </div>
                        
                        {/* Security Info */}
                        <div className='text-xs text-gray-500 space-y-3 bg-gray-50 rounded-lg p-4'>
                            
                            <p className='flex items-center gap-2 font-medium'>
                            <div className='w-5 h-5 bg-green-100 rounded-full flex items-center justify-center'>
                                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            Paiement 100% sécurisé
                            </p>
                            <p className='flex items-center gap-2 font-medium'>
                            <div className='w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center'>
                                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            Livraison en 30-45 min
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default OrderForm;
