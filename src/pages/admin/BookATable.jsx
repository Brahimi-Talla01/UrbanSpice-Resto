import { useState } from 'react'
import BookTableItem from '../../components/admin/BookTableItem';
import { useMenu } from '../../contexts/MenuContext';

const BookATable = () => {

  const [filter, setFilter] = useState("all");
  const { resers, toggleReservation, archiveReservation } = useMenu();
  
  const filteredReservations = resers.filter((order) => {
    if (filter === "completed") return order.is_completed;
    if (filter === "uncompleted") return !order.is_completed;
    return true;
  });

  return (
    <div className='relative flex-1 p-6 bg-gray-50 min-h-screen w-full overflow-hidden'>

      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reservations</h1>
          <p className="text-gray-600 mt-1">Aperçu de toutes les reservations</p>
        </div>

        <div className='flex items-center border-2 border-gray-300 py-0.5 px-2 rounded-xl'>
          <p className='text-gray-500 text-[16px]'>
            Nombre total de reservations:
          </p>
          <span className='text-3xl px-2'>{resers.length}</span>
        </div>
      </div>

      {/* Filtres */}
      <div className="w-full flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("all")}
            className={`shadow-custom-sm border rounded-full px-4 py-2 cursor-pointer text-xs ${
              filter === "all"
                ? "bg-yellow-400 text-white font-bold border-amber-50"
                : "text-gray-700"
            }`}
          >
            Toutes les reservations
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`shadow-custom-sm border rounded-full px-4 py-2 cursor-pointer text-xs ${
              filter === "completed"
                ? "bg-yellow-400 text-white font-bold border-amber-50"
                : "text-gray-700"
            }`}
          >
            Reservations résolues
          </button>

          <button
            onClick={() => setFilter("uncompleted")}
            className={`shadow-custom-sm border rounded-full px-4 py-2 cursor-pointer text-xs ${
              filter === "uncompleted"
                ? "bg-yellow-400 text-white font-bold border-amber-50"
                : "text-gray-700"
            }`}
          >
            Reservations non résolues
          </button>
        </div>
      </div>

      {/* Toutes les reservations */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Resrvation</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Nom du client</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Contacts</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Nb places</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date & Heure</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Message</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Statut</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredReservations?.map((reservation, index) => (
                <BookTableItem key={index} reservation={reservation} toggleReser={toggleReservation} archiveReser={archiveReservation} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default BookATable
