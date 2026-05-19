import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../contexts/StoreContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Star, Trash2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { getPublishedMenus } from '../../services/menuApi';

const Favorite = () => {
    const { heartItems, addToCart, removeToHeart, user } = useContext(StoreContext);
    const [favoriteMenus, setFavoriteMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Charger tous les menus et filtrer ceux qui sont dans les favoris
    useEffect(() => {
        const loadFavoriteMenus = async () => {
            try {
                setLoading(true);
                const response = await getPublishedMenus();
                
                if (response.success && response.menus) {
                    // Filtrer les menus qui sont dans heartItems
                    const favoriteIds = Object.keys(heartItems).filter(id => heartItems[id] > 0);
                    const filtered = response.menus.filter(menu => 
                        favoriteIds.includes(String(menu.id_menu)) || 
                        favoriteIds.includes(String(menu.id))
                    );
                    setFavoriteMenus(filtered);
                }
            } catch (error) {
                console.error("Erreur chargement favoris:", error);
                toast.error("Erreur lors du chargement des favoris");
            } finally {
                setLoading(false);
            }
        };

        loadFavoriteMenus();
    }, [heartItems]); // Recharger quand les favoris changent

    const handleRemoveFromFavorites = (menuId) => {
        removeToHeart(menuId);
        // Mettre à jour la liste localement
        setFavoriteMenus(prev => prev.filter(menu => 
            (menu.id_menu || menu.id) !== menuId
        ));
        toast.info("Retiré des favoris");
    };

    const handleAddToCart = (menu) => {
        addToCart(menu.id_menu || menu.id);
        toast.success(`${menu.title} ajouté au panier`);
    };

    const formatPrice = (price, currency = 'XAF') => {
        return `${Number(price).toLocaleString('fr-FR')} ${currency}`;
    };

    // Rendu des étoiles
    const renderStars = (rating) => {
        const note = parseFloat(rating) || 0;
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={14}
                className={i < Math.round(note)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 fill-gray-300'
                }
            />
        ));
    };

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4'></div>
                    <p className='text-gray-600'>Chargement de vos favoris...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100'>
            <div className='w-full px-4 sm:px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto py-6 md:py-12'>

                <div className='text-center mb-8 md:mb-12'>
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3'>
                        <span className='text-2xl md:text-3xl animate-pulse'>❤️</span>
                        Vos favoris
                    </h1>
                    <div className='w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full'></div>
                    <p className='text-gray-500 mt-3'>
                        {favoriteMenus.length} {favoriteMenus.length <= 1 ? 'plat favori' : 'plats favoris'}
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {favoriteMenus.length === 0 ? (
                        <div className='lg:col-span-3 space-y-6 text-center py-16 bg-white shadow rounded-lg border border-gray-100'>
                            <div className='max-w-md mx-auto flex flex-col items-center p-4'>
                                <div className='w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center'>
                                    <Heart className='w-12 h-12 text-gray-400' />
                                </div>
                                <h3 className='text-xl font-semibold text-gray-800 mb-3'>Vous n'avez pas de favoris</h3>
                                <p className='text-gray-600 mb-6'>Découvrez nos délicieux plats et ajoutez-les dans vos favoris</p>
                                <button 
                                    onClick={() => navigate('/')}
                                    className='flex gap-2 px-8 py-3 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer'
                                >
                                    <ArrowLeft size={20} />
                                    Retourner au menu
                                </button>
                            </div>
                        </div>
                    ) : (
                        favoriteMenus.map((item) => {
                            const menuId = item.id_menu || item.id;
                            const imageUrl = item.image_url || item.image;
                            const category = item.category || item.menu;
                            
                            return (
                                <div key={menuId} className='w-full flex items-start flex-col justify-between rounded-lg shadow hover:scale-102 hover:shadow-lg duration-300 bg-white overflow-hidden p-2.5 group'>
                                    
                                    {/* Image */}
                                    <div className='w-full h-40 rounded-md overflow-hidden relative bg-gray-100'>
                                        {imageUrl ? (
                                            <img 
                                                src={imageUrl} 
                                                alt={item.title}
                                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                                            />
                                        ) : (
                                            <div className='w-full h-full flex items-center justify-center bg-gray-100'>
                                                <Heart className='w-10 h-10 text-gray-300' />
                                            </div>
                                        )}
                                        
                                        {/* Badge coeur */}
                                        <div className='absolute top-2 right-2'>
                                            <div className='bg-red-500 rounded-full p-1.5 shadow-lg'>
                                                <Heart className='w-4 h-4 text-white fill-white' />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Catégorie + Étoiles */}
                                    <div className='flex justify-between items-center w-full mt-2'>
                                        <div className='px-2 py-1 rounded-full bg-background-top-light'>
                                            <h1 className='text-sm font-outfit font-medium'>{category}</h1>
                                        </div>
                                        <div className='flex items-center gap-0.5'>
                                            {renderStars(item.rating)}
                                        </div>
                                    </div>

                                    {/* Titre + Prix */}
                                    <div className='flex items-center justify-between w-full mt-1'>
                                        <h1 className='text-lg font-semibold font-outfit'>{item.title}</h1>
                                        <p className='text-yellow-600 font-bold'>
                                            {formatPrice(item.price, item.currency)}
                                        </p>
                                    </div>

                                    {/* Boutons d'action */}
                                    <div className='w-full flex justify-between gap-2 my-3'>
                                        <button
                                            onClick={() => handleRemoveFromFavorites(menuId)} 
                                            className='flex-1 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded cursor-pointer hover:bg-red-600 transform hover:scale-102 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-1'
                                        >
                                            <Trash2 size={16} />
                                            Retirer
                                        </button>

                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className='flex-1 px-4 py-2 bg-yellow-500 text-white text-sm font-semibold rounded cursor-pointer hover:bg-yellow-600 transform hover:scale-102 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-1'
                                        >
                                            <ShoppingCart size={16} />
                                            Ajouter
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            <ToastContainer 
                position="top-right"
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

export default Favorite;