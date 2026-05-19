// frontend/src/pages/admin/Testimony.jsx
import { useState, useEffect } from "react";
import { useAdminForm } from "../../contexts/AdminFormContext";
import TestimonyTableItem from "../../components/admin/TestimonyTableItem";
import { getAllTestimonies, deleteTestimony, toggleActiveTestimony } from "../../../services/testimonyApi";
import { toast } from "react-toastify";

const Testimony = () => {
  const { openForm, isFormOpen } = useAdminForm();
  
  const [filter, setFilter] = useState("all");
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les témoignages depuis l'API
  const loadTestimonies = async () => {
    try {
      setLoading(true);
      const response = await getAllTestimonies();
      if (response.success && response.testimonies) {
        setTestimonies(response.testimonies);
      }
    } catch (error) {
      console.error("Erreur chargement témoignages:", error);
      toast.error("Erreur lors du chargement des témoignages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonies();
  }, []);

  useEffect(() => {
    if (!isFormOpen) {
      // Formulaire vient d'être fermé, on recharge
      loadTestimonies();
    }
  }, [isFormOpen]);

  // Rafraîchir après chaque action
  const refreshTestimonies = async () => {
    await loadTestimonies();
  };

  const handleAddTestimony = () => {
    openForm('temoignage');
  };

  const handleEditTestimony = (testimony) => {
    openForm('temoignage', testimony);
  };

  const handleToggleActive = async (id_temoignage, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      const response = await toggleActiveTestimony(id_temoignage, newStatus);
      
      if (response.success) {
        toast.success(response.message || "Statut modifié");
        await loadTestimonies();
      } else {
        toast.error(response.message || "Erreur lors du changement de statut");
      }
    } catch (error) {
      console.error("Erreur toggle:", error);
      toast.error("Erreur lors du changement de statut");
    }
  };

  // Supprimer un témoignage
  const handleDelete = async (id_temoignage) => {
    if (!window.confirm("Supprimer ce témoignage ?")) return;
    
    try {
      const response = await deleteTestimony(id_temoignage);
      if (response.success) {
        toast.success("Témoignage supprimé");
        await loadTestimonies();
      } else {
        toast.error(response.message || "Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur suppression:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const filteredTestimonies = testimonies.filter((testimony) => {
    if (filter === "actived") return testimony.is_actived == 1;
    if (filter === "unActived") return testimony.is_actived == 0;
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
          <h1 className="text-3xl font-bold text-gray-900">Témoignages</h1>
          <p className="text-gray-600 mt-1">Aperçu de tous les témoignages du site</p>
        </div>

        <div>
          <button
            onClick={handleAddTestimony}
            className="px-5 py-2 rounded-full cursor-pointer font-bold text-sm bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Ajouter un témoignage
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
            Tous les témoignages
          </button>

          <button
            onClick={() => setFilter("actived")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "actived"
                ? "bg-yellow-400 text-white font-bold border-amber-50"
                : "text-gray-700"
            }`}
          >
            Témoignages activés
          </button>

          <button
            onClick={() => setFilter("unActived")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "unActived"
                ? "bg-yellow-400 text-white font-bold border-amber-50"
                : "text-gray-700"
            }`}
          >
            Témoignages désactivés
          </button>
        </div>
      </div>

      <div className="relative h-4/5 w-full overflow-x-auto pt-4 mt-8 bg-white shadow rounded-lg scrollbar-hide">
        
        {filteredTestimonies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="text-xl font-semibold mb-2">Aucun témoignage disponible</p>
            <p className="text-sm">
              {filter !== "all" 
                ? "Aucun témoignage dans cette catégorie de filtre" 
                : "Cliquez sur 'Ajouter un témoignage' pour commencer"}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-700 text-left uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">N°</th>
                <th scope="col" className="px-6 py-3">Photo</th>
                <th scope="col" className="px-6 py-3">Nom</th>
                <th scope="col" className="px-6 py-3">Profession</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
            </tr>
            </thead>
            <tbody>
              {filteredTestimonies.map((testimony, index) => (
                <TestimonyTableItem
                  key={testimony.id_temoignage}
                  testimonie={testimony}
                  index={index + 1}
                  toggleTes={() => handleToggleActive(testimony.id_temoignage, testimony.is_actived)}
                  archived={() => handleDelete(testimony.id_temoignage)}
                  onEdit={() => handleEditTestimony(testimony)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Testimony;