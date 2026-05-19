// frontend/src/contexts/AdminFormContext.jsx
import { createContext, useContext, useState } from "react";

const AdminFormContext = createContext();

export const useAdminForm = () => useContext(AdminFormContext);

export const AdminFormProvider = ({ children }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formType, setFormType] = useState(null); // 'menu', 'service', 'order', 'reservation'
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(false);

    const openForm = (type, item = null) => {
        setFormType(type);
        setEditingItem(item);
        setIsFormOpen(true);
    };


    const closeForm = (callback) => {
        setIsFormOpen(false);
        setFormType(null);
        setEditingItem(null);
        if (callback) callback();
    };

    return (
        <AdminFormContext.Provider value={{
            isFormOpen,
            formType,
            editingItem,
            loading,
            setLoading,
            openForm,
            closeForm,
        }}>
            {children}
        </AdminFormContext.Provider>
    );
};