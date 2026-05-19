// frontend/src/pages/admin/Service.jsx
import { useState, useEffect } from "react";
import { useAdminForm } from "../../contexts/AdminFormContext";
import ServiceTableItem from "../../components/admin/ServiceTableItem";
import { getAllServices, deleteService, toggleService } from "../../../services/serviceApi";
import { toast } from "react-toastify";

const Service = () => {
  const { openForm, closeForm, isFormOpen } = useAdminForm(); 
  
  const [filter, setFilter] = useState("all");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les services depuis l'API
  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await getAllServices();
      if (response.success && response.services) {
        setServices(response.services);
      }
    } catch (error) {
      console.error("Erreur chargement services:", error);
      toast.error("Erreur lors du chargement des services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const refreshServices = () => {
    loadServices();
  };

  const handleAddService = () => {
    openForm('service');
  };

  const handleEditService = (service) => {
    openForm('service', service);
  };

  useEffect(() => {
    if (!isFormOpen) {
      // Formulaire vient d'être fermé, on recharge
      refreshServices();
    }
  }, [isFormOpen]);

  const handleToggleActive = async (id_service, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      const response = await toggleService(id_service, newStatus);
      
      if (response.success) {
        toast.success(response.message || "Statut modifié");
        await loadServices(); 
      } else {
        toast.error(response.message || "Erreur lors du changement de statut");
      }
    } catch (error) {
      console.error("Erreur toggle:", error);
      toast.error("Erreur lors du changement de statut");
    }
  };

  const handleDelete = async (id_service) => {
    if (!window.confirm("Supprimer ce service ?")) return;
    
    try {
      const response = await deleteService(id_service);
      if (response.success) {
        toast.success("Service supprimé");
        await loadServices();
      } else {
        toast.error(response.message || "Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur suppression:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const filteredService = services.filter((service) => {
    if (filter === "actived") return service.is_actived == 1;
    if (filter === "unActived") return service.is_actived == 0;
    return true;
  });

  if (loading) {
    return (
      <div className="relative flex-1 p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="relative flex-1 p-6 bg-gray-50 min-h-screen">
      <div className="w-full flex items-center justify-between">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-1">Aperçu de tous les services du restaurant</p>
        </div>

        <div>
          <button
            onClick={handleAddService}
            className="px-5 py-2 rounded-full cursor-pointer font-bold text-sm bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Ajouter un service
          </button>
        </div>
      </div>

      <div className="w-full flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("all")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "all"
                ? "bg-yellow-400 text-white font-bold border-amber-50"
                : "text-gray-700"
            }`}
          >
            Tous les services
          </button>

          <button
            onClick={() => setFilter("actived")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "actived"
                ? "bg-yellow-400 text-white font-bold border-amber-50"
                : "text-gray-700"
            }`}
          >
            Services activés
          </button>

          <button
            onClick={() => setFilter("unActived")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "unActived"
                ? "bg-yellow-400 text-white font-bold border-amber-50"
                : "text-gray-700"
            }`}
          >
            Services non activés
          </button>
        </div>
      </div>

      <div className="relative h-4/5 w-full overflow-x-auto pt-4 mt-8 bg-white shadow rounded-lg scrollbar-hide">
        
        {/* Message quand la liste est vide */}
        {filteredService.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-xl font-semibold mb-2">Aucun service disponible</p>
            <p className="text-sm">
              {filter !== "all" 
                ? "Aucun service dans cette catégorie de filtre" 
                : "Cliquez sur 'Ajouter un service' pour commencer"}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-700 text-left uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">Numero</th>
                <th scope="col" className="px-6 py-3">Icône du service</th>
                <th scope="col" className="px-6 py-3">Titre</th>
                <th scope="col" className="px-6 py-3">Date de creation</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredService.map((service, index) => (
                <ServiceTableItem
                  key={service.id_service}
                  service={service}
                  index={index + 1}
                  toggleActived={() => handleToggleActive(service.id_service, service.is_actived)}
                  archiveService={() => handleDelete(service.id_service)}
                  onEdit={() => handleEditService(service)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Service;