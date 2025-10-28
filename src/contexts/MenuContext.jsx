import { createContext, useContext, useState } from "react";
import { commandes, menu as initialMenu, reservations, services as initialService, prof_data as initialChefs, testimonie_data } from "../assets/assets/assets_bd"; 

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState(initialMenu);
  const [orders, setOrder] = useState(commandes);
  const [resers, SetReser] = useState(reservations);
  const [services, setService] = useState(initialService);
  const [chefs, setChef] = useState(initialChefs);
  const [testimonies, setTestimony] = useState(testimonie_data);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null); 

  // Ajouter un menu
  const addMenu = (newMenu) => {
    setMenus((prev) => [...prev, { ...newMenu, id: Date.now(), created_at: new Date() }]);
  };

  // Modifier un menu existant
  const updateMenu = (updatedMenu) => {
    setMenus((prev) =>
      prev.map((item) =>
        item.id === updatedMenu.id 
          ? { ...updatedMenu, updated_at: new Date().toISOString() }
          : item
      )
    );
  };

  // Ouvrir le formulaire en mode édition
  const openEditForm = (menu) => {
    setEditingMenu(menu);
    setIsFormOpen(true);
  };

  // Fermer le formulaire et réinitialiser l'état d'édition
  const closeForm = () => {
    setIsFormOpen(false);
    setEditingMenu(null);
  };

  // Toggle published/unpublished
  const togglePublish = (id) => {
    setMenus((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_published: !item.is_published } : item
      )
    );
  };

  // Supprimer un menu
  const deleteMenu = (id) => {
    setMenus((prev) => prev.filter((item) => item.id !== id));
  };

  //Fonctions pour la pages commande
  const toggleOrder = (id) => {
    setOrder((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_completed: !item.is_completed } : item
      )
    );    
  };

  // Archiver une commande
  const archiveOrder = (id) => {
    setOrder((prev) => prev.filter((item) => item.id !== id));
  };
  
  //Fonctions pour marquer une reservation comme terminée ou pas
  const toggleReservation = (id) => {
    SetReser((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_completed: !item.is_completed } : item
      )
    );    
  };

  // Archiver une reservation
  const archiveReservation = (id) => {
    SetReser((prev) => prev.filter((item) => item.id !== id));
  };

  //Fonctions pour activer ou désactiver un service
  const toggleService = (id) => {
    setService((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_actived: !item.is_actived } : item
      )
    );    
  };

  // Supprimer un service
  const archiveService = (id) => {
    setService((prev) => prev.filter((item) => item.id !== id));
  };

  //Fonctions pour activer ou désactiver un chef cusinier
  const toggleChef = (id) => {
    setChef((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_actived: !item.is_actived } : item
      )
    );    
  };

  // Supprimer un chef cusinier
  const archiveChef = (id) => {
    setChef((prev) => prev.filter((item) => item.id !== id));
  };

  //Fonctions pour activer ou désactiver un chef cusinier
  const toggleTestimony = (id) => {
    setTestimony((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_actived: !item.is_actived } : item
      )
    );    
  };

  // Supprimer un commentaire
  const archiveTestimony = (id) => {
    setTestimony((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MenuContext.Provider
      value={{
        orders,
        menus,
        resers,
        services,
        chefs,
        testimonies,
        addMenu,
        updateMenu,
        togglePublish,
        deleteMenu,
        isFormOpen,
        setIsFormOpen,
        editingMenu,
        setEditingMenu,
        openEditForm,
        closeForm,
        toggleOrder,
        archiveOrder,
        archiveReservation,
        toggleReservation,
        toggleService,
        archiveService,
        toggleChef,
        archiveChef,
        archiveTestimony,
        toggleTestimony
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};