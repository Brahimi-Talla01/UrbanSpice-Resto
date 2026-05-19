// services/api.js - Version corrigée avec index centralisé

// ✅ CHANGEMENT IMPORTANT: Utiliser index.php au lieu des contrôleurs directs
const API_BASE_URL = 'http://localhost/UrbanSpice-Resto/backend';

// Configuration par défaut pour fetch
const defaultOptions = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    }
};

/**
 * Fonction générique pour appeler l'API via index.php
 */
const apiCall = async (module, action, options = {}) => {
    const url = `${API_BASE_URL}/index.php?module=${module}&action=${action}`;
    
    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    };
    
    // Pour FormData, ne pas définir Content-Type
    if (options.body instanceof FormData) {
        delete mergedOptions.headers['Content-Type'];
    }
    
    try {
        const response = await fetch(url, mergedOptions);
        
        // Vérifier le content-type
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Réponse non-JSON reçue:', text);
            throw new Error('Le serveur a retourné du HTML au lieu de JSON');
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
    } catch (error) {
        console.error(`Erreur API [${module}/${action}]:`, error);
        throw error;
    }
};

/**
 * Récupérer le profil utilisateur
 */
export const getUserProfil = async () => {
    try {
        // ✅ CHANGEMENT: utiliser module=user&action=profile
        return await apiCall('user', 'profile', { method: 'GET' });
    } catch (error) {
        console.error("Erreur récupération profil:", error);
        throw error;
    }
};

/**
 * Mettre à jour le profil
 */
export const updateProfile = async (userData) => {
    try {
        // ✅ CHANGEMENT: utiliser module=user&action=update
        return await apiCall('user', 'update', {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    } catch (error) {
        console.error("Erreur mise à jour profil:", error);
        throw error;
    }
};

/**
 * Déconnexion utilisateur
 */
export const logout = async () => {
    try {
        // ✅ CHANGEMENT: utiliser module=auth&action=logout
        return await apiCall('auth', 'logout', {
            method: 'POST'
        });
    } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
        throw error;
    }
};

/**
 * Vérifier la session utilisateur
 */
export const checkSession = async () => {
    try {
        // ✅ CHANGEMENT: utiliser module=auth&action=check
        return await apiCall('auth', 'check', { method: 'GET' });
    } catch (error) {
        console.error("Erreur vérification session:", error);
        throw error;
    }
};

/**
 * Récupérer tous les utilisateurs (admin seulement)
 */
export const getAllUser = async () => {
    try {
        // ✅ CHANGEMENT: utiliser module=admin&action=users
        return await apiCall('admin', 'users', { method: 'GET' });
    } catch (error) {
        console.error("Erreur récupération utilisateurs:", error);
        throw error;
    }
};

// ========================================
// EXPORTS POUR AUTH
// ========================================
// api.js - Version corrigée de authAPI.check()
export const authAPI = {
    login: (email, password) => {
        return apiCall('auth', 'login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    },
    register: (userData) => {
        return apiCall('auth', 'register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },
    logout: () => {
        return apiCall('auth', 'logout', { method: 'POST' });
    },
    check: () => {
        // ✅ Retourner la réponse brute pour voir la structure
        return apiCall('auth', 'check', { method: 'GET' });
    },
};