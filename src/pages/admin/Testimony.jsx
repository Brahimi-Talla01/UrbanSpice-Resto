import { useState } from "react";
import { useMenu } from "../../contexts/MenuContext";
import AddMenuForm from "../../components/admin/AddMenuForm";
import TestimonyTableItem from "../../components/admin/TestimonyTableItem";

const Testimony = () => {
  const { 
    testimonies, 
    isFormOpen, 
    setIsFormOpen, 
    archiveTestimony, 
    toggleTestimony, 
    openEditForm,
    closeForm 
  } = useMenu();
  
  const [filter, setFilter] = useState("all");
  

  const filteredService = testimonies.filter((testimonie) => {
    if (filter === "actived") return testimonie.is_actived;
    if (filter === "unActived") return !testimonie.is_actived;
    return true;
  });

  // Fonction pour ouvrir le formulaire en mode ajout
  const handleAddMenu = () => {
    setIsFormOpen(true);
  };

  return (
    <div className="relative flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Témoignages</h1>
          <p className="text-gray-600 mt-1">Aperçu de tous les témoignages du site</p>
        </div>

        <div>
          <button
            onClick={handleAddMenu}
            className="px-5 py-2 rounded-full cursor-pointer font-bold text-sm bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Ajouter un témoignage
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

      {/* Table des menus */}
      <div className="relative h-4/5 w-full overflow-x-auto pt-4 mt-8 bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Numero</th>
              <th scope="col" className="px-6 py-3">Photo</th>
              <th scope="col" className="px-6 py-3">Nom</th>
              <th scope="col" className="px-6 py-3">Profession</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Date de d'ajout</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredService.map((testimonie, index) => (
              <TestimonyTableItem
                key={index}
                testimonie={testimonie}
                index={index + 1}
                toggleTes={toggleTestimony}
                archived={archiveTestimony}
                onEdit={() => openEditForm(testimonie)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulaire modal */}
      {isFormOpen && <AddMenuForm />}

      {/* Overlay pour fermer le formulaire */}
      {isFormOpen && 
        <div onClick={closeForm} className="fixed inset-0 bg-black/20 z-40" />
      }
    </div>
  );
};

export default Testimony;