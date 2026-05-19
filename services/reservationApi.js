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