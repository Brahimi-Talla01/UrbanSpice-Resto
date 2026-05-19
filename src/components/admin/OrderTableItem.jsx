// components/admin/OrderTableItem.jsx
import { useState } from 'react';
import { Eye, CheckCircle, XCircle, Trash2 } from 'lucide-react';

const OrderTableItem = ({ order, toggleOrder, archiveOrder }) => {
    const [showDetails, setShowDetails] = useState(false);

    // Formatage de la date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Statut avec badge coloré
    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return <span className='px-2 py-1 text-xs rounded-full bg-green-100 text-green-700'>✅ Résolue</span>;
            case 'cancelled':
                return <span className='px-2 py-1 text-xs rounded-full bg-red-100 text-red-700'>❌ Annulée</span>;
            default:
                return <span className='px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700'>⏳ En attente</span>;
        }
    };

    return (
        <>
            <tr className='hover:bg-gray-50 transition-colors'>
                {/* Colonne Commande */}
                <td className='px-6 py-4'>
                    <div className='text-sm font-medium text-gray-900'>
                        #{order.id_order || order.id}
                    </div>
                </td>

                {/* Colonne Client - Nom complet */}
                <td className='px-6 py-4'>
                    <div className='text-sm font-medium text-gray-900'>
                        {order.first_name} {order.last_name}
                    </div>
                    <div className='text-xs text-gray-500'>
                        {order.email}
                    </div>
                    <div className='text-xs text-gray-400'>
                        {order.phone}
                    </div>
                </td>

                {/* Colonne Articles (nombre) */}
                <td className='px-6 py-4'>
                    <div className='text-sm text-gray-900'>
                        {order.items?.length || 0} article(s)
                    </div>
                    <button 
                        onClick={() => setShowDetails(!showDetails)}
                        className='text-xs text-yellow-600 hover:text-yellow-800 flex items-center gap-1 mt-1'
                    >
                        <Eye size={14} />
                        Voir détails
                    </button>
                </td>

                {/* Colonne Total */}
                <td className='px-6 py-4'>
                    <div className='text-sm font-semibold text-yellow-600'>
                        {order.total_amount?.toLocaleString('fr-FR') || 0} XAF
                    </div>
                </td>

                {/* Colonne Statut */}
                <td className='px-6 py-4'>
                    {getStatusBadge(order.status)}
                </td>

                {/* Colonne Date */}
                <td className='px-6 py-4'>
                    <div className='text-sm text-gray-500'>
                        {formatDate(order.created_at)}
                    </div>
                </td>

                {/* Colonne Actions */}
                <td className='px-6 py-4'>
                    <div className='flex items-center gap-2'>
                        {order.status !== 'completed' && (
                            <button
                                onClick={() => toggleOrder(order.id_order || order.id)}
                                className='p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors'
                                title='Marquer comme résolu'
                            >
                                <CheckCircle size={18} />
                            </button>
                        )}
                        {order.status !== 'cancelled' && (
                            <button
                                onClick={() => toggleOrder(order.id_order || order.id)}
                                className='p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors'
                                title='Annuler'
                            >
                                <XCircle size={18} />
                            </button>
                        )}
                        <button
                            onClick={() => archiveOrder(order.id_order || order.id)}
                            className='p-1.5 text-gray-500 hover:bg-gray-100 rounded transition-colors'
                            title='Supprimer'
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </td>
            </tr>

            {/* Ligne des détails (expandable) */}
            {showDetails && (
                <tr className='bg-gray-50'>
                    <td colSpan="7" className='px-6 py-4'>
                        <div className='space-y-3'>
                            <h4 className='font-semibold text-gray-900'>Détails de la commande</h4>
                            
                            {/* Adresse de livraison */}
                            <div className='grid grid-cols-2 gap-4 text-sm'>
                                <div>
                                    <p className='font-medium text-gray-700'>📍 Adresse de livraison</p>
                                    <p className='text-gray-600'>{order.address || 'Non renseignée'}</p>
                                    <p className='text-gray-600'>{order.city && `${order.city}, ${order.neighborhood || ''}`}</p>
                                </div>
                                <div>
                                    <p className='font-medium text-gray-700'>📞 Contact</p>
                                    <p className='text-gray-600'>{order.email}</p>
                                    <p className='text-gray-600'>{order.phone}</p>
                                </div>
                            </div>

                            {/* Liste des articles */}
                            {order.items && order.items.length > 0 && (
                                <div>
                                    <p className='font-medium text-gray-700 mb-2'>🛒 Articles commandés</p>
                                    <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
                                        <table className='w-full text-sm'>
                                            <thead className='bg-gray-100'>
                                                <tr>
                                                    <th className='px-3 py-2 text-left'>Plat</th>
                                                    <th className='px-3 py-2 text-center'>Quantité</th>
                                                    <th className='px-3 py-2 text-right'>Prix unitaire</th>
                                                    <th className='px-3 py-2 text-right'>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.items.map((item, idx) => (
                                                    <tr key={idx} className='border-t border-gray-100'>
                                                        <td className='px-3 py-2'>{item.title}</td>
                                                        <td className='px-3 py-2 text-center'>{item.quantity}</td>
                                                        <td className='px-3 py-2 text-right'>{item.price?.toLocaleString('fr-FR')} XAF</td>
                                                        <td className='px-3 py-2 text-right font-medium'>{(item.price * item.quantity).toLocaleString('fr-FR')} XAF</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot className='bg-gray-50'>
                                                <tr>
                                                    <td colSpan="3" className='px-3 py-2 text-right font-bold'>Total :</td>
                                                    <td className='px-3 py-2 text-right font-bold text-yellow-600'>
                                                        {order.total_amount?.toLocaleString('fr-FR')} XAF
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default OrderTableItem;