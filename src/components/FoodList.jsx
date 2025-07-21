import { ShoppingCart, Heart } from 'lucide-react';
import { useContext } from 'react';
import { StoreContext } from '../contexts/StoreContext';

const FoodList = ({ card, id }) => {

    const {  addToCart, cartItems } = useContext(StoreContext);

    return (
        <div className='w-full flex items-start flex-col justify-between rounded-lg shadow hover:scale-102 hover:shadow-2xl duration-300 bg-white overflow-hidden p-2 group'>

            <div className='w-full h-40 rounded-md overflow-hidden relative'>
                <img 
                    src={card.image} 
                    alt={card.title}
                    className='w-full h-full object-cover' 
                />
                <div className='absolute top-2 left-0 w-full px-2 flex items-center justify-between md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
                    <button 
                        className={`${cartItems[id] > 0 ? "bg-yellow-500" : "bg-gray-100 hover:bg-gray-300"}   rounded-full p-2 transition cursor-pointer z-10`}
                        onClick={() => addToCart(id)}
                    >
                        <ShoppingCart className={`w-6 h-6 ${cartItems[id] > 0 ? "text-white" : ""}`} />
                    </button>

                    <button className='bg-gray-100 hover:bg-gray-300 rounded-full p-2 transition cursor-pointer z-10'>
                        <Heart className='w-6 h-6'/>
                    </button>
                </div>
            </div>

            <div className='flex justify-between items-center w-full'>
                <div className='px-2 py-1 rounded-full bg-background-top-light my-2'>
                    <h1 className='text-lg font-outfit'>{card.menu}</h1>
                </div>
                <img src={card.start} alt="Start" className='w-20' />
            </div>

            <div className='flex items-center justify-between w-full'>
                <h1 className='text-xl font-semibold font-outfit'>{card.title}</h1>
                <p className='text-light text-sm font-semibold'>{card.price}</p>
            </div>

            <div className='w-full flex justify-center my-2'>
                <button className='px-8 py-2 bg-yellow-500 text-white font-semibold rounded cursor-pointer hover:bg-yellow-600 transform hover:scale-102 transition-all duration-200 shadow-lg hover:shadow-xl'>Voir les détails</button>
            </div>
        </div>
    )
}

export default FoodList;
