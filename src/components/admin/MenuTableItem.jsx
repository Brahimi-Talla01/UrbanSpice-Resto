import { Trash2, Pencil, CheckCircle2, CircleOff } from "lucide-react";

const MenuTableItem = ({ menu, fetchMenu, togglePublish, deleteMenu, onEdit }) => {

    const handleDelete = () => {
        console.log("Supprimer menu:", menu.id);
        // TODO: requête API + fetchMenu()
    };

    const handleTogglePublish = () => {
        console.log("Changer le status:", menu.id);
        // TODO: API (toggle publish) + fetchMenu()
    };

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50">
            
            {/* Image */}
            <td className="px-6 py-4">
                <img 
                    src={menu.image_url} 
                    alt={menu.title} 
                    className="w-12 h-12 object-cover rounded-md shadow-sm"
                />
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
                <p className="flex items-center gap-1">
                    <span>{menu.price}</span>  
                    {menu.currency}
                </p>
            </td>

            {/* Status */}
            <td className="px-6 py-4">
                {menu.is_published ? (
                    <span className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
                        Publié
                    </span>
                ) : (
                    <span className="text-xs border border-red-600 bg-red-100 text-red-600 rounded-full px-3 py-1">
                        Non publié
                    </span>
                )}
            </td>

            {/* Date de création */}
            <td className="px-6 py-4 text-gray-500 max-sm:hidden">
                {menu.created_at 
                ? new Date(menu.created_at).toLocaleDateString() 
                : "--"}
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
                <div className="flex items-center justify-between w-full">
                    <button 
                        onClick={() => togglePublish(menu.id)} 
                        className="text-blue-500 cursor-pointer hover:scale-110 transition-all"
                    >
                        {menu.is_published 
                            ? <div className="flex items-center gap-1"> <span>Dépublié</span> <CircleOff size={18}/> </div> 
                            : <div className="flex items-center gap-1"> <span>Publié</span> <CheckCircle2 size={18}/> </div> }
                    </button>

                    <button
                    onClick={onEdit}
                    className="flex items-center gap-1 cursor-pointer text-yellow-500 hover:scale-110 transition-all">
                        <span>Editer</span>
                        <Pencil size={18}/>
                    </button>

                    <button
                        onClick={() => deleteMenu(menu.id)} 
                        className="text-red-500 cursor-pointer hover:scale-110 transition-all"
                    >
                        <Trash2 size={18}/>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default MenuTableItem;
