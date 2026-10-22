// frontend/services/newsletterApi.js
//
// Abonnement newsletter (module=newsletter).
// Même format que les autres services (cartApi, statsApi) :
// credentials pour la session, contrôle du Content-Type, erreurs normalisées.

const API_BASE_URL = 'http://localhost/UrbanSpice-Resto/backend';

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

/**
 * S'abonner à la newsletter (formulaire du footer)
 * Retour : { success, message, status: 'subscribed' | 'reactivated' | 'already' }
 */
export const subscribeNewsletter = async (email) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=newsletter&action=subscribe`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'POST',
            body: JSON.stringify({ email })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur abonnement newsletter:', error);
        throw error;
    }
};

/**
 * Récupérer TOUS les abonnés (admin) — actifs et désabonnés :
 * la page admin gère les deux statuts (filtre is_active côté front).
 * Retour : { success, subscribers: [{ id_subscriber, email, is_active, created_at }] }
 */
export const getSubscribers = async () => {
    try {
        const url = `${API_BASE_URL}/index.php?module=newsletter&action=getAll`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'GET',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur récupération abonnés newsletter:', error);
        throw error;
    }
};

/**
 * Désabonner / réactiver un abonné (admin) — soft (is_active 1 ↔ 0,
 * jamais de suppression physique : voir NewsletterModel).
 * Retour : { success, message, subscriber: { id_subscriber, email, is_active } }
 */
export const toggleSubscriber = async (id_subscriber, is_active) => {
    try {
        const url = `${API_BASE_URL}/index.php?module=newsletter&action=toggle`;
        const response = await fetch(url, {
            ...defaultOptions,
            method: 'POST',
            body: JSON.stringify({
                id_subscriber: parseInt(id_subscriber),
                is_active: parseInt(is_active)
            })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Erreur mise à jour abonné newsletter:', error);
        throw error;
    }
};
