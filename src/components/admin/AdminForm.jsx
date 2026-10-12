import { useState, useEffect } from "react";
import { useAdminForm } from "../../contexts/AdminFormContext";
import { useMenu } from "../../contexts/MenuContext";
import { createMenu, updateMenu } from "../../../services/menuApi";
import { createService, updateService } from "../../../services/serviceApi";
import { createTestimony, updateTestimony } from "../../../services/testimonyApi";
import { createChef, updateChef } from "../../../services/chefApi";
import { X } from "lucide-react";

const AdminForm = () => {
    const { isFormOpen, formType, editingItem, closeForm, setLoading, triggerRefresh } = useAdminForm();
    const { fetchMenus } = useMenu();
    
    const [localLoading, setLocalLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // États communs
    const [title, setTitle] = useState("");
    const [name, setName] = useState(""); 
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    
    // États spécifiques au MENU
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [currency, setCurrency] = useState("XAF");
    const [category, setCategory] = useState("");
    const [isPublished, setIsPublished] = useState(false);
    
    // États spécifiques au SERVICE
    const [isActived, setIsActived] = useState(true);
    
    // États spécifiques au TEMOIGNAGE
    const [profession, setProfession] = useState("");
    const [testimonyMessage, setTestimonyMessage] = useState("");
    
    // États spécifiques au CHEF
    const [post, setPost] = useState("");
    const [chefDescription, setChefDescription] = useState("");
    const [socialLink, setSocialLink] = useState("");

    // Initialiser le formulaire quand on édite un élément
    useEffect(() => {
        if (editingItem) {
            // Commun
            if (editingItem.title) setTitle(editingItem.title);
            if (editingItem.name) setName(editingItem.name);
            if (editingItem.image_url) setPreview(editingItem.image_url);
            
            if (formType === "menu") {
                setDescription(editingItem.description || "");
                setPrice(editingItem.price || 0);
                setCurrency(editingItem.currency || "XAF");
                setCategory(editingItem.category || "");
                setIsPublished(editingItem.is_published === 1);
            } 
            else if (formType === "service") {
                setIsActived(editingItem.is_actived === 1);
            }
            else if (formType === "temoignage") {
                setName(editingItem.name || "");
                setProfession(editingItem.profession || "");
                setTestimonyMessage(editingItem.description || "");
                setIsActived(editingItem.is_actived === 1);
            }
            else if (formType === "chef") {
                setName(editingItem.name || "");
                setPost(editingItem.post || "");
                setChefDescription(editingItem.description || "");
                setSocialLink(editingItem.social_link || "");
                setIsActived(editingItem.is_actived === 1);
            }
        }
    }, [editingItem, formType]);

    const resetForm = () => {
        setTitle("");
        setName("");
        setImage(null);
        setPreview(null);
        setDescription("");
        setPrice(0);
        setCurrency("XAF");
        setCategory("");
        setIsPublished(false);
        setIsActived(true);
        setProfession("");
        setTestimonyMessage("");
        setPost("");
        setChefDescription("");
        setSocialLink("");
        setError(null);
        setSuccess(null);
    };

    const handleClose = () => {
        resetForm();
        closeForm();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const getTitle = () => {
        const action = editingItem ? "Modifier" : "Ajouter";
        const items = {
            menu: "le menu",
            service: "le service",
            temoignage: "le témoignage",
            chef: "le chef"
        };
        return `${action} ${items[formType] || "l'élément"}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalLoading(true);
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            let response;
            
            if (formType === "menu") {
                const formData = new FormData();
                formData.append("title", title);
                formData.append("description", description);
                formData.append("price", price);
                formData.append("currency", currency);
                formData.append("category", category);
                formData.append("is_published", isPublished ? 1 : 0);
                if (image) formData.append("image", image);
                if (editingItem) formData.append("id_menu", editingItem.id_menu || editingItem.id);

                response = editingItem ? await updateMenu(formData) : await createMenu(formData);
                if (response.success && fetchMenus) await fetchMenus();
            } 
            else if (formType === "service") {
                const formData = new FormData();
                formData.append("title", title);
                formData.append("is_Actived", isActived ? 1 : 0);
                if (image) formData.append("image", image);
                if (editingItem) formData.append("id_service", editingItem.id_service || editingItem.id);

                response = editingItem ? await updateService(formData) : await createService(formData);
            }
            else if (formType === "temoignage") {
                const formData = new FormData();
                formData.append("name", name);
                formData.append("profession", profession);
                formData.append("description", testimonyMessage);
                formData.append("is_actived", isActived ? 1 : 0);
                if (image) formData.append("image_url", image);
                if (editingItem) formData.append("id_temoignage", editingItem.id_temoignage || editingItem.id);

                response = editingItem ? await updateTestimony(formData) : await createTestimony(formData);
            }
            else if (formType === "chef") {
                const formData = new FormData();
                formData.append("name", name);
                formData.append("post", post);
                formData.append("description", chefDescription);
                formData.append("social_link", socialLink);
                formData.append("is_actived", isActived ? 1 : 0);
                if (image) formData.append("image_url", image);
                if (editingItem) formData.append("id_chef", editingItem.id_chef || editingItem.id);

                response = editingItem ? await updateChef(formData) : await createChef(formData);
            }

            if (response?.success) {
                // Notifie les pages admin (tableau des chefs, etc.) pour rechargement immédiat
                triggerRefresh();
                setSuccess(editingItem ? "Mis à jour avec succès !" : "Créé avec succès !");
                setTimeout(() => {
                    resetForm();
                    closeForm();
                }, 1500);
            } else {
                setError(response?.message || "Erreur lors de l'enregistrement.");
            }
        } catch (err) {
            console.error("Erreur:", err);
            setError(err.message || "Une erreur est survenue.");
        } finally {
            setLocalLoading(false);
            setLoading(false);
        }
    };

    if (!isFormOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[95vh] flex flex-col">
                
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">{getTitle()}</h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-yellow-500 text-2xl cursor-pointer">
                        <X size={24} />
                    </button>
                </div>

                {error && <div className="mx-4 mt-4 p-3 bg-red-50 text-red-700 rounded-lg">❌ {error}</div>}
                {success && <div className="mx-4 mt-4 p-3 bg-green-50 text-green-700 rounded-lg">✅ {success}</div>}

                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <form id="admin-form" onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Nom / Titre selon le type */}
                        {formType === "menu" || formType === "service" ? (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500" />
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500" />
                            </div>
                        )}

                        {/* Champs MENU */}
                        {formType === "menu" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
                                        <select value={category} onChange={(e) => setCategory(e.target.value)} required
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                            <option value="">-- Choisir --</option>
                                            <option value="Petit-déjeuner">Petit-déjeuner</option>
                                            <option value="Déjeuner">Déjeuner</option>
                                            <option value="Dîner">Dîner</option>
                                            <option value="Plats principaux">Plats principaux</option>
                                            <option value="Boissons">Boissons</option>
                                            <option value="Desserts">Desserts</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Prix *</label>
                                        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                                    </div>
                                </div>
                                <div>
                                    <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                        <option value="XAF">XAF (Franc CFA)</option>
                                        <option value="EUR">EUR (Euro)</option>
                                        <option value="USD">USD (Dollar)</option>
                                    </select>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
                                        <span className="text-sm font-medium">Publier directement</span>
                                    </label>
                                </div>
                            </>
                        )}

                        {/* Champs SERVICE */}
                        {formType === "service" && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={isActived} onChange={(e) => setIsActived(e.target.checked)} />
                                    <span className="text-sm font-medium">Activer le service</span>
                                </label>
                            </div>
                        )}

                        {/* Champs TEMOIGNAGE */}
                        {formType === "temoignage" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                    <input type="text" value={profession} onChange={(e) => setProfession(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Chef cuisinier, Client, etc." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                                    <textarea value={testimonyMessage} onChange={(e) => setTestimonyMessage(e.target.value)} rows={4} required
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none" placeholder="Partagez votre expérience..." />
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" checked={isActived} onChange={(e) => setIsActived(e.target.checked)} />
                                        <span className="text-sm font-medium">Afficher le témoignage sur le site</span>
                                    </label>
                                </div>
                            </>
                        )}

                        {/* Champs CHEF */}
                        {formType === "chef" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Poste / Spécialité *</label>
                                    <input type="text" value={post} onChange={(e) => setPost(e.target.value)} required
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Chef Pâtissier, Chef Exécutif, etc." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Biographie / Description</label>
                                    <textarea value={chefDescription} onChange={(e) => setChefDescription(e.target.value)} rows={3}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none" placeholder="Parcours, spécialités, etc." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Lien social (Instagram, LinkedIn, etc.)</label>
                                    <input type="url" value={socialLink} onChange={(e) => setSocialLink(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="https://instagram.com/..." />
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" checked={isActived} onChange={(e) => setIsActived(e.target.checked)} />
                                        <span className="text-sm font-medium">Afficher le chef sur le site</span>
                                    </label>
                                </div>
                            </>
                        )}

                        {/* Image (commun à tous) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image
                                {editingItem && <span className="text-xs text-gray-400 ml-2">(laisser vide pour garder l'image actuelle)</span>}
                            </label>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border rounded-lg px-3 py-2" />
                            {preview && <img src={preview} alt="Aperçu" className="w-28 h-28 object-cover rounded-lg mt-3" />}
                        </div>

                    </form>
                </div>

                <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
                    <button onClick={handleClose} className="px-4 py-2 bg-white border rounded-lg cursor-pointer">Annuler</button>
                    <button type="submit" form="admin-form" disabled={localLoading}
                        className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg cursor-pointer disabled:opacity-50">
                        {localLoading ? "En cours..." : (editingItem ? "Mettre à jour" : "Enregistrer")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminForm;