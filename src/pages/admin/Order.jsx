import { useState } from 'react';
import OrderTableItem from '../../components/admin/OrderTableItem';
import { useMenu } from '../../contexts/MenuContext';

const Order = () => {

  const [filter, setFilter] = useState("all");
  const { orders, toggleOrder, archiveOrder } = useMenu();
  
  const filteredMenus = orders.filter((order) => {
    if (filter === "completed") return order.is_completed;
    if (filter === "uncompleted") return !order.is_completed;
    return true;
  });


  return (
    <div className='relative flex-1 p-6 bg-gray-50 min-h-screen'>

      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Commandes</h1>
          <p className="text-gray-600 mt-1">Aperçu de toutes les commandes á partir du site</p>
        </div>

        <div className='flex items-center border-2 border-gray-300 py-1 px-4 rounded-xl'>
          <p className='text-gray-500 text-lg'>
            Nombre total de commandes:
          </p>
          <span className='text-3xl px-2'>{orders.length}</span>
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
            Toutes les commandes
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`shadow-custom-sm border rounded-full px-4 py-2 cursor-pointer text-xs ${
              filter === "completed"
                ? "bg-yellow-400 text-white font-bold border-amber-50"
                : "text-gray-700"
            }`}
          >
            Commandes résolues
          </button>

          <button
            onClick={() => setFilter("uncompleted")}
            className={`shadow-custom-sm border rounded-full px-4 py-2 cursor-pointer text-xs ${
              filter === "uncompleted"
                ? "bg-yellow-400 text-white font-bold border-amber-50"
                : "text-gray-700"
            }`}
          >
            Commandes non résolue
          </button>
        </div>
      </div>

      {/* Toutes les commandes */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Commande</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Client</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Articles</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Total</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Statut</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredMenus?.map((order, index) => (
                <OrderTableItem key={index} order={order} toggleOrder={toggleOrder} archiveOrder={archiveOrder} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Order
