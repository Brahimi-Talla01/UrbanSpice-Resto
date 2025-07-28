import { useContext } from 'react';
import { StoreContext } from '../contexts/StoreContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ToastContainer } from 'react-toastify';

const Favorite = () => {

    const { card_menu, heartItems, addToCart, removeToHeart } = useContext(StoreContext);

    const navigate = useNavigate();

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100'>
            
            <div className='w-full px-4 sm:px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto py-6 md:py-12'>

                <div className='text-center mb-8 md:mb-12'>
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3'>
                        <span className='text-2xl md:text-3xl animate-pulse'>❤️</span>
                        Vos fovoris
                    </h1>
                    <div className='w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full'></div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>

                    {/* Section Cart */}
                        {!heartItems || Object.keys(heartItems).length === 0 ? (
                        <div className='lg:col-span-3 space-y-6 text-center py-16 bg-white shadow rounded-lg border border-gray-100'>
                            <div className='max-w-md mx-auto flex flex-col items-center'>
                                <div className='w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center'>
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                    </svg>
                                </div>
                                <h3 className='text-xl font-semibold text-gray-800 mb-3'>Vous n'avez pas de favoris</h3>
                                <p className='text-gray-600 mb-6'>Découvrez nos délicieux plats et ajoutez-les dans vos favoris</p>
                                <button 
                                    onClick={() => navigate('/')}
                                    className='flex gap-2 px-8 py-3 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer'
                                >
                                    <ArrowLeft />
                                    Retourner au menu
                                </button>
                            </div>
                        </div>
                        ) : (
                        card_menu.map((item, index) => {
                            if (heartItems[item.id] > 0) {
                            return (
                                <div key={index} className='w-full flex items-start flex-col justify-between rounded-lg shadow hover:scale-102 hover:shadow-lg duration-300 bg-white overflow-hidden p-2.5 group'>

                                    <div className='w-full h-40 rounded-md overflow-hidden relative'>
                                        <img 
                                            src={item.image} 
                                            alt={item.title}
                                            className='w-full h-full object-cover' 
                                        />
                                    </div>

                                    <div className='flex justify-between items-center w-full'>
                                        <div className='px-2 py-1 rounded-full bg-background-top-light my-2'>
                                            <h1 className='text-lg font-outfit'>{item.menu}</h1>
                                        </div>
                                        <img src={item.start} alt="Start" className='w-20' />
                                    </div>

                                    <div className='flex items-center justify-between w-full'>
                                        <h1 className='text-xl font-semibold font-outfit'>{item.title}</h1>
                                        <p className='text-light text-sm font-semibold'>{item.price}</p>
                                    </div>

                                    <div className='w-full flex justify-between gap-1 my-2'>
                                        <button
                                            onClick={() => removeToHeart(item.id)} 
                                            className='px-8 py-2 bg-yellow-500 text-white text-sm font-semibold rounded cursor-pointer hover:bg-yellow-600 transform hover:scale-102 transition-all duration-200 shadow-lg hover:shadow-xl'
                                        >
                                            Retirer
                                        </button>

                                        <button
                                            onClick={() => addToCart(item.id)}
                                            className='px-8 py-2 bg-yellow-500 text-white text-sm font-semibold rounded cursor-pointer hover:bg-yellow-600 transform hover:scale-102 transition-all duration-200 shadow-lg hover:shadow-xl'
                                        >
                                            Ajouter au panier
                                        </button>
                                    </div>
                                </div>
                            )
                            }
                        })
                        )}
                </div>

            </div>
            <ToastContainer 
                position="top-right"
                autoClose ={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default Favorite;
