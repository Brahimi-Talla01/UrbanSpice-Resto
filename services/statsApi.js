// frontend/services/statsApi.js — Statistiques du dashboard admin
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
 * Vue d'ensemble du dashboard (admin)
 * Retour : stats (compteurs), revenus, revenusParMois, topCategories, topMenus, commandesRecentes
 */
export const getOverview = async () => {
    try {
        const url = `${API_BASE_URL}/index.php?module=stats&action=overview`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'GET',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur récupération statistiques:', error);
        throw error;
    }
};
