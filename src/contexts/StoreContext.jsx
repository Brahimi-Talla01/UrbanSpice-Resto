import { createContext, useContext, useEffect, useState } from "react";
import { card_menu } from "../assets/assets/assets";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// URL de base de l'API 
const API_BASE_URL = 'http://localhost/UrbanSpice-Resto/backend/controllers';

export const StoreContext = createContext();

/**
 * Hook personnalisé pour accéder au contexte d'authentification
 * 
 * UTILISATION dans les composants :
 * const { user, Login, Register, logout } = useAuth();
 */
export const useAuth = () => {
    // Récupérer le contexte
    const context = useContext(StoreContext);
    
    // Vérifier si le hook est utilisé dans un Provider
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


    // VÉRIFIER LA SESSION AU CHARGEMENT
    
    useEffect(() => {
        checkUserSession();
    }, []);

    /**
     * Vérifier si l'utilisateur a une session active
     * 
     */
    const checkUserSession = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/AuthController.php?action=check`,
                {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' } 
                }
            );

            const data = await response.json();

            if (data.authenticated) {
                setUser(data.user);
            }
        } catch (error) {
            console.error('Erreur vérification session:', error);
        } finally {
            setLoading(false);
        }
    };

     // FONCTION REGISTER (Pour RegisterForm.jsx)
    
    /**
     * Inscrire un nouvel utilisateur
     */
    const Register = async (userData) => {
        try {
          
            const response = await fetch(
                `${API_BASE_URL}/AuthController.php?action=register`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de l\'inscription');
            }
            
            return data; // { message: "Inscription réussie" }

        } catch (error) {
            throw error; // Relancer l'erreur pour le composant
        }
    };

    // FONCTION LOGIN (Pour LoginForm.jsx)
    
    /**
     * Connecter un utilisateur
     * 
     * @param {string} email - Email de l'utilisateur
     * @param {string} password - Mot de passe
     * @returns {Promise} Réponse du serveur avec les données utilisateur
     */
    const Login = async (email, password) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/AuthController.php?action=login`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                }
            );

            

            const data = await response.json();

            if (!response.ok) {
                
                throw new Error(data.message || 'Erreur lors de la connexion');
            }

            // Mettre à jour l'état de l'utilisateur
            setUser(data.user);

            return data; // { message: "...", user: {...} }

        } catch (error) {
            throw error; 
        }
    };

     // ========================================
    // FONCTION LOGOUT (Déconnexion)
    // ========================================
    
    /**
     * Déconnecter l'utilisateur
     */
    const logout = async () => {
        try {
            await fetch(
                `${API_BASE_URL}/AuthController.php?action=logout`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            
            // Réinitialiser l'état
            setUser(null);
            
        } catch (error) {
            console.error('Erreur déconnexion:', error);
        }
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

        user,              // Utilisateur connecté (ou null)
        loading,           // État de chargement initial
        Register,          // Fonction d'inscription
        Login,             // Fonction de connexion
        logout,            // Fonction de déconnexion
        isAuthenticated: !!user,  // true si connecté, false sinon

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
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;