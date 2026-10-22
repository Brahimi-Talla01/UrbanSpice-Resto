import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authAPI } from "../../services/api";
import { getPublishedMenus } from "../../services/menuApi";
import { getFavorites, syncFavorites } from "../../services/favoriteApi";
import { getCart, syncCart, clearCartOnServer } from "../../services/cartApi";

export const StoreContext = createContext();

// ── Persistance du panier et des favoris (localStorage) ──────────
// Survivent au rechargement de la page ; les valeurs sont
// { [id_menu]: quantité }. En cas de JSON corrompu on repart de {}.
const CART_STORAGE_KEY = 'urbanspice_cart';
const FAVORITES_STORAGE_KEY = 'urbanspice_favorites';

const loadStoredItems = (key) => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error(`Erreur lecture localStorage [${key}]:`, error);
        return {};
    }
};

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
    // Panier / favoris hydratés depuis le localStorage au démarrage
    const [cartItems, setCartItems] = useState(() => loadStoredItems(CART_STORAGE_KEY));
    const [heartItems, setHeartItems] = useState(() => loadStoredItems(FAVORITES_STORAGE_KEY));
    // Menus publiés de la BDD — source de vérité du panier et des favoris
    // (remplace l'ancien tableau statique card_menu importé de assets.js)
    const [storeMenus, setStoreMenus] = useState([]);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isShowLogin, setIsShowLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // Vrai seulement quand le check de session initial est terminé.
    // `loading` passe à false dès le montage tant que `user` est null
    // (voir l'effet if (!user) setLoading(false)) — insuffisant pour
    // AdminRoute, qui redirigerait avant même la fin du vérif serveur.
    const [sessionChecked, setSessionChecked] = useState(false);

    // Persister le panier et les favoris à chaque changement
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(heartItems));
    }, [heartItems]);

    // ── Synchronisation serveur (table `favoris` / `panier`) ─────
    // À la connexion : on FUSIONNE l'état serveur dans l'état local
    // (union — rien n'est perdu si on avait déjà ajouté des articles
    // hors ligne ou depuis un autre appareil).
    // Ensuite chaque changement local est renvoyé au serveur (miroir),
    // en arrière-plan : une panne réseau ne bloque jamais l'interface.
    const [serverSynced, setServerSynced] = useState(false);

    useEffect(() => {
        if (!user) {
            setServerSynced(false);
            return;
        }

        let cancelled = false;

        const mergeFromServer = async () => {
            try {
                const [favRes, cartRes] = await Promise.all([
                    getFavorites().catch(() => null),
                    getCart().catch(() => null)
                ]);

                if (cancelled) return;

                // Favoris serveur → local (union)
                const serverFavs = favRes?.success && Array.isArray(favRes.favorites)
                    ? favRes.favorites.map((fav) => String(fav.id_menu))
                    : [];
                if (serverFavs.length > 0) {
                    setHeartItems((prev) => {
                        const merged = { ...prev };
                        serverFavs.forEach((id) => {
                            if (!merged[id]) merged[id] = 1;
                        });
                        return merged;
                    });
                }

                // Panier serveur → local (union : la quantité locale l'emporte)
                const serverItems = cartRes?.success && Array.isArray(cartRes.items)
                    ? cartRes.items
                    : [];
                if (serverItems.length > 0) {
                    setCartItems((prev) => {
                        const merged = { ...prev };
                        serverItems.forEach((row) => {
                            const id = String(row.id_menu);
                            const quantity = Number(row.quantity) || 0;
                            if (quantity > 0 && !merged[id]) merged[id] = quantity;
                        });
                        return merged;
                    });
                }
            } catch (error) {
                console.error('Erreur synchronisation serveur:', error);
            } finally {
                if (!cancelled) setServerSynced(true);
            }
        };

        mergeFromServer();

        return () => {
            cancelled = true;
        };
    }, [user]);

    // Miroir local → serveur, débouncé (un seul appel par série de
    // clics au lieu d'un appel par mutation)
    useEffect(() => {
        if (!user || !serverSynced) return;

        const timer = setTimeout(() => {
            const favoriteIds = Object.keys(heartItems)
                .filter((id) => heartItems[id] > 0)
                .map(Number)
                .filter((id) => Number.isInteger(id) && id > 0);

            const cartPayload = Object.entries(cartItems)
                .filter(([, quantity]) => quantity > 0)
                .map(([id, quantity]) => ({ id_menu: Number(id), quantity }))
                .filter((row) => Number.isInteger(row.id_menu) && row.id_menu > 0);

            Promise.all([
                syncFavorites(favoriteIds),
                syncCart(cartPayload)
            ]).catch((error) => {
                console.error('Erreur envoi panier/favoris au serveur:', error);
            });
        }, 400);

        return () => clearTimeout(timer);
    }, [cartItems, heartItems, user, serverSynced]);

    // Vider le panier : local + serveur (après commande réussie)
    const clearCart = async () => {
        setCartItems({});
        if (user) {
            try {
                await clearCartOnServer();
            } catch (error) {
                console.error('Erreur vidage panier serveur:', error);
            }
        }
    };

    // Charger une seule fois les menus publiés : prix, titres et images
    // utilisés par le panier / les favoris viennent de la BDD.
    useEffect(() => {
        const fetchStoreMenus = async () => {
            try {
                const response = await getPublishedMenus();
                if (response?.success && Array.isArray(response.menus)) {
                    setStoreMenus(response.menus);
                }
            } catch (error) {
                // Le panier reste utilisable ; les totaux seront recalculés
                // au prochain chargement réussi.
                console.error('Erreur chargement menus (panier):', error);
            }
        };

        fetchStoreMenus();
    }, []);

    // Retrouver un menu de la BDD quel que soit son identifiant
    // (id_menu pour la BDD, id pour l'ancien format statique)
    const findMenuItem = (itemId) =>
        storeMenus.find((menu) => String(menu.id_menu ?? menu.id) === String(itemId));

    // Prix numérique défensif : la BDD renvoie un nombre, l'ancien
    // format statique était une chaîne du type « 3000 XAF »
    const getNumericPrice = (price) =>
        typeof price === 'number' ? price : parseFloat(String(price).split(' ')[0]) || 0;

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
                setSessionChecked(true);
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
        const item = findMenuItem(itemId);
        
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
        const item = findMenuItem(itemId);
        
        if (!heartItems[itemId]) {
            setHeartItems((prev) => ({...prev, [itemId]: 1}));
            if (item) {
                toast.success(`${item.title} a bien été ajouté aux favoris`);
            }
        }
    };

    const removeToCart = (itemId) => {
        const item = findMenuItem(itemId);
        
        if (cartItems[itemId] && cartItems[itemId] >= 2) {
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
        } else if (cartItems[itemId] === 1) {
            setCartItems((prev) => {
                const updatedCart = { ...prev };
                delete updatedCart[itemId];
                return updatedCart;
            });
        }
        
        if (item) {
            toast.info(`${item.title} a bien été retiré du panier`);
        }
    };

    const removeToHeart = (itemId) => {
        const item = findMenuItem(itemId);
        
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
        const item = findMenuItem(itemId);
        
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
            const itemCart = findMenuItem(itemId);
            if (itemCart) {
                totalAmount += getNumericPrice(itemCart.price) * cartItems[itemId];
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
        sessionChecked,
        Register,
        Login,
        logout,
        isAuthenticated: !!user,
        setUser,
        refreshUser,
        addToCart,
        setCartItems,
        removeToCart,
        clearCart,
        getTotalAmount,
        getTotalCart,
        removeAllToCart,
        addToHeart,
        removeToHeart,
        getTotalHeart,
        setIsShowLogin,
        // Menus publiés de la BDD : source de vérité du panier / favoris
        storeMenus,
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