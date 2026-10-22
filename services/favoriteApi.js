// services/favoriteApi.js
//
// Favoris côté serveur (module=favori, garde « auth »).
// La session HTTP porte l'identité : aucun id_user n'est envoyé.

const API_BASE_URL = "http://localhost/UrbanSpice-Resto/backend";

const defaultOptions = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    },
};

const handleResponse = async (response) => {
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

const call = async (action, options = {}) => {
    const url = `${API_BASE_URL}/index.php?module=favori&action=${action}`;
    const response = await fetch(url, { ...defaultOptions, ...options });
    return handleResponse(response);
};

// ── LISTE DES FAVORIS DE L'UTILISATEUR CONNECTÉ ─────────────────
export const getFavorites = async () => {
    return await call('getAll', { method: 'GET' });
};

// ── AJOUTER UN FAVORI ───────────────────────────────────────────
export const addFavorite = async (id_menu) => {
    return await call('add', {
        method: 'POST',
        body: JSON.stringify({ id_menu })
    });
};

// ── SUPPRIMER UN FAVORI ─────────────────────────────────────────
export const removeFavorite = async (id_menu) => {
    return await call('delete', {
        method: 'POST',
        body: JSON.stringify({ id_menu })
    });
};

// ── SYNCHRONISATION COMPLÈTE (miroir local → serveur) ───────────
export const syncFavorites = async (ids) => {
    return await call('sync', {
        method: 'POST',
        body: JSON.stringify({ ids })
    });
};