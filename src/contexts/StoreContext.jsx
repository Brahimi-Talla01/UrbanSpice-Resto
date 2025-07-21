import { createContext, useEffect, useState } from "react";
import { card_menu } from "../assets/assets/assets";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]: 1}));
        }
        else{
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}))
        }
        toast.success(`${card_menu[itemId - 1].title} A bien été ajouté au panier`);
    }

    const removeToCart = (itemId) => {
        if (cartItems[itemId] >= 2) {
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
        }
    }

    const removeAllToCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            delete updatedCart[itemId];
            return updatedCart;
        });
        toast.info(`${card_menu[itemId].title} A bien été retiré au panier`);
    };


    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            let itemCart = card_menu.find((cart) => cart.id === item);
            totalAmount += (itemCart.price).split(' ')[0] * cartItems[item];
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

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    const contextValue = {
        addToCart,
        setCartItems,
        removeToCart,
        getTotalAmount,
        getTotalCart,
        removeAllToCart,
        card_menu,
        cartItems,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;