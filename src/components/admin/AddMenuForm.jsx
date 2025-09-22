import { useState, useEffect } from "react";
import { useMenu } from "../../contexts/MenuContext";

const AddMenuForm = () => {
    const { addMenu, updateMenu, closeForm, editingMenu } = useMenu();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Petit-déjeuner",
        price: "",
        currency: "XAF",
        image: null,
        is_published: false,
    });
    const [preview, setPreview] = useState(null);

    // Charger les données du menu à éditer
    useEffect(() => {
        if (editingMenu) {
            setFormData({
                title: editingMenu.title || "",
                description: editingMenu.description || "",
                category: editingMenu.category || "Petit-déjeuner",
                price: editingMenu.price?.toString() || "",
                currency: editingMenu.currency || "XAF",
                image: null, 
                is_published: editingMenu.is_published || false,
            });
            
            // Si le menu a déjà une image, on l'affiche en preview
            if (editingMenu.image_url) {
                setPreview(editingMenu.image_url);
            }
        }
    }, [editingMenu]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file, }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingMenu) {
            // Mode édition
            const updatedMenu = {
                ...editingMenu,
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                currency: formData.currency,
                image_url: formData.image || editingMenu.image_url,
                category: formData.category,
                is_published: formData.is_published,
                published_at: formData.is_published ? 
                    (editingMenu.published_at || new Date().toISOString()) : 
                    null,
            };

            updateMenu(updatedMenu);
        } else {
            // Mode ajout
            const newMenu = {
                id: `uuid-${Date.now()}`,
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                currency: formData.currency,
                image_url: formData.image, 
                category: formData.category,
                rating: 0, 
                is_published: formData.is_published,
                published_at: formData.is_published ? new Date().toISOString() : null,
                is_deleted: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };

            addMenu(newMenu);
        }

        closeForm(); 
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[95vh] flex flex-col">
                {/* Header fixe */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        {editingMenu ? "Modifier le menu" : "Ajouter un menu"}
                    </h2>
                    <button
                        type="button"
                        onClick={closeForm}
                        className='text-gray-400 hover:text-yellow-500 transition duration-300 cursor-pointer text-2xl sm:text-3xl font-light'
                    >
                        ×
                    </button>
                </div>

                {/* Contenu scrollable */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        {/* Titre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Titre *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                                placeholder="Nom du plat"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none"
                                placeholder="Description du plat..."
                            />
                        </div>

                        {/* Catégorie et Prix en ligne sur desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Catégorie */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Catégorie
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                                >
                                    <option value="Petit-déjeuner">Petit-déjeuner</option>
                                    <option value="Déjeuner">Déjeuner</option>
                                    <option value="Dîner">Dîner</option>
                                    <option value="Boissons">Boissons</option>
                                    <option value="Desserts">Desserts</option>
                                </select>
                            </div>

                            {/* Prix */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Prix *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* Unité monétaire */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Unité monétaire
                            </label>
                            <select
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                            >
                                <option value="XAF">XAF (Franc CFA)</option>
                                <option value="EUR">EUR (Euro)</option>
                                <option value="USD">USD (Dollar)</option>
                                <option value="CAD">CAD (Dollar canadien)</option>
                            </select>
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image du plat
                                {editingMenu && (
                                    <span className="text-xs text-gray-500 ml-2">
                                        (laisser vide pour garder l'image actuelle)
                                    </span>
                                )}
                            </label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImage} 
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 transition-all"
                            />
                            {preview && (
                                <div className="mt-3 flex justify-center">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Options de publication */}
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.is_published}
                                    onChange={() =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            is_published: !prev.is_published,
                                        }))
                                    }
                                    className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    Publier directement
                                </span>
                            </label>
                            <p className="text-xs text-gray-500 mt-1 ml-6">
                                {formData.is_published 
                                    ? "Le menu sera visible publiquement" 
                                    : "Le menu sera sauvegardé en brouillon"
                                }
                            </p>
                        </div>
                    </form>
                </div>

                {/* Footer avec boutons fixe */}
                <div className="flex justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                    <button
                        type="button"
                        onClick={closeForm}
                        className=" cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-yellow-500 transition-all"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg hover:from-yellow-600 hover:to-orange-600 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all transform hover:scale-105 cursor-pointer"
                    >
                        {editingMenu ? "Mettre à jour" : "Enregistrer"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMenuForm;