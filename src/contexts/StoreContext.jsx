import { createContext, useContext, useEffect, useState } from "react";
import { card_menu } from "../assets/assets/assets";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from "lucide-react";
import { authAPI } from "../../services/api";

export const StoreContext = createContext();

/**
 * Hook personnalisé pour accéder au contexte d'authentification
 */
export const useAuth = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
    }
    return context;
};

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [heartItems, setHeartItems] = useState({});
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isShowLogin, setIsShowLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sauvegarder l'utilisateur dans localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Nettoyer le loading quand on se déconnecte
    useEffect(() => {
        if (!user) {
            setLoading(false);
        }
    }, [user]);

    // Vérifier la session au chargement
    useEffect(() => {
        const verifySession = async () => {
            try {
                const response = await fetch(
                    'http://localhost/UrbanSpice-Resto/backend/index.php?module=auth&action=check',
                    {
                        method: 'GET',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' }
                    }
                );

                const data = await response.json();

                if (data.authenticated === true && data.user) {
                    setUser({
                        id_user: data.user.id,
                        email: data.user.email_user,
                        nom_user: data.user.nom_user,
                        role: data.user.role
                    });
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Erreur vérification session:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        verifySession();
    }, []);

    /**
     * Rafraîchir les données utilisateur
     */
    const refreshUser = async () => {
        try {
            const data = await authAPI.check();
            if (data.success && data.user) {
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Erreur refresh:', error);
        }
    };

    /**
     * Inscription d'un nouvel utilisateur
     */
    const Register = async (userData) => {
        try {
            const data = await authAPI.register(userData);
            
            if (data.success) {
                toast.success('Inscription réussie ! Vous pouvez vous connecter.');
            }
            
            return data;
        } catch (error) {
            toast.error(error.message || 'Erreur lors de l\'inscription');
            throw error;
        }
    };

    /**
     * Connexion utilisateur
     */

    const Login = async (email, password) => {
        try {
            const data = await authAPI.login(email, password);
            
            if (data.success && data.user) {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                toast.success(`Bienvenue ${data.user.nom_user || data.user.email}`);
            }
            
            return data;
        } catch (error) {
            toast.error(error.message || 'Erreur lors de la connexion');
            throw error;
        }
    };

    /**
     * Déconnexion utilisateur
     */
    const logout = async () => {
        try {
            await authAPI.logout();
            setUser(null);
            localStorage.removeItem('user');
            toast.info('Vous êtes déconnecté');
        } catch (error) {
            console.error('Erreur déconnexion:', error);
            toast.error('Erreur lors de la déconnexion');
        }
    };

    const addToCart = (itemId) => {
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
    };

    const addToHeart = (itemId) => {
        const item = card_menu.find(cart => cart.id === itemId);
        
        if (!heartItems[itemId]) {
            setHeartItems((prev) => ({...prev, [itemId]: 1}));
            if (item) {
                toast.success(`${item.title} a bien été ajouté aux favoris`);
            }
        }
    };

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
    };

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
    };

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
    };

    const getTotalCart = () => {
        let totalCart = 0;
        for (const item in cartItems) {
            totalCart += cartItems[item];
        }
        return totalCart;
    };

    const getTotalHeart = () => {
        let totalheart = 0;
        for (const item in heartItems) {
            totalheart += heartItems[item];
        }
        return totalheart;
    };

    const FaqData = [
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
            answer: "Absolument ! Nous avons une sélection variée de plats végétariens, véganes et sans gluten. N'hésitez pas à le préciser lors de votre commande."
        },
        {
            question: "Faites-vous la livraison à domicile ?",
            answer: "Oui, nous livrons dans un rayon de 10 km autour du restaurant. La livraison est gratuite à partir d'un certain montant."
        },
        {
            question: "Quels moyens de paiement acceptez-vous ?",
            answer: "Nous acceptons les paiements par carte bancaire, mobile money, espèces, ainsi que les paiements en ligne via notre plateforme sécurisée."
        },
        {
            question: "Puis-je organiser un événement ou une fête privée chez vous ?",
            answer: "Oui, notre espace peut être privatisé pour des événements spéciaux. Veuillez nous contacter à l'avance pour connaître les disponibilités et les modalités."
        },
    ];

    const contextValue = {
        user,
        loading,
        Register,
        Login,
        logout,
        isAuthenticated: !!user,
        setUser,
        refreshUser,
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
        FaqData,
        isShowLogin,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;