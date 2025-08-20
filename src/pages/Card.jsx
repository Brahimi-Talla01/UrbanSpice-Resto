import { useContext } from 'react';
import { StoreContext } from '../contexts/StoreContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ArrowRight } from 'lucide-react';

const Card = () => {

  const navigate = useNavigate();

  const { card_menu, cartItems, addToCart, removeToCart, getTotalAmount, getTotalCart, removeAllToCart } = useContext(StoreContext);

  console.log(cartItems);
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100'>

      <div className='w-full px-4 sm:px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto py-6 md:py-12'>
        <div className='text-center mb-8 md:mb-12'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3'>
            <span className='text-2xl md:text-3xl animate-pulse'>❤️</span>
            Votre panier
          </h1>
          <div className='w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full'></div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>

          {/* Section Cart */}
          <div className='lg:col-span-2 space-y-6'>
            {!cartItems || Object.keys(cartItems).length === 0 ? (
              <div className='text-center py-16 bg-white rounded-lg shadow-lg border border-gray-100'>
                <div className='max-w-md mx-auto'>
                  <div className='w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center'>
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                  </div>
                  <h3 className='text-xl font-semibold text-gray-800 mb-3'>Votre panier est vide</h3>
                  <p className='text-gray-600 mb-6'>Découvrez nos délicieux plats et ajoutez-les à votre panier</p>
                  <button 
                    onClick={() => navigate('/')}
                    className='px-8 py-3 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl'
                  >
                    Retourner au menu
                  </button>
                </div>
              </div>
            ) : (
              card_menu.map((item, index) => {
                if (cartItems[item.id] > 0) {
                  return (
                    <div key={index} className='bg-white shadow-lg hover:shadow-xl rounded-2xl p-6 border border-gray-100 transform hover:scale-[1.01] transition-all duration-300'>
                      <div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
                        
                        {/* Image */}
                        <div className='w-full md:w-54 h-40 overflow-hidden rounded-xl shadow-md'>
                          <img src={item.image} alt="Food" className='w-full h-full object-cover hover:scale-110 transition-transform duration-500' />
                        </div>

                        {/* Content */}
                        <div className='flex flex-col md:flex-row justify-between w-full gap-6'>
                          
                          {/* Info */}
                          <div className='flex-1'>
                            <h3 className='text-xl md:text-2xl font-bold text-gray-800 mb-4'>{item.title}</h3>
                            
                            <div className='space-y-2'>
                              <div className='flex items-center gap-2'>
                                <span className='text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>Prix unitaire</span>
                                <span className='font-bold text-lg text-gray-800'>{item.price}</span>
                              </div>
                              <div className='flex items-center gap-2'>
                                <span className='text-sm font-medium text-white bg-yellow-500 px-3 py-1 rounded-full'>Total</span>
                                <span className='font-bold text-xl text-yellow-600'>{(item.price).split(" ")[0] * cartItems[item.id]} XAF</span>
                              </div>
                            </div>
                          </div>

                          {/* Controls */}
                          <div className='flex flex-col gap-4 min-w-fit'>
                            
                            {/* Quantity Controls */}
                            <div className='flex items-center justify-center bg-gray-50 rounded-xl p-2 gap-3'>
                              <button
                                onClick={() => removeToCart(item.id)}
                                disabled={cartItems[item.id] <= 1}
                                className='w-10 h-10 bg-yellow-500 cursor-pointer text-white text-xl font-bold rounded hover:bg-yellow-600 hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300'
                              >
                                -
                              </button>
                              
                              <div className='bg-white border-2 border-yellow-200 rounded px-4 py-1 min-w-[3rem] text-center'>
                                <span className='text-xl font-bold text-gray-800'>{cartItems[item.id]}</span>
                              </div>
                              
                              <button 
                                onClick={() => addToCart(item.id)} 
                                className='w-10 h-10 bg-yellow-500 cursor-pointer text-white text-xl font-bold rounded hover:bg-yellow-600 hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300'
                              >
                                +
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeAllToCart(item.id)}
                              className='px-6 py-2.5 text-sm cursor-pointer bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 flex items-center justify-center gap-2'>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Retirer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              })
            )}
          </div>

          {/* Section Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-6 backdrop-blur-sm'>
              
              {/* Header */}
              <div className='text-center mb-6 pb-4 border-b border-gray-200'>
                <h2 className='text-lg font-bold text-gray-900 flex items-center justify-center gap-2'>
                  <div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center'>
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                  </div>
                  Total de la commande
                </h2>
              </div>

              {/* Details */}
              <div className='space-y-4 mb-6'>
                <div className='flex justify-between items-center py-3 px-4 bg-gray-50 rounded-xl'>
                  <span className='text-gray-600 font-medium flex items-center gap-2'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10l4 12H5l2-12z" />
                    </svg>
                    Nombre de plats
                  </span>
                  <span className='font-bold text-gray-900 bg-yellow-100 px-3 py-1 rounded-full text-sm shadow-sm'>{getTotalCart()}</span>
                </div>
                
                <div className='flex justify-between items-center py-3 px-4 bg-green-50 rounded-xl'>
                  <span className='text-gray-600 font-medium flex items-center gap-2'>
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Frais de livraison
                  </span>
                  <span className='font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm'>Gratuit</span>
                </div>
              </div>
              
              {/* Total */}
              <div className='bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded p-3 mb-6 shadow-inner'>
                <div className='flex justify-between items-center'>
                  <span className='text-lg font-bold text-gray-900 flex items-center gap-2'>
                    Total à payer
                  </span>
                  <span className='text-2xl font-bold text-yellow-600'>{getTotalAmount()} XAF</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/orderform')} 
                disabled={getTotalAmount() === 0}
                type='button' 
                className='w-full mb-6 py-3 px-6 cursor-pointer bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold text-lg rounded shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-200 relative overflow-hidden group'
              >
                <div className='absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
                <span className='relative flex items-center justify-center text-sm gap-2'>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Valider la commande
                  <ArrowRight className='w-4 h-4 animate-ping' />
                </span>
              </button>

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
  );
};

export default Card;