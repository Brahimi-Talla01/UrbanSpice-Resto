import { useState, useEffect, useCallback } from "react";
import { useAdminForm } from "../../contexts/AdminFormContext";
import ChefTableItem from "../../components/admin/ChefTableItem";
import { getAllChefs, deleteChef, toggleActiveChef } from "../../../services/chefApi";
import { toast } from "react-toastify";

const Chefs = () => {
  const { openForm, refreshKey } = useAdminForm();
  
  const [filter, setFilter] = useState("all");
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les chefs depuis l'API (mémoïsé : rechargé à chaque refreshKey)
  const loadChefs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllChefs();
      if (response.success && response.chefs) {
        setChefs(response.chefs);
      }
    } catch (error) {
      console.error("Erreur chargement chefs:", error);
      toast.error("Erreur lors du chargement des chefs");
    } finally {
      setLoading(false);
    }
  }, []);

  // Recharger la liste au montage puis après chaque création/modification
  // réussie via le formulaire admin (triggerRefresh du AdminFormContext)
  useEffect(() => {
    loadChefs();
  }, [loadChefs, refreshKey]);

  // Rafraîchir après chaque action
  const refreshChefs = async () => {
    await loadChefs();
  };

  const handleAddChef = () => {
    openForm('chef');
  };

  const handleEditChef = (chef) => {
    openForm('chef', chef);
  };

  const handleToggleActive = async (id_chef, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      const response = await toggleActiveChef(id_chef, newStatus);
      
      if (response.success) {
        toast.success(response.message || "Statut modifié");
        await refreshChefs();
      } else {
        toast.error(response.message || "Erreur lors du changement de statut");
      }
    } catch (error) {
      console.error("Erreur toggle:", error);
      toast.error("Erreur lors du changement de statut");
    }
  };

  const handleDelete = async (id_chef) => {
    if (!window.confirm("Supprimer ce chef ?")) return;
    
    try {
      const response = await deleteChef(id_chef);
      if (response.success) {
        toast.success("Chef supprimé");
        await refreshChefs();
      } else {
        toast.error(response.message || "Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur suppression:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const filteredChefs = chefs.filter((chef) => {
    if (filter === "actived") return chef.is_actived == 1;
    if (filter === "unActived") return chef.is_actived == 0;
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
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Les chefs cuisiniers</h1>
          <p className="text-gray-600 mt-1">Aperçu de tous les chefs cuisiniers du site</p>
        </div>

        <div>
          <button
            onClick={handleAddChef}
            className="px-5 py-2 rounded-full cursor-pointer font-bold text-sm bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Ajouter un chef cuisinier
          </button>
        </div>
      </div>

      {/* Filtres */}
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
            Tous les chefs cuisiniers
          </button>

          <button
            onClick={() => setFilter("actived")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "actived"
                ? "bg-yellow-400 text-white font-bold border-amber-50"
                : "text-gray-700"
            }`}
          >
            Chefs activés
          </button>

          <button
            onClick={() => setFilter("unActived")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "unActived"
                ? "bg-yellow-400 text-white font-bold border-amber-50"
                : "text-gray-700"
            }`}
          >
            Chefs désactivés
          </button>
        </div>
      </div>

      {/* Table des chefs */}
      <div className="relative h-4/5 w-full overflow-x-auto pt-4 mt-8 bg-white shadow rounded-lg scrollbar-hide">
        
        {/* Message quand la liste est vide */}
        {filteredChefs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p className="text-xl font-semibold mb-2">Aucun chef disponible</p>
            <p className="text-sm">
              {filter !== "all" 
                ? "Aucun chef dans cette catégorie de filtre" 
                : "Cliquez sur 'Ajouter un chef cuisinier' pour commencer"}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-700 text-left uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">Numero</th>
                <th scope="col" className="px-6 py-3">Photo</th>
                <th scope="col" className="px-6 py-3">Nom</th>
                <th scope="col" className="px-6 py-3">Poste</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Date d'ajout</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredChefs.map((chef, index) => (
                <ChefTableItem
                  key={chef.id_chef}
                  chef={chef}
                  index={index + 1}
                  toggleChef={() => handleToggleActive(chef.id_chef, chef.is_actived)}
                  archiveChef={() => handleDelete(chef.id_chef)}
                  onEdit={() => handleEditChef(chef)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Chefs;