import { createContext, useEffect, useState } from "react";
import { card_menu } from "../assets/assets/assets";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [heartItems, setHeartItems] = useState({});
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isShowLogin, setIsShowLogin] = useState(false);


    const faqData = [
        {
            question: "Quels sont vos horaires d'ouverture ?",
            answer: "Nous sommes ouverts tous les jours de 11h à 23h, y compris les week-ends et jours fériés."
        },
        {
            question: "Puis-je réserver une table en ligne ?",
            answer: "Oui, vous pouvez réserver une table directement sur notre site via le formulaire de réservation, ou nous appeler au numéro indiqué en bas de page."
        },
        {
            question: "Proposez-vous des plats végétariens ou sans gluten ?",
            answer: "Absolument ! Nous avons une sélection variée de plats végétariens, véganes et sans gluten. N’hésitez pas à le préciser lors de votre commande."
        },
        {
            question: "Faites-vous la livraison à domicile ?",
            answer: "Oui, nous livrons dans un rayon de 10 km autour du restaurant. La livraison est gratuite à partir d’un certain montant."
        },
        {
            question: "Quels moyens de paiement acceptez-vous ?",
            answer: "Nous acceptons les paiements par carte bancaire, mobile money, espèces, ainsi que les paiements en ligne via notre plateforme sécurisée."
        },
        {
            question: "Puis-je organiser un événement ou une fête privée chez vous ?",
            answer: "Oui, notre espace peut être privatisé pour des événements spéciaux. Veuillez nous contacter à l’avance pour connaître les disponibilités et les modalités."
        },
        {
            question: "Comment puis-je signaler une allergie alimentaire ?",
            answer: "Lors de votre commande en ligne ou en salle, veuillez indiquer clairement vos allergies. Notre équipe prendra toutes les précautions nécessaires."
        },
        {
            question: "Est-ce que je peux modifier ou annuler ma commande ?",
            answer: "Oui, vous pouvez modifier ou annuler votre commande dans un délai de 10 minutes après confirmation. Contactez-nous rapidement au numéro indiqué."
        }
    ];


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
        setIsShowLogin,
        card_menu,
        cartItems,
        heartItems,
        isAddedToCart,
        faqData,
        isShowLogin,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;