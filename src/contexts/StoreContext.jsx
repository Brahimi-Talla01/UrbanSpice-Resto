import { createContext, useEffect, useState } from "react";
import { card_menu } from "../assets/assets/assets";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [heartItems, setHeartItems] = useState({});
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const addToCart = (itemId) => {
        // Trouver l'item dans le menu
        const item = card_menu.find(cart => cart.id === itemId);
        
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]: 1}));
            setIsAddedToCart(true);
        } else {
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
        }
        
        if (item) {
            toast.success(`${item.title} a bien été ajouté au panier`);
        }
        
        setTimeout(() => setIsAddedToCart(false), 2000);
    }

    const addToHeart = (itemId) => {
        const item = card_menu.find(cart => cart.id === itemId);
        
        if (!heartItems[itemId]) {
            setHeartItems((prev) => ({...prev, [itemId]: 1}));
            if (item) {
                toast.success(`${item.title} a bien été ajouté aux favoris`);
            }
        }
    }

    const removeToCart = (itemId) => {
        if (cartItems[itemId] && cartItems[itemId] >= 2) {
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
        } else if (cartItems[itemId] === 1) {
            setCartItems((prev) => {
                const updatedCart = { ...prev };
                delete updatedCart[itemId];
                return updatedCart;
            });
        }
    }

    const removeToHeart = (itemId) => {
        const item = card_menu.find(cart => cart.id === itemId);
        
        setHeartItems((prev) => {
            const updatedHeart = { ...prev };
            delete updatedHeart[itemId];
            return updatedHeart;
        });
        
        if (item) {
            toast.info(`${item.title} a bien été retiré des favoris`);
        }
    }

    const removeAllToCart = (itemId) => {
        const item = card_menu.find(cart => cart.id === itemId);
        
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            delete updatedCart[itemId];
            return updatedCart;
        });
        
        if (item) {
            toast.info(`${item.title} a bien été retiré du panier`);
        }
    };

    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            let itemCart = card_menu.find((cart) => cart.id === itemId);
            if (itemCart) {
                const price = parseFloat(itemCart.price.split(' ')[0]);
                totalAmount += price * cartItems[itemId];
            }
        }
        return totalAmount;
    }

    const getTotalCart = () => {
        let totalCart = 0;
        for (const item in cartItems) {
           totalCart += cartItems[item];
        }
        return totalCart;
    }

    const getTotalHeart = () => {
        let totalheart = 0;
        for (const item in heartItems) {
           totalheart += heartItems[item];
        }
        return totalheart;
    }

    useEffect(() => {
        console.log('Cart Items:', cartItems);
    }, [cartItems]);

    const contextValue = {
        addToCart,
        setCartItems,
        removeToCart,
        getTotalAmount,
        getTotalCart,
        removeAllToCart,
        addToHeart,
        removeToHeart,
        getTotalHeart,
        card_menu,
        cartItems,
        heartItems,
        isAddedToCart,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;