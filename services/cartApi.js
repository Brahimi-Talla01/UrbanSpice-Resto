// services/cartApi.js
//
// Panier côté serveur (module=cart, garde « auth ») : miroir du
// panier localStorage. Les prix sont relus en BDD par le serveur.
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
    const url = `${API_BASE_URL}/index.php?module=cart&action=${action}`;
    const response = await fetch(url, { ...defaultOptions, ...options });
    return handleResponse(response);
};

// ── PANIER DE L'UTILISATEUR CONNECTÉ ────────────────────────────
export const getCart = async () => {
    return await call('getAll', { method: 'GET' });
};

// ── SYNCHRONISATION COMPLÈTE (miroir local → serveur) ───────────
// items : [{ id_menu: number, quantity: number }, ...]
export const syncCart = async (items) => {
    return await call('sync', {
        method: 'POST',
        body: JSON.stringify({ items })
    });
};

// ── VIDER LE PANIER (après commande réussie) ────────────────────
export const clearCartOnServer = async () => {
    return await call('clear', { method: 'POST' });
};