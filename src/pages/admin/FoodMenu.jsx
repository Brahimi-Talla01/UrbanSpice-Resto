import { useState } from "react";
import { useMenu } from "../../contexts/MenuContext";
import AddMenuForm from "../../components/admin/AddMenuForm";
import MenuTableItem from "../../components/admin/MenuTableItem";

const FoodMenu = () => {
  const { 
    menus, 
    isFormOpen, 
    setIsFormOpen, 
    togglePublish, 
    deleteMenu, 
    openEditForm,
    closeForm 
  } = useMenu();
  
  const [filter, setFilter] = useState("all");

  const filteredMenus = menus.filter((menu) => {
    if (filter === "published") return menu.is_published;
    if (filter === "unpublished") return !menu.is_published;
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
          <h1 className="text-3xl font-bold text-gray-900">Menus</h1>
          <p className="text-gray-600 mt-1">Aperçu de tous les menus du restaurant</p>
        </div>

        <div>
          <button
            onClick={handleAddMenu}
            className="px-5 py-2 rounded-full cursor-pointer font-bold text-sm bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Ajouter un menu
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
            Tous les menus
          </button>

          <button
            onClick={() => setFilter("published")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "published"
                ? "bg-yellow-400 text-white font-bold border-amber-50"
                : "text-gray-700"
            }`}
          >
            Menus publiés
          </button>

          <button
            onClick={() => setFilter("unpublished")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "unpublished"
                ? "bg-yellow-400 text-white font-bold border-amber-50"
                : "text-gray-700"
            }`}
          >
            Menus non publiés
          </button>
        </div>
      </div>

      {/* Table des menus */}
      <div className="relative h-4/5 w-full overflow-x-auto pt-4 mt-8 bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Nom</th>
              <th scope="col" className="px-6 py-3">Catégorie</th>
              <th scope="col" className="px-6 py-3">Prix</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">Créé le</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMenus.map((menu, index) => (
              <MenuTableItem
                key={menu.id}
                menu={menu}
                index={index + 1}
                togglePublish={togglePublish}
                deleteMenu={deleteMenu}
                onEdit={() => openEditForm(menu)}
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

export default FoodMenu;