// FoodList.jsx - Version avec étoiles cliquables
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useContext, useState } from 'react';
import { StoreContext } from '../contexts/StoreContext';
import { useNavigate } from 'react-router-dom';
import { updateMenuRating } from '../../services/menuApi';
import { toast } from 'react-toastify';

const FoodList = ({ card, id }) => {

    const { addToCart, cartItems, addToHeart, heartItems } = useContext(StoreContext);
    const navigate = useNavigate();
    const [isRating, setIsRating] = useState(false);

    const menuId = card.id_menu || card.id;
    const imageUrl = card.image_url || card.image || null;
    const category = card.category || card.menu || '';
    const currentRating = parseFloat(card.rating) || 0;

    const handleClick = () => {
        navigate(`/card-description/${menuId}`);
    };

    // mettre à jour la note
    const handleRating = async (newRating) => {
        if (isRating) return; // Éviter les clics multiples
        
        try {
            setIsRating(true);
            const response = await updateMenuRating(menuId, newRating);
            
            if (response.success) {
                toast.success(`Note mise à jour : ${newRating}/5 ⭐`);
                // Mettre à jour localement pour un affichage immédiat
                card.rating = newRating;
                
            } else {
                toast.error(response.message || "Erreur lors de la mise à jour de la note");
            }
        } catch (error) {
            console.error("Erreur rating:", error);
            toast.error("Impossible de mettre à jour la note");
        } finally {
            setIsRating(false);
        }
    };

    // Composant Etoile cliquable
    const StarRating = ({ rating, onRate, size = 14, disabled = false }) => {
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onRate(star)}
                        disabled={disabled}
                        className={`transition-transform hover:scale-110 focus:outline-none ${
                            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                        }`}
                    >
                        <Star
                            size={size}
                            className={`${
                                star <= Math.round(rating)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300 fill-gray-300 hover:text-yellow-200'
                            } transition-colors duration-150`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    const priceDisplay = card.currency
        ? `${Number(card.price).toLocaleString('fr-FR')} ${card.currency}`
        : card.price;

    return (
        <div className='w-full flex items-start flex-col justify-between rounded-lg shadow hover:scale-102 hover:shadow-2xl duration-300 bg-white overflow-hidden p-2 group'>

            {/* Image du plat */}
            <div className='w-full h-40 rounded-md overflow-hidden relative bg-gray-100'>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={card.title}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                    />
                ) : (
                    <div className='w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className='text-xs'>Aucune image</span>
                    </div>
                )}

                {/* Boutons panier + favori */}
                <div className='absolute top-2 left-0 w-full px-2 flex items-center justify-between md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
                    <button
                        className={`${cartItems[menuId] > 0 ? "bg-yellow-500" : "bg-gray-100 hover:bg-gray-300"} rounded-full p-2 transition cursor-pointer z-10`}
                        onClick={() => addToCart(menuId)}
                    >
                        <ShoppingCart className={`w-6 h-6 ${cartItems[menuId] > 0 ? "text-white" : ""}`} />
                    </button>

                    <button
                        className={`${heartItems[menuId] > 0 ? "bg-yellow-500" : "bg-gray-100 hover:bg-gray-300"} rounded-full p-2 transition cursor-pointer z-10`}
                        onClick={() => addToHeart(menuId)}
                    >
                        <Heart className={`w-6 h-6 ${heartItems[menuId] > 0 ? "text-white" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Catégorie + Étoiles cliquables */}
            <div className='flex justify-between items-center w-full mt-2'>
                <div className='px-2 py-1 rounded-full bg-background-top-light'>
                    <h1 className='text-lg font-outfit'>{category}</h1>
                </div>
                {/* Étoiles cliquables */}
                <StarRating 
                    rating={currentRating} 
                    onRate={handleRating}
                    disabled={isRating}
                    size={16}
                />
            </div>

            {/* Titre + Prix */}
            <div className='flex items-center justify-between w-full mt-1'>
                <h1 className='text-xl font-semibold font-outfit'>{card.title}</h1>
                <p className='text-light text-sm font-semibold'>{priceDisplay}</p>
            </div>

            {/* Bouton détails */}
            <div className='w-full flex justify-center my-2'>
                <button
                    onClick={handleClick}
                    className='px-8 py-2 bg-gradient-to-r from-yellow-500 to-orange-400 hover:from-yellow-600 hover:to-orange-400 text-white font-semibold rounded cursor-pointer hover:bg-yellow-600 transform hover:scale-102 transition-all duration-200 shadow-lg hover:shadow-xl'
                >
                    Voir les détails
                </button>
            </div>
        </div>
    );
};

export default FoodList;