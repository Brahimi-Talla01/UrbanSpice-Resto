import { Trash2, Pencil, CheckCircle2, CircleOff } from "lucide-react";

const TestimonyTableItem = ({ testimonie, index, toggleTes, archived, onEdit }) => {

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      
      {/* Numéro */}
      <td className="px-6 py-4 font-medium text-gray-800">
        {index}
      </td>

      {/* Image */}
      <td className="px-6 py-4">
        {testimonie.image_url ? (
          <img 
            src={testimonie.image_url} 
            alt={testimonie.name} 
            className="w-12 h-12 object-cover rounded-md shadow-sm"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
            <span className="text-gray-400 text-xs">Pas d'image</span>
          </div>
        )}
      </td>
      
      {/* Nom du commanditaire */}
      <td className="px-6 py-4 font-medium text-gray-800">
        {testimonie.name}
      </td>

      {/* Profession du commanditaire */}
      <td className="px-6 py-4 text-gray-600">
        {testimonie.profession || "N/A"}
      </td>

      {/* Description */}
      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={testimonie.description}>
        {testimonie.description ? testimonie.description.split(" ").slice(0, 10).join(" ") + "..." : "N/A"}
      </td>

      {/* Date de création */}
      <td className="px-6 py-4 text-gray-600">
        {testimonie.created_at ? new Date(testimonie.created_at).toLocaleDateString('fr-FR') : "N/A"}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        {testimonie.is_actived == 1 ? (
          <span className="text-xs bg-green-100 text-green-600 rounded-full px-3 py-1">
            Activé
          </span>
        ) : (
          <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-3 py-1">
            Non activé
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTes} 
            className="text-blue-500 cursor-pointer hover:scale-110 transition-all flex items-center gap-1"
          >
            {testimonie.is_actived == 1 ? (
              <>
                <CircleOff size={16}/>
                <span className="text-xs">Désactiver</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={16}/>
                <span className="text-xs">Activer</span>
              </>
            )}
          </button>

          <button
            onClick={onEdit}
            className="flex items-center gap-1 cursor-pointer text-yellow-500 hover:scale-110 transition-all"
          >
            <Pencil size={16}/>
            <span className="text-xs">Modifier</span>
          </button>

          <button
            onClick={archived} 
            className="text-red-500 cursor-pointer hover:scale-110 transition-all"
          >
            <Trash2 size={16}/>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TestimonyTableItem;