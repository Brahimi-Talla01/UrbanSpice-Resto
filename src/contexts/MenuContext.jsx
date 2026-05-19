import { createContext, useContext, useState, useEffect } from "react";
import {
    commandes,
    reservations,
    services as initialService,
    prof_data as initialChefs,
    testimonie_data
} from "../assets/assets/assets_bd";

import {
    getAllMenus,
    createMenu   as apiCreateMenu,
    updateMenu   as apiUpdateMenu,
    deleteMenu   as apiDeleteMenu,
    togglePublishMenu
} from "../../services/menuApi";

const MenuContext = createContext();
export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {

    const [menus,       setMenus]      = useState([]);
    const [orders,      setOrder]      = useState(commandes);
    const [resers,      SetReser]      = useState(reservations);
    const [services,    setService]    = useState(initialService);
    const [chefs,       setChef]       = useState(initialChefs);
    const [testimonies, setTestimony]  = useState(testimonie_data);
    const [isFormOpen,  setIsFormOpen] = useState(false);
    const [editingMenu, setEditingMenu]= useState(null);
    const [loading,     setLoading]    = useState(false);
    const [error,       setError]      = useState(null);

    useEffect(() => {
        fetchMenus();
    }, []);

    // ── CHARGER LES MENUS DEPUIS L'API ───────────────────────────
    const fetchMenus = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllMenus();
            if (response.success && response.menus) {
                setMenus(response.menus);
            }
        } catch (err) {
            console.error("Erreur chargement menus:", err);
            setError("Impossible de charger les menus.");
        } finally {
            setLoading(false);
        }
    };

    const addMenu = async (newMenu) => {
        try {
            const response = await apiCreateMenu(newMenu);
            if (response.success) {
                await fetchMenus();
                return { success: true };
            }
            return { success: false, message: response.message };
        } catch (err) {
            console.error("Erreur ajout menu:", err);
            return { success: false, message: err.message };
        }
    };

   
    const updateMenu = async (updatedMenu) => {
        try {
            const response = await apiUpdateMenu(updatedMenu);
            if (response.success) {
                await fetchMenus();
                return { success: true };
            }
            return { success: false, message: response.message };
        } catch (err) {
            console.error("Erreur modification menu:", err);
            return { success: false, message: err.message };
        }
    };

    // ── PUBLIER / DÉPUBLIER ───────────────────────────────────────
    const togglePublish = async (id_menu, is_published) => {
        try {
            const response = await togglePublishMenu(id_menu, is_published);
            if (response.success) {
                await fetchMenus();
            }
            return response;
        } catch (err) {
            console.error("Erreur publication:", err);
            throw err;
        }
    };

    // ── SUPPRIMER UN MENU ─────────────────────────────────────────
    const deleteMenu = async (id_menu) => {
        try {
            const response = await apiDeleteMenu(id_menu);
            if (response.success) {
                await fetchMenus();
            }
            return response;
        } catch (err) {
            console.error("Erreur suppression:", err);
            throw err;
        }
    };

    // ── FORMULAIRE ────────────────────────────────────────────────
    const openEditForm = (menu) => {
        setEditingMenu(menu);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingMenu(null);
    };

    // ── COMMANDES ─────────────────────────────────────────────────
    const toggleOrder = (id) => {
        setOrder((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, is_completed: !item.is_completed } : item
            )
        );
    };

    const archiveOrder = (id) => {
        setOrder((prev) => prev.filter((item) => item.id !== id));
    };

    // ── RÉSERVATIONS ──────────────────────────────────────────────
    const toggleReservation = (id) => {
        SetReser((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, is_completed: !item.is_completed } : item
            )
        );
    };

    const archiveReservation = (id) => {
        SetReser((prev) => prev.filter((item) => item.id !== id));
    };

    // ── SERVICES ──────────────────────────────────────────────────
    const toggleService = (id) => {
        setService((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, is_actived: !item.is_actived } : item
            )
        );
    };

    const archiveService = (id) => {
        setService((prev) => prev.filter((item) => item.id !== id));
    };

    // ── CHEFS ─────────────────────────────────────────────────────
    const toggleChef = (id) => {
        setChef((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, is_actived: !item.is_actived } : item
            )
        );
    };

    const archiveChef = (id) => {
        setChef((prev) => prev.filter((item) => item.id !== id));
    };

    // ── TÉMOIGNAGES ───────────────────────────────────────────────
    const toggleTestimony = (id) => {
        setTestimony((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, is_actived: !item.is_actived } : item
            )
        );
    };

    const archiveTestimony = (id) => {
        setTestimony((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <MenuContext.Provider
            value={{
                // Menus
                menus,
                loading,
                error,
                fetchMenus,
                addMenu,
                updateMenu,
                togglePublish,
                deleteMenu,
                // Formulaire
                isFormOpen,
                setIsFormOpen,
                editingMenu,
                setEditingMenu,
                openEditForm,
                closeForm,
                // Autres données
                orders,
                resers,
                services,
                chefs,
                testimonies,
                // Autres actions
                toggleOrder,
                archiveOrder,
                toggleReservation,
                archiveReservation,
                toggleService,
                archiveService,
                toggleChef,
                archiveChef,
                toggleTestimony,
                archiveTestimony,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};
