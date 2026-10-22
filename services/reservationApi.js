// frontend/src/services/reservationApi.js

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
 * Créer une réservation (depuis ReservationForm)
 */
export const createReservation = async (reservationData) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=reservation&action=create`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'POST',
            body: JSON.stringify(reservationData)
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur création réservation:', error);
        throw error;
    }
};

/**
 * Récupérer toutes les réservations (admin)
 */
export const getAllReservations = async () => {
    try {
        const url = `${API_BASE_URL}/index.php?module=reservation&action=getAll`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'GET',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur récupération réservations:', error);
        throw error;
    }
};

/**
 * Suivi PUBLIC d'une réservation par son jeton (32 hex, renvoyé à la création).
 *
 * @param {string} token Jeton de suivi (32 hex — espaces acceptés, retirés)
 * @param {{ poll?: boolean }} options poll=true pour le rafraîchissement auto :
 *        throttle serveur partagé par session (multi-onglets) → réponse
 *        possible { unchanged: true } (aucun champ reservation).
 * Retour : { success, reservation } — payload SANS données personnelles.
 * Erreurs : 404 (jeton inconnu ou malformé), 429 (trop de rafraîchissements)
 */
export const getReservationByToken = async (token, { poll = false } = {}) => {
    try {
        const clean = String(token).replace(/\s+/g, '');
        const pollParam = poll ? '&poll=1' : '';
        const url = `${API_BASE_URL}/index.php?module=reservation&action=getByToken&token=${encodeURIComponent(clean)}${pollParam}`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'GET',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur suivi réservation:', error);
        throw error;
    }
};

/**
 * Changer le statut d'une réservation (confirmer/réouvrir)
 */
export const toggleCompleteReservation = async (id_reservation, is_completed) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=reservation&action=toggleComplete`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'POST',
            body: JSON.stringify({ 
                id_reservation: parseInt(id_reservation), 
                is_completed: parseInt(is_completed) 
            })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur mise à jour statut réservation:', error);
        throw error;
    }
};

/**
 * Supprimer une réservation (admin)
 */
export const deleteReservation = async (id_reservation) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=reservation&action=delete`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'DELETE',
            body: JSON.stringify({ 
                id_reservation: parseInt(id_reservation)
            })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur suppression réservation:', error);
        throw error;
    }
};