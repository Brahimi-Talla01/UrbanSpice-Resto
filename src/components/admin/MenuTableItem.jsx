import { Trash2, Pencil, CheckCircle2, CircleOff } from "lucide-react";

const MenuTableItem = ({ menu, togglePublish, deleteMenu, onEdit }) => {

    const menuId      = menu.id_menu || menu.id;
    const isPublished = Number(menu.is_published) === 1;

    const handleTogglePublish = () => {
        // On envoie l'inverse de l'état actuel
        togglePublish(menuId, !isPublished);
    };

    const handleDelete = () => {
        if (window.confirm(`Supprimer "${menu.title}" ?`)) {
            deleteMenu(menuId);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr || dateStr.startsWith('0000-00-00')) return '--';
        const date = new Date(dateStr.replace(' ', 'T')); // Safari fix
        if (isNaN(date.getTime())) return '--';
        return date.toLocaleDateString('fr-FR', {
            day:   '2-digit',
            month: '2-digit',
            year:  'numeric',
        });
    };

    // prix formaté
    const priceDisplay = menu.price
        ? `${Number(menu.price).toLocaleString('fr-FR')} ${menu.currency || ''}`
        : '--';

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50">

            {/* Image */}
            <td className="px-6 py-4">
                {menu.image_url ? (
                    <img
                        src={menu.image_url}
                        alt={menu.title}
                        className="w-12 h-12 object-cover rounded-md shadow-sm"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                        N/A
                    </div>
                )}
            </td>

            {/* Nom */}
            <td className="px-6 py-4 font-medium text-gray-800">
                {menu.title}
            </td>

            {/* Catégorie */}
            <td className="px-6 py-4 text-gray-600">
                {menu.category || "N/A"}
            </td>

            {/* Prix */}
            <td className="px-6 py-4 font-semibold text-gray-900">
                {priceDisplay}
            </td>

            {/* Statut */}
            <td className="px-6 py-4">
                {isPublished ? (
                    <span className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
                        Publié
                    </span>
                ) : (
                    <span className="text-xs border border-red-600 bg-red-100 text-red-600 rounded-full px-3 py-1">
                        Non publié
                    </span>
                )}
            </td>

            {/* Date */}
            <td className="px-6 py-4 text-gray-500 max-sm:hidden">
                {formatDate(menu.created_at)}
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3 w-full">

                    {/* Toggle publish — branché sur handleTogglePublish */}
                    <button
                        onClick={handleTogglePublish}
                        title={isPublished ? "Dépublier" : "Publier"}
                        className="text-blue-500 cursor-pointer hover:scale-110 transition-all"
                    >
                        {isPublished
                            ? <div className="flex items-center gap-1"><span className="text-xs">Dépublier</span><CircleOff size={16}/></div>
                            : <div className="flex items-center gap-1"><span className="text-xs">Publier</span><CheckCircle2 size={16}/></div>
                        }
                    </button>

                    {/* Éditer */}
                    <button
                        onClick={onEdit}
                        className="flex items-center gap-1 cursor-pointer text-yellow-500 hover:scale-110 transition-all"
                    >
                        <span className="text-xs">Éditer</span>
                        <Pencil size={16}/>
                    </button>

                    {/* Supprimer — branché sur handleDelete */}
                    <button
                        onClick={handleDelete}
                        title="Supprimer"
                        className="text-red-500 cursor-pointer hover:scale-110 transition-all"
                    >
                        <Trash2 size={16}/>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default MenuTableItem;
