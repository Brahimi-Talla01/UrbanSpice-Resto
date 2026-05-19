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

    
    // Pour FormData, ne pas définir Content-Type (le navigateur le fait automatiquement)
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

    export const toggleService = async (id_service) => {
        try {
            const response = await fetch(
                `http://localhost/UrbanSpice-Resto/backend/index.php?module=service&action=toggle`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_service })
                }
            );
            return await response.json();
        } catch (error) {
            console.error("Erreur toggle:", error);
            throw error;
        }
    };

  export const archiveService = async (id_service) => {
    if (!window.confirm("Supprimer ce service ?")) return;
    
    try {
      const response = await fetch(
        `http://localhost/UrbanSpice-Resto/backend/index.php?module=service&action=delete`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_service })
        }
      );
      const data = await response.json();
      if (data.success) {
        loadServices();
      }
    } catch (error) {
      console.error("Erreur suppression:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

/**
 * Créer un service (admin uniquement)
 * @param {FormData} formData - Données du service avec image
 */
export const createService = async (formData) => {
    return apiCall('service', 'create', {
        method: 'POST',
        body: formData
    });
};

/**
 * Mettre à jour un service (admin uniquement)
 * @param {FormData} formData - Données du service avec image
 */
export const updateService = async (formData) => {
    // Correction: 'updateServive' -> 'updateService'
    return apiCall('service', 'update', {
        method: 'POST',  // POST pour FormData (ou PUT selon votre backend)
        body: formData
    });
};

/**
 * Récupérer les services actifs (public)
 */
export const getActiveService = async () => {
    return apiCall('service', 'getActive', {
        method: 'GET'
    });
};

/**
 * Récupérer tous les services (admin uniquement)
 */
export const getAllServices = async () => {
    return apiCall('service', 'getAll', {
        method: 'GET'
    });
};

/**
 * Récupérer un service par son ID
 * @param {number} id_service - ID du service
 */
export const getServiceById = async (id_service) => {
    return apiCall('service', 'getById', {
        method: 'GET'
    });
};



/**
 * Activer/Désactiver un service (admin uniquement)
 * @param {number} id_service - ID du service
 * @param {boolean} is_activated - true pour activer, false pour désactiver
 */
export const toggleActiveService = async (id_service, is_activated) => {
    return apiCall('service', 'toggleActive', {
        method: 'POST',
        body: JSON.stringify({ id_service, is_activated })
    });
};

/**
 * Supprimer un service (admin uniquement)
 * @param {number} serviceId - ID du service à supprimer
 */
export const deleteService = async (serviceId) => {
    return apiCall('service', 'delete', {
        method: 'DELETE',
        body: JSON.stringify({ id_service: serviceId })
    });
};

/**
 * Publier/Dépublier un service (admin uniquement)
 * @param {number} id_service - ID du service
 * @param {boolean} is_published - true pour publier, false pour dépublier
 */
export const togglePublishService = async (id_service, is_published) => {
    return apiCall('service', 'togglePublish', {
        method: 'POST',
        body: JSON.stringify({ id_service, is_published })
    });
};

// ========================================
// EXPORTS GROUPÉS (optionnel)
// ========================================
export const serviceAPI = {
    create: createService,
    update: updateService,
    getActive: getActiveService,
    getAll: getAllServices,
    getById: getServiceById,
    toggleActive: toggleActiveService,
    delete: deleteService,
    togglePublish: togglePublishService,
};