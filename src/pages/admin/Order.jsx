import React, { useState, useEffect } from 'react';
import { getAllOrders, toggleCompleteOrder, deleteOrder } from '../../../services/orderApi';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

const Order = () => {
    const [filter, setFilter] = useState("all");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    // Charger les commandes depuis l'API
    const loadOrders = async () => {
        try {
            setLoading(true);
            const response = await getAllOrders();
            if (response.success && response.orders) {
                setOrders(response.orders);
            }
        } catch (error) {
            console.error("Erreur chargement commandes:", error);
            toast.error("Erreur lors du chargement des commandes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    // Pour supprimer UNE commande spécifique
    const handleArchiveOrder = async (id_commande) => {
        try {
            const response = await deleteOrder(id_commande);
            if (response.success) {
                setOrders(prev => prev.filter(order => order.id_commande !== id_commande));
                toast.success("Commande supprimée");
                if (expandedOrder === id_commande) setExpandedOrder(null);
            } else {
                toast.error(response.message || "Erreur lors de la suppression");
            }
        } catch (error) {
            toast.error("Erreur lors de la suppression");
            console.error(error);
        }
    };

    // Pour modifier le statut d'UNE commande spécifique
    const handleToggleOrder = async (id_commande, currentStatus) => {
        try {
            const newStatus = currentStatus == 1 ? 0 : 1;
            const response = await toggleCompleteOrder(id_commande, newStatus);
            if (response.success) {
                setOrders(prev => prev.map(order => 
                    order.id_commande == id_commande 
                        ? { ...order, is_completed: newStatus } 
                        : order
                ));
                toast.success(response.message || "Statut mis à jour");
            } else {
                toast.error(response.message || "Erreur lors de la mise à jour");
            }
        } catch (error) {
            toast.error("Erreur lors de la mise à jour");
            console.error(error);
        }
    };

    // Déplier/plier les détails d'une commande
    const toggleExpand = (id_commande) => {
        setExpandedOrder(expandedOrder === id_commande ? null : id_commande);
    };

    // Formater les articles pour l'affichage
    const formatItems = (items) => {
        if (!items) return [];
        try {
            if (typeof items === 'string') {
                return JSON.parse(items);
            }
            return items;
        } catch (e) {
            return [];
        }
    };

    // Filtrer les commandes
    const filteredOrders = orders.filter((order) => {
        if (filter === "completed") return order.is_completed == 1;
        if (filter === "uncompleted") return order.is_completed == 0;
        return true;
    });

    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.is_completed == 1).length;
    const pendingOrders = orders.filter(o => o.is_completed == 0).length;

    if (loading) {
        return (
            <div className='relative flex-1 p-6 bg-gray-50 min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500 mx-auto mb-4'></div>
                    <p className='text-gray-500'>Chargement des commandes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='relative flex-1 p-6 bg-gray-50 min-h-screen'>
            <div className='flex items-center justify-between flex-wrap gap-4'>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Commandes</h1>
                    <p className="text-gray-600 mt-1">Gestion des commandes passées sur le site</p>
                </div>

                <div className='flex items-center gap-4 bg-white px-4 py-2 rounded-xl shadow-sm'>
                    <div className='text-center'>
                        <p className='text-xs text-gray-500'>Total</p>
                        <p className='text-xl font-bold text-gray-800'>{totalOrders}</p>
                    </div>
                    <div className='w-px h-8 bg-gray-200'></div>
                    <div className='text-center'>
                        <p className='text-xs text-gray-500'>Résolues</p>
                        <p className='text-xl font-bold text-green-600'>{completedOrders}</p>
                    </div>
                    <div className='w-px h-8 bg-gray-200'></div>
                    <div className='text-center'>
                        <p className='text-xs text-gray-500'>En attente</p>
                        <p className='text-xl font-bold text-yellow-600'>{pendingOrders}</p>
                    </div>
                </div>
            </div>

            {/* Filtres */}
            <div className="w-full flex justify-between items-center mb-8">
                <div className="flex gap-4">
                    <button
                        onClick={() => setFilter("all")}
                        className={`shadow-sm border rounded-full px-4 py-2 cursor-pointer text-sm transition-all ${
                            filter === "all"
                                ? "bg-yellow-500 text-white border-yellow-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                        Toutes les commandes
                    </button>
                    <button
                        onClick={() => setFilter("completed")}
                        className={`shadow-sm border rounded-full px-4 py-2 cursor-pointer text-sm transition-all ${
                            filter === "completed"
                                ? "bg-green-500 text-white border-green-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                        Commandes résolues
                    </button>
                    <button
                        onClick={() => setFilter("uncompleted")}
                        className={`shadow-sm border rounded-full px-4 py-2 cursor-pointer text-sm transition-all ${
                            filter === "uncompleted"
                                ? "bg-yellow-500 text-white border-yellow-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                        Commandes en attente
                    </button>
                </div>
            </div>

            {/* Tableau des commandes */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Client</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Téléphone</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Adresse</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Total</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Statut</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className='px-6 py-12 text-center text-gray-500'>
                                        Aucune commande trouvée
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => {
                                    const items = formatItems(order.items);
                                    const address = [order.custumer_address, order.ville, order.quartier].filter(Boolean).join(', ');
                                    
                                    return (
                                        <React.Fragment key={order.id_commande}>
                                            <tr className='hover:bg-gray-50 cursor-pointer' onClick={() => toggleExpand(order.id_commande)}>
                                                <td className='px-4 py-4 text-sm font-medium text-gray-900'>#{order.id_commande}</td>
                                                <td className='px-4 py-4 text-sm text-gray-900'>{order.custumer_name}</td>
                                                <td className='px-4 py-4 text-sm text-gray-500'>{order.email}</td>
                                                <td className='px-4 py-4 text-sm text-gray-500'>{order.custumer_number}</td>
                                                <td className='px-4 py-4 text-sm text-gray-500 max-w-xs truncate' title={address}>
                                                    {address || 'Non renseignée'}
                                                </td>
                                                <td className='px-4 py-4 text-sm font-semibold text-yellow-600'>
                                                    {Number(order.total_amount).toLocaleString('fr-FR')} {order.currency || 'XAF'}
                                                </td>
                                                <td className='px-4 py-4'>
                                                    {order.is_completed == 1 ? (
                                                        <span className='px-2 py-1 text-xs rounded-full bg-green-100 text-green-700'>✅ Résolue</span>
                                                    ) : (
                                                        <span className='px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700'>⏳ En attente</span>
                                                    )}
                                                </td>
                                                <td className='px-4 py-4 text-sm text-gray-500'>
                                                    {new Date(order.created_at).toLocaleDateString('fr-FR')}
                                                </td>
                                                <td className='px-4 py-4' onClick={(e) => e.stopPropagation()}>
                                                    <div className='flex items-center gap-2'>
                                                        <button
                                                            onClick={() => handleToggleOrder(order.id_commande, order.is_completed)}
                                                            className={`px-3 py-1 text-xs rounded cursor-pointer transition-colors ${
                                                                order.is_completed == 1
                                                                    ? 'bg-gray-500 text-white hover:bg-gray-600'
                                                                    : 'bg-green-500 text-white hover:bg-green-600'
                                                            }`}
                                                            title={order.is_completed == 1 ? 'Réouvrir' : 'Marquer comme résolue'}
                                                        >
                                                            {order.is_completed == 1 ? 'Réouvrir' : 'Terminer'}
                                                        </button>
                                                        <button
                                                            onClick={() => handleArchiveOrder(order.id_commande)}
                                                            className='px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer transition-colors'
                                                            title='Supprimer'
                                                        >
                                                            Supprimer
                                                        </button>
                                                        <button
                                                            onClick={() => toggleExpand(order.id_commande)}
                                                            className='px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer transition-colors'
                                                            title='Voir détails'
                                                        >
                                                            {expandedOrder === order.id_commande ? <EyeOff size={14} /> : <Eye size={14} />}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            
                                            {/* Ligne des détails expandable */}
                                            {expandedOrder === order.id_commande && (
                                                <tr className='bg-gray-50'>
                                                    <td colSpan="9" className='px-6 py-4'>
                                                        <div className='space-y-4'>
                                                            <h4 className='font-semibold text-gray-900 mb-2'>📋 Détails complets de la commande #{order.id_commande}</h4>
                                                            
                                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                                                {/* Informations de livraison */}
                                                                <div className='bg-white rounded-lg p-4 border border-gray-200'>
                                                                    <h5 className='font-medium text-gray-800 mb-3 flex items-center gap-2'>
                                                                        <span>📍</span> Adresse de livraison
                                                                    </h5>
                                                                    <div className='space-y-2 text-sm'>
                                                                        <p><span className='text-gray-500'>Nom complet:</span> {order.custumer_name}</p>
                                                                        <p><span className='text-gray-500'>Email:</span> {order.email}</p>
                                                                        <p><span className='text-gray-500'>Téléphone:</span> {order.custumer_number}</p>
                                                                        <p><span className='text-gray-500'>Adresse:</span> {order.custumer_address || 'Non renseignée'}</p>
                                                                        <p><span className='text-gray-500'>Ville:</span> {order.ville || 'Non renseignée'}</p>
                                                                        <p><span className='text-gray-500'>Quartier:</span> {order.quartier || 'Non renseignée'}</p>
                                                                    </div>
                                                                </div>
                                                                
                                                                {/* Résumé de la commande */}
                                                                <div className='bg-white rounded-lg p-4 border border-gray-200'>
                                                                    <h5 className='font-medium text-gray-800 mb-3 flex items-center gap-2'>
                                                                        <span>💰</span> Récapitulatif
                                                                    </h5>
                                                                    <div className='space-y-2 text-sm'>
                                                                        <p><span className='text-gray-500'>Date:</span> {new Date(order.created_at).toLocaleString('fr-FR')}</p>
                                                                        <p><span className='text-gray-500'>Nombre d'articles:</span> {order.total_item || items.length}</p>
                                                                        <p><span className='text-gray-500'>Total:</span> <span className='font-semibold text-yellow-600'>{Number(order.total_amount).toLocaleString('fr-FR')} {order.currency || 'XAF'}</span></p>
                                                                        <p><span className='text-gray-500'>Statut:</span> {order.is_completed == 1 ? 'Résolue ✅' : 'En attente ⏳'}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            {/* Liste des articles commandés */}
                                                            {items.length > 0 && (
                                                                <div className='bg-white rounded-lg p-4 border border-gray-200'>
                                                                    <h5 className='font-medium text-gray-800 mb-3 flex items-center gap-2'>
                                                                        <span>🍽️</span> Articles commandés
                                                                    </h5>
                                                                    <div className='overflow-x-auto'>
                                                                        <table className='w-full text-sm'>
                                                                            <thead className='bg-gray-100'>
                                                                                <tr>
                                                                                    <th className='px-3 py-2 text-left'>Produit</th>
                                                                                    <th className='px-3 py-2 text-center'>Quantité</th>
                                                                                    <th className='px-3 py-2 text-right'>Prix unitaire</th>
                                                                                    <th className='px-3 py-2 text-right'>Total</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {items.map((item, idx) => (
                                                                                    <tr key={idx} className='border-t border-gray-100'>
                                                                                        <td className='px-3 py-2'>{item.title || `Produit #${item.id}`}</td>
                                                                                        <td className='px-3 py-2 text-center'>{item.quantity}</td>
                                                                                        <td className='px-3 py-2 text-right'>{Number(item.price).toLocaleString('fr-FR') || 0} XAF</td>
                                                                                        <td className='px-3 py-2 text-right font-medium'>{Number(item.price * item.quantity).toLocaleString('fr-FR')} XAF</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                            <tfoot className='bg-gray-50'>
                                                                                <tr>
                                                                                    <td colSpan="3" className='px-3 py-2 text-right font-bold'>Total :</td>
                                                                                    <td className='px-3 py-2 text-right font-bold text-yellow-600'>
                                                                                        {Number(order.total_amount).toLocaleString('fr-FR')} XAF
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
                                        </React.Fragment>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Order;