import { Archive, CheckCircle2Icon, CircleOff } from 'lucide-react';


const OrderTableItem = ({ order, index, toggleOrder, archiveOrder }) => {

    return (
        <tr key={index} className='hover:bg-gray-50 transition-colors'>
            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{order.id}</td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{order.user_name}</td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{order.items.length}</td>
            <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900'>{order.total_amount}</td>
            
            {/* Status */}
            <td className="px-6 py-4">
                {order.is_completed ? (
                    <span className="text-xs bg-green-100 text-green-600 rounded-full px-3 py-2">
                        Terminé
                    </span>
                ) : (
                    <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-3 py-2">
                        En attente
                    </span>
                )}
            </td>

            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{ new Date(order.created_at).toLocaleDateString()}</td>
            
            {/* Actions */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-5 w-full">
                    <button
                        onClick={() => toggleOrder(order.id)} 
                        className="cursor-pointer hover:scale-110 transition-all"
                    >
                        {order.is_completed 
                            ? <div className="flex items-center gap-1 text-green-500"> <span>Marqué comme résolue</span> <CircleOff size={18}/> </div> 
                            : <div className="flex items-center gap-1"> <span>Marqué comme non résolue</span> <CheckCircle2Icon size={18}/> </div> }
                    </button>
                    <button
                        onClick={() => archiveOrder(order.id)} 
                        className="text-red-500 cursor-pointer hover:scale-110 transition-all"
                    >
                        {order.is_completed 
                            && <div className="flex items-center gap-1"> <span>Archver</span> <Archive size={18}/> </div> }
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default OrderTableItem
