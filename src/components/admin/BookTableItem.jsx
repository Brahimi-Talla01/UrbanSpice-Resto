import { Archive, CalendarClock, CheckCircle } from 'lucide-react';

const BookTableItem = ({ reservation, index, toggleReser, archiveReser }) => {
  return (
        <tr key={index} className='hover:bg-gray-50 transition-colors'>
            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{reservation.id}</td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{reservation.nom}</td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                <ul>
                    <li>{reservation.email}</li>
                    <li>{reservation.telephone}</li>
                </ul>
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900'>{reservation.nb_place}</td>
            
            <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                <ul>
                    <li>{reservation.date}</li>
                    <li>{reservation.heure}</li>
                </ul>
            </td>
            

            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{(reservation.message).split(" ").slice(0, 3).join(" ")}...</td>
            
            {/* Status */}
            <td className="px-6 py-4">
                {reservation.is_completed ? (
                    <span className="text-xs bg-green-100 text-green-600 rounded-full px-3 py-2">
                        Terminé
                    </span>
                ) : (
                    <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-3 py-2">
                        En attente
                    </span>
                )}
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-5 w-full">

                    {/* Confirmer */}
                    <button
                        onClick={() => toggleReser(reservation.id)}
                        className="cursor-pointer hover:scale-110 transition-all "
                    >
                        {reservation.is_completed ? (
                            <div className="flex items-center gap-1 text-green-600">
                                <span>Confirmé</span> 
                                <CheckCircle size={18} />
                            </div>
                        ) : (
                            <div className="flex items-center gap-1">
                                <span>Confirmer</span> 
                                <CalendarClock size={18} />
                            </div>
                        )}
                    </button>

                    {/* Annuler */}
                    {reservation.is_completed &&
                        <button
                            onClick={() => archiveReser(reservation.id)}
                            className="cursor-pointer hover:scale-110 transition-all text-red-600"
                        >
                                <div className="flex items-center gap-1">
                                    <span>Archiver</span> 
                                    <Archive size={18} />
                                </div>
                        </button>
                    }

                </div>
            </td>
        </tr>
  )
}

export default BookTableItem
