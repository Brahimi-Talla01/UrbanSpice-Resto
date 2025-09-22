import { createContext, useState } from "react";

const StoreContextAdmin = createContext(null);

const contextAdminProvider = (props) => {
    const [allMenu, setAllMenu] = useState([]);

    const fetchMenu = async () => {
        setAllMenu(menu);
        // Attente de la BD
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    const togglePublish = (id) => {
        setAllMenu((prev) =>
        prev.map((item) =>
            item.id === id ? { ...item, is_published: !item.is_published } : item
        )
        );
    };

};

