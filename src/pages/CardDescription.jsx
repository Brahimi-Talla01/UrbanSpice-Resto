import { useContext } from 'react';
import FoodList from '../components/FoodList';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../contexts/StoreContext';
import { ToastContainer } from 'react-toastify';

const CardDescription = () => {
    const { addToCart, removeToCart, card_menu, cartItems } = useContext(StoreContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const mainDish = card_menu.find((cart) => cart.id === id);
    console.log('Found dish:', mainDish);

    if (!mainDish) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold text-gray-900 mb-4'>Plat non trouvé</h1>
                    <button 
                        onClick={() => navigate('/')}
                        className='px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors'
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        );
    }

    const quantity = cartItems[mainDish.id] || 0;
    
    const totalPrice = parseFloat(mainDish.price.split(' ')[0]) * quantity;

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100'>
            {/* Section du plat principal */}
            <section className='w-auto px-4 sm:px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto py-6 md:py-12'>
                <div className='bg-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 p-4'>
                        {/* Image du plat */}
                        <div className='relative group'>
                            <div className='aspect-video lg:aspect-square rounded-md overflow-hidden bg-background-top-light'>
                                <img 
                                    src={mainDish.image} 
                                    alt={mainDish.title}
                                    className='w-full h-full object-cover md:object-contain group-hover:scale-105 transition-transform duration-500' 
                                />
                                <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium text-gray-700'>
                                    {mainDish.menu}
                                </div>
                            </div>
                        </div>

                        {/* Informations du plat */}
                        <div className='flex flex-col justify-between space-y-6'>
                            <div>
                                <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-3 font-outfit'>
                                    {mainDish.title}
                                </h1>
                                
                                <p className='text-gray-600 text-lg leading-relaxed mb-4'>
                                    {mainDish.description}
                                </p>

                                <div className='flex items-center gap-3 mb-2'>
                                    <span className='text-sm font-medium text-gray-500 bg-background-top-light px-3 py-2 rounded-full'>
                                        Prix unitaire
                                    </span>
                                    <span className='font-bold text-2xl text-gray-900'>
                                        {mainDish.price}
                                    </span>
                                </div>
                            </div>

                            {/* Contrôles de quantité et total */}
                            <div className='space-y-4'>
                                <div className='flex items-center justify-between bg-background-top-light/80 rounded-md p-4'>
                                    <span className='font-medium text-gray-700'>Quantité</span>
                                    
                                    <div className='flex items-center gap-3'>
                                        <button
                                            onClick={() => removeToCart(mainDish.id)}
                                            disabled={quantity <= 0}
                                            className='w-12 h-12 bg-yellow-500 cursor-pointer text-white text-xl font-bold rounded-md hover:bg-yellow-600 hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300'
                                        >
                                            -
                                        </button>
                                        
                                        <div className='bg-white border-2 border-yellow-200 rounded-xl px-3 py-1 min-w-[4rem] text-center shadow-sm'>
                                            <span className='text-2xl font-bold text-gray-800'>{quantity}</span>
                                        </div>
                                        
                                        <button 
                                            onClick={() => addToCart(mainDish.id)}
                                            className='w-12 h-12 bg-yellow-500 text-white text-xl font-bold rounded-md cursor-pointer hover:bg-yellow-600 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300'
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Prix total et bouton d'ajout */}
                                {quantity > 0 && (
                                    <div className='bg-gradient-to-r from-yellow-50 to-orange-50 rounded-md p-4 border border-yellow-200'>
                                        <div className='flex items-center justify-between mb-3'>
                                            <span className='font-medium text-gray-700'>Total</span>
                                            <span className='font-bold text-2xl text-gray-900'>
                                                {totalPrice.toLocaleString()} XAF
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Bouton d'ajout au panier si quantity = 0 */}
                                {quantity === 0 && (
                                    <button
                                        onClick={() => addToCart(mainDish.id)}
                                        className='w-full py-4 rounded-md cursor-pointer font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:ring-yellow-300'
                                    >
                                        Ajouter au panier
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section des autres plats */}
            <section className='w-auto px-4 sm:px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto py-6 md:py-12'>
                <div className='mb-8'>
                    <h2 className='text-3xl font-bold text-gray-900 text-center mb-2 font-outfit'>
                        Découvrez nos autres spécialités
                    </h2>
                    <div className='w-20 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full'></div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                    {card_menu
                        .filter((card) => card.id !== mainDish.id) 
                        .slice(0, 6) 
                        .map((card) => (
                            <FoodList
                                key={card.id}
                                card={card}
                                id={card.id}
                            /> 
                        ))}
                </div>
            </section>

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

export default CardDescription;