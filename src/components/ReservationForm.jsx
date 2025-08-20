import { assets } from '../assets/assets/assets';

const ReservationForm = () => {
    return (
        <div className='w-full bg-background-top-light'>
            <div className='w-full md:px-8 lg:px-24 max-w-screen-2xl mx-auto overflow-hidden md:mt-16 pb-6'>
                <h1 className='text-xl md:text-4xl font-semibold text-light text-center py-8 font-outfit'>Réservez un séjour chez-nous!</h1>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-0 md:gap-8 overflow-hidden py-6'>

                    <div className='bg-white rounded-md overflow-hidden order-1 md:order-1 '>
                        <img 
                            src={assets.urbanSpice} 
                            alt="Hero about" 
                            className='w-full h-full object-cover' 
                        />
                    </div>

                    <div className='w-full h-full order-2 md:order-2'>
                        <form className='space-y-6'>
                            {/* Nom et Prénom */}
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>Nom</label>
                                    <input 
                                        type="text" 
                                        placeholder='Entrez votre nom' 
                                        className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200 hover:border-gray-300' 
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                                    <input 
                                        type="email" 
                                        placeholder='votre@email.com' 
                                        className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200 hover:border-gray-300' 
                                    />
                                </div>
                            </div>
                            
                            {/* Téléphone */}
                            <div className='space-y-2'>
                                <label className='block text-sm font-medium text-gray-700'>Téléphone</label>
                                <input 
                                    type="tel" 
                                    placeholder='+237 XXX XXX XXX' 
                                    className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200 hover:border-gray-300' 
                                />
                            </div>
                            
                            {/* Date */}
                            <div className='space-y-2'>
                                <label className='block text-sm font-medium text-gray-700'>Date</label>                                
                                <input 
                                    type="date" 
                                    placeholder='mm/dd/yyyy' 
                                    className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200 hover:border-gray-300' 
                                />
                            </div>
                            
                            {/* Ville et Quartier */}
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>Heure</label>
                                    <input 
                                        type="time" 
                                        placeholder='15h00' 
                                        className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200 hover:border-gray-300' 
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>Nombre de place</label>
                                    <input 
                                        type="number" 
                                        placeholder='05' 
                                        className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200 hover:border-gray-300' 
                                    />
                                </div>
                            </div>
                            
                            {/* Message */}
                            <div className='space-y-2'>
                                <label className='block text-sm font-medium text-gray-700'>Votre message</label>
                                <textarea 
                                    placeholder='Votre message ici...' 
                                    className='w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-3 focus:ring-yellow-100 focus:border-yellow-500 transition duration-200 hover:border-gray-300' 
                                />
                            </div>
                            
                            {/* Bouton de soumission */}
                            <div className='pt-4'>
                                <button 
                                    type='submit' 
                                    className='w-full cursor-pointer py-2 px-6 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold text-lg rounded shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-200'
                                >
                                    <span className='flex items-center justify-center gap-2'>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Réservez maintenant
                                    </span>
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReservationForm;
