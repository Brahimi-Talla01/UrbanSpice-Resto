import { Trash2, Pencil, CheckCircle2, CircleOff } from "lucide-react";

const ServiceTableItem = ({ service, toggleActived, archiveService, onEdit }) => {

    const handleDelete = () => {
        console.log("Supprimer un service:", service.id);
        // TODO: requête API + fetchMenu()
    };

    const handleTogglePublish = () => {
        console.log("Changer le status:", service.id);
        // TODO: API (toggle publish) + fetchMenu()
    };

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50">
            
            {/* Numéro */}
            <td className="px-6 py-4 font-medium text-gray-800">
                {service.id}
            </td>

            {/* Image */}
            <td className="px-6 py-4">
                <img 
                    src={service.image_url} 
                    alt={service.title} 
                    className="w-12 h-12 object-cover rounded-md shadow-sm"
                />
            </td>
            
            {/* Titre du service */}
            <td className="px-6 py-4 font-medium text-gray-800">
                {service.title}
            </td>


            {/* Date de creation du service */}
            <td className="px-6 py-4 text-gray-600">
                {service.created_at || "N/A"}
            </td>

            {/* Status */}
            <td className="px-6 py-4">
                {service.is_actived ? (
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
                        onClick={() => toggleActived(service.id)} 
                        className="text-blue-500 cursor-pointer hover:scale-110 transition-all"
                    >
                        {service.is_actived 
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
                        onClick={() => archiveService(service.id)} 
                        className="text-red-500 cursor-pointer hover:scale-110 transition-all"
                    >
                        <Trash2 size={18}/>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ServiceTableItem;
