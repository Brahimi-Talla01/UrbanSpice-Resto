import { createContext, useContext, useState } from "react";
import { menu as initialMenu } from "../assets/assets/assets_bd"; 

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState(initialMenu);
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

  return (
    <MenuContext.Provider
      value={{
        menus,
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
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};