// frontend/src/services/testimonyApi.js

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
 * Récupérer tous les témoignages (admin)
 */
export const getAllTestimonies = async () => {
    try {
        const url = `${API_BASE_URL}/index.php?module=testimony&action=getAll`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'GET',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur récupération témoignages:', error);
        throw error;
    }
};

/**
 * Récupérer les témoignages actifs (public)
 */
export const getActiveTestimonies = async () => {
    try {
        const url = `${API_BASE_URL}/index.php?module=testimony&action=getActive`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'GET',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur récupération témoignages actifs:', error);
        throw error;
    }
};

/**
 * Créer un témoignage
 */
export const createTestimony = async (formData) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=testimony&action=create`;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur création témoignage:', error);
        throw error;
    }
};

/**
 * Mettre à jour un témoignage
 */
export const updateTestimony = async (formData) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=testimony&action=update`;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur mise à jour témoignage:', error);
        throw error;
    }
};

/**
 * Supprimer un témoignage
 */
export const deleteTestimony = async (id_temoignage) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=testimony&action=delete`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'DELETE',
            body: JSON.stringify({ id_temoignage })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur suppression témoignage:', error);
        throw error;
    }
};

/**
 * Activer/Désactiver un témoignage
 */
export const toggleActiveTestimony = async (id_temoignage, is_actived) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=testimony&action=toggle`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'POST',
            body: JSON.stringify({ id_temoignage, is_actived })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur activation/désactivation témoignage:', error);
        throw error;
    }
};