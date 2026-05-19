import { useState, useEffect } from "react";
import { useMenu } from "../../contexts/MenuContext";
import { createMenu, updateMenu } from "../../../services/menuApi";

const AddMenuForm = () => {
    const { closeForm, editingMenu, fetchMenus } = useMenu();
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);
    const [success, setSuccess] = useState(null);

    const [formData, setFormData] = useState({
        title:        "",
        description:  "",
        category:     "",
        rating:       0,
        price:        0,
        currency:     "XAF",
        image:        null,
        is_published: false,
    });
    const [preview, setPreview] = useState(null);

    // Pré-remplir si on est en mode édition
    useEffect(() => {
        if (editingMenu) {
            setFormData({
                title:        editingMenu.title        || "",
                description:  editingMenu.description  || "",
                category:     editingMenu.category     || "",
                price:        editingMenu.price        || 0,
                currency:     editingMenu.currency     || "XAF",
                rating:       editingMenu.rating       || 0,
                image:        null,
                
                is_published: Number(editingMenu.is_published) === 1,
            });
            if (editingMenu.image_url) {
                setPreview(editingMenu.image_url);
            }
        }
    }, [editingMenu]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Validation côté frontend
        if (!formData.title.trim()) {
            setError("Le titre est obligatoire.");
            setLoading(false);
            return;
        }
        if (!formData.category) {
            setError("La catégorie est obligatoire.");
            setLoading(false);
            return;
        }

        try {
            const menuData = {
                id_menu:      editingMenu?.id_menu || editingMenu?.id,
                title:        formData.title.trim(),
                description:  formData.description.trim(),
                price:        Number(formData.price),
                currency:     formData.currency,
                category:     formData.category,
                rating:       Number(formData.rating),
                image:        formData.image,
                is_published: formData.is_published,
            };

            let response;
            if (editingMenu) {
                response = await updateMenu(menuData);
            } else {
                response = await createMenu(menuData);
            }

            if (response.success) {
                setSuccess(
                    editingMenu
                        ? "Menu mis à jour avec succès !"
                        : formData.is_published
                            ? "Menu créé et publié avec succès !"
                            : "Menu créé en brouillon."
                );

                // Recharger la liste des menus dans le dashboard
                if (fetchMenus) await fetchMenus();

                // Fermer après 1.2s pour que l'utilisateur voie le message
                setTimeout(() => closeForm(), 1200);
            } else {
                setError(response.message || "Erreur lors de l'enregistrement.");
            }
        } catch (err) {
            setError(err.message || "Une erreur est survenue. Vérifier la console.");
            console.error("Erreur formulaire menu:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[95vh] flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        {editingMenu ? "Modifier le menu" : "Ajouter un menu"}
                    </h2>
                    <button
                        type="button"
                        onClick={closeForm}
                        className='text-gray-400 hover:text-yellow-500 transition duration-300 cursor-pointer text-2xl font-light'
                    >
                        &times;
                    </button>
                </div>

                {/* Messages */}
                {error && (
                    <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg text-sm">
                         {error}
                    </div>
                )}
                {success && (
                    <div className="mx-4 mt-4 p-3 bg-green-50 border border-green-300 text-green-700 rounded-lg text-sm">
                        {success}
                    </div>
                )}

                {/* Formulaire scrollable */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <form id="menu-form" onSubmit={handleSubmit} className="space-y-4">

                        {/* Titre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Titre <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                                placeholder="Description du plat..."
                            />
                        </div>

                        {/* Catégorie + Prix */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Catégorie <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="">-- Choisir --</option>
                                    <option value="Petit-déjeuner">Petit-déjeuner</option>
                                    <option value="Déjeuner">Déjeuner</option>
                                    <option value="Dîner">Dîner</option>
                                    <option value="Brunch">Brunch</option>
                                    <option value="Boissons">Boissons</option>
                                    <option value="Desserts">Desserts</option>
                                    <option value="Plats principaux">Plats principaux</option>
                                    <option value="Accompagnements">Accompagnements</option>
                                    <option value="Cuisine saine">Cuisine saine</option>
                                    <option value="Cuisine locale">Cuisine locale</option>
                                    <option value="Cuisine occidentale">Cuisine occidentale</option>
                                    <option value="Cuisine gourmande">Cuisine gourmande</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Prix <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* Devise */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Devise
                            </label>
                            <select
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
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
                                    <span className="text-xs text-gray-400 ml-2">
                                        (laisser vide pour garder l'image actuelle)
                                    </span>
                                )}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer text-sm"
                            />
                            {preview && (
                                <div className="mt-3 flex justify-center">
                                    <img
                                        src={preview}
                                        alt="Aperçu"
                                        className="w-28 h-28 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Publication */}
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="is_published"
                                    checked={formData.is_published}
                                    onChange={handleChange}
                                    className="w-4 h-4 accent-yellow-500"
                                />
                                <div>
                                    <span className="text-sm font-medium text-gray-700">
                                        Publier directement
                                    </span>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {formData.is_published
                                            ? " Le menu sera visible sur le site public"
                                            : " Le menu sera sauvegardé en brouillon"}
                                    </p>
                                </div>
                            </label>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                    <button
                        type="button"
                        onClick={closeForm}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        form="menu-form"
                        disabled={loading}
                        className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all disabled:opacity-50"
                    >
                        {loading
                            ? "En cours..."
                            : editingMenu ? "Mettre à jour" : "Enregistrer"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMenuForm;
