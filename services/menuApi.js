// services/menuApi.js

// ✅ BUG 1 CORRIGÉ : URL pointait vers /controllers au lieu de /backend
// AVANT : http://localhost/Urbanspice-Resto/backend/controllers
// APRÈS : http://localhost/UrbanSpice-Resto/backend
const API_BASE_URL = "http://localhost/UrbanSpice-Resto/backend";

const defaultOptions = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    },
};

const handleResponse = async (response) => {
    // Vérifier que c'est bien du JSON avant de parser
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Réponse non-JSON reçue:', text);
        throw new Error('Le serveur a retourné du HTML au lieu de JSON. Vérifier index.php');
    }

    const data = await response.json();
    if (!response.ok) {
        throw {
            status: response.status,
            message: data.message || 'Une erreur est survenue',
            data: data
        };
    }
    return data;
};

// ── CRÉER UN MENU ────────────────────────────────────────────────
export const createMenu = async (menuData) => {
    try {
        const formData = new FormData();
        formData.append('title',        menuData.title);
        formData.append('description',  menuData.description  || '');
        formData.append('price',        menuData.price        || 0);
        formData.append('currency',     menuData.currency     || 'XAF');
        formData.append('category',     menuData.category);
        formData.append('rating',       menuData.rating       || 0);
        // ✅ BUG 2 CORRIGÉ : is_published envoyé en entier 1 ou 0
        formData.append('is_published', menuData.is_published ? 1 : 0);

        if (menuData.image) {
            formData.append('image', menuData.image);
        }

        // ✅ BUG 1 CORRIGÉ : URL correcte vers index.php
        const url = `${API_BASE_URL}/index.php?module=menu&action=create`;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: formData
            // Pas de Content-Type ici : le navigateur le définit automatiquement avec le boundary
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur création menu:', error);
        throw error;
    }
};

// ── METTRE À JOUR UN MENU ────────────────────────────────────────
export const updateMenu = async (menuData) => {
    try {
        const formData = new FormData();
        formData.append('id_menu',      menuData.id_menu);
        formData.append('title',        menuData.title);
        formData.append('description',  menuData.description  || '');
        formData.append('price',        menuData.price        || 0);
        formData.append('currency',     menuData.currency     || 'XAF');
        formData.append('category',     menuData.category);
        formData.append('rating',       menuData.rating       || 0);
        formData.append('is_published', menuData.is_published ? 1 : 0);

        if (menuData.image) {
            formData.append('image', menuData.image);
        }

        const url = `${API_BASE_URL}/index.php?module=menu&action=update`;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: formData
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur modification menu:', error);
        throw error;
    }
};

// ── RÉCUPÉRER TOUS LES MENUS ─────────────────────────────────────
export const getAllMenus = async () => {
    try {
        // ✅ BUG 3 CORRIGÉ : action était 'getall' (minuscule) au lieu de 'getAll'
        const url = `${API_BASE_URL}/index.php?module=menu&action=getAll`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'GET',
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Erreur récupération menus:', error);
        throw error;
    }
};

// ── RÉCUPÉRER LES MENUS PUBLIÉS ──────────────────────────────────
export const getPublishedMenus = async () => {
    try {
        const url = `${API_BASE_URL}/index.php?module=menu&action=getPublished`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'GET'
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur récupération menus publiés:', error);
        throw error;
    }
};

// ── RÉCUPÉRER PAR CATÉGORIE ───────────────────────────────────────
export const getMenusByCategory = async (category) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=menu&action=getByCategory&category=${encodeURIComponent(category)}`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'GET',
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Erreur récupération par catégorie:', error);
        throw error;
    }
};

// ── RÉCUPÉRER PAR ID ─────────────────────────────────────────────
export const getMenuById = async (id) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=menu&action=getById&id=${id}`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'GET',
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Erreur récupération menu:', error);
        throw error;
    }
};

// ── SUPPRIMER UN MENU ────────────────────────────────────────────
export const deleteMenu = async (id_menu) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=menu&action=delete`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'DELETE',
            body: JSON.stringify({ id_menu })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur suppression:', error);
        throw error;
    }
};

// ── PUBLIER / DÉPUBLIER ───────────────────────────────────────────
export const togglePublishMenu = async (id_menu, is_published) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=menu&action=togglePublish`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'POST',
            body: JSON.stringify({ id_menu, is_published })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur publication menu:', error);
        throw error;
    }
};

// ── METTRE À JOUR LA NOTE ─────────────────────────────────────────
export const updateMenuRating = async (id_menu, rating) => {
    try {
        if (rating < 0 || rating > 5) {
            throw new Error('La note doit être entre 0 et 5');
        }
        const url = `${API_BASE_URL}/index.php?module=menu&action=updateRating`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'POST',
            body: JSON.stringify({ id_menu, rating })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur mise à jour note:', error);
        throw error;
    }
};
