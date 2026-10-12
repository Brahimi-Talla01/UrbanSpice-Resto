const API_BASE_URL = 'http://localhost/UrbanSpice-Resto/backend';

const defaultOptions = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    },
};

const handleResponse = async (response) => {
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

/**
 * Récupérer tous les chefs (admin)
 */
export const getAllChefs = async () => {
    try {
        const url = `${API_BASE_URL}/index.php?module=chef&action=getAll`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'GET',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur récupération chefs:', error);
        throw error;
    }
};

/**
 * Récupérer les chefs actifs (public)
 */
export const getActiveChefs = async () => {
    try {
        const url = `${API_BASE_URL}/index.php?module=chef&action=getActive`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'GET',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur récupération chefs actifs:', error);
        throw error;
    }
};

/**
 * Créer un chef
 */
export const createChef = async (formData) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=chef&action=create`;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur création chef:', error);
        throw error;
    }
};

/**
 * Mettre à jour un chef
 */
export const updateChef = async (formData) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=chef&action=update`;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur mise à jour chef:', error);
        throw error;
    }
};

/**
 * Supprimer un chef
 */
export const deleteChef = async (id_chef) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=chef&action=delete`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'DELETE',
            body: JSON.stringify({ id_chef })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur suppression chef:', error);
        throw error;
    }
};

/**
 * Activer/Désactiver un chef
 */
export const toggleActiveChef = async (id_chef, is_actived) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=chef&action=toggle`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'POST',
            body: JSON.stringify({ id_chef, is_actived })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur activation/désactivation chef:', error);
        throw error;
    }
};