// frontend/src/services/orderApi.js

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
 * Créer une commande (depuis OrderForm)
 */
export const createOrder = async (orderData) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=order&action=create`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'POST',
            body: JSON.stringify(orderData)
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur création commande:', error);
        throw error;
    }
};

/**
 * Suivi PUBLIC d'une commande par son jeton (32 hex, renvoyé à la création).
 * L'id n'est plus exposé en public (anti-énumération) — action=getById est
 * désormais réservée à l'admin.
 *
 * @param {string} token Jeton de suivi (32 hex — espaces acceptés, retirés)
 * @param {{ poll?: boolean }} options poll=true pour le rafraîchissement auto :
 *        le throttle serveur (partagé par session → multi-onglets) ne sert
 *        alors qu'1 lecture complète / 10 s ; réponse possible { unchanged: true }
 *        à conserver telle quelle (aucun champ order).
 * Retour : { success, order } — payload SANS données personnelles.
 * Erreurs : 404 (jeton inconnu ou malformé — même réponse, pas d'oracle),
 *           429 (trop de rafraîchissements — Retry-After)
 */
export const getOrderByToken = async (token, { poll = false } = {}) => {
    try {
        const clean = String(token).replace(/\s+/g, '');
        const pollParam = poll ? '&poll=1' : '';
        const url = `${API_BASE_URL}/index.php?module=order&action=getByToken&token=${encodeURIComponent(clean)}${pollParam}`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'GET',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur récupération commande:', error);
        throw error;
    }
};

/**
 * Changer le statut d'une commande (toggleComplete) - ✅ CORRIGÉ
 */
export const toggleCompleteOrder = async (id_commande, is_completed) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=order&action=toggleComplete`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'POST',
            body: JSON.stringify({ id_commande, is_completed })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur mise à jour statut:', error);
        throw error;
    }
};

/**
 * Récupérer toutes les commandes (admin)
 */
export const getAllOrders = async () => {
    try {
        const url = `${API_BASE_URL}/index.php?module=order&action=getAll`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'GET',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur récupération commandes:', error);
        throw error;
    }
};

/**
 * Mettre à jour le statut d'une commande
 */
export const updateOrderStatus = async (id_order, status) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=order&action=updateStatus`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'POST',
            body: JSON.stringify({ id_order, status })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur mise à jour statut:', error);
        throw error;
    }
};

/**
 * Supprimer une commande - ✅ CORRIGÉ : id_commande
 */
export const deleteOrder = async (id_commande) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=order&action=delete`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'DELETE',
            body: JSON.stringify({ id_commande })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur suppression commande:', error);
        throw error;
    }
};