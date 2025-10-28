import { Trash2, Pencil, CheckCircle2, CircleOff } from "lucide-react";

const TestimonyTableItem = ({ testimonie, toggleTes, archived, onEdit }) => {

    const handleDelete = () => {
        console.log("Supprimer un service:", testimonie.id);
        // TODO: requête API + fetchMenu()
    };

    const handleTogglePublish = () => {
        console.log("Changer le status:", testimonie.id);
        // TODO: API (toggle publish) + fetchMenu()
    };

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50">
            
            {/* Numéro */}
            <td className="px-6 py-4 font-medium text-gray-800">
                {testimonie.id}
            </td>

            {/* Image */}
            <td className="px-6 py-4">
                <img 
                    src={testimonie.image_url} 
                    alt={testimonie.title} 
                    className="w-12 h-12 object-cover rounded-md shadow-sm"
                />
            </td>
            
            {/* Nom du commenditaire */}
            <td className="px-6 py-4 font-medium text-gray-800">
                {testimonie.name}
            </td>

            {/* Profession du commenditaire */}
            <td className="px-6 py-4 font-medium text-gray-800">
                {testimonie.profession}
            </td>

            {/* Description du commenditaire */}
            <td className="px-6 py-4 font-medium text-sm text-gray-500">
                {(testimonie.description).split(" ").slice(0, 3).join(" ")}...
            </td>


            {/* Date de creation */}
            <td className="px-6 py-4 text-gray-600">
                {testimonie.created_at || "N/A"}
            </td>

            {/* Status */}
            <td className="px-6 py-4">
                {testimonie.is_actived ? (
                    <span className="text-xs bg-green-100 text-green-600 rounded-full px-3 py-2">
                        Activé
                    </span>
                ) : (
                    <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-3 py-2">
                        Non activé
                    </span>
                )}
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
                <div className="flex items-center justify-between w-full">
                    <button 
                        onClick={() => toggleTes(testimonie.id)} 
                        className="text-blue-500 cursor-pointer hover:scale-110 transition-all"
                    >
                        {testimonie.is_actived 
                            ? <div className="flex items-center gap-1"> <span>Désactivé</span> <CircleOff size={18}/> </div> 
                            : <div className="flex items-center gap-1"> <span>Activé</span> <CheckCircle2 size={18}/> </div> }
                    </button>

                    <button
                        onClick={onEdit}
                        className="flex items-center gap-1 cursor-pointer text-yellow-500 hover:scale-110 transition-all">
                        <span>Editer</span>
                        <Pencil size={18}/>
                    </button>

                    <button
                        onClick={() => archived(testimonie.id)} 
                        className="text-red-500 cursor-pointer hover:scale-110 transition-all"
                    >
                        <Trash2 size={18}/>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default TestimonyTableItem;
