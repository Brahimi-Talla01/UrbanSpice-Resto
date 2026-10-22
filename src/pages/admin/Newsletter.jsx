import React, { useState, useEffect } from 'react';
import { getSubscribers, toggleSubscriber } from '../../../services/newsletterApi';
import { toast } from 'react-toastify';
import { Ban, RotateCcw } from 'lucide-react';

// Onglet Newsletter — calqué sur l'onglet Réservation (BookATable.jsx) :
// mêmes états (loading/erreur/vide), mêmes cartes de stats, mêmes filtres
// en pastilles, même tableau avec badge de statut + action de bascule.
// Désabonnement SOFT (is_active) : aucune ligne n'est jamais supprimée (RGPD).
const Newsletter = () => {
    const [filter, setFilter] = useState("all");
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Charger les abonnés depuis l'API (route admin : tous les abonnés,
    // actifs et désabonnés — le front filtre sur is_active)
    const loadSubscribers = async () => {
        try {
            setLoading(true);
            const response = await getSubscribers();
            if (response.success && response.subscribers) {
                setSubscribers(response.subscribers);
            }
        } catch (error) {
            console.error("Erreur chargement abonnés:", error);
            toast.error("Erreur lors du chargement des abonnés");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSubscribers();
    }, []);

    // Désabonner / réactiver (soft : is_active 1 ↔ 0)
    const handleToggleSubscriber = async (id_subscriber, currentStatus) => {
        try {
            const newStatus = currentStatus == 1 ? 0 : 1;
            const response = await toggleSubscriber(id_subscriber, newStatus);
            if (response.success) {
                setSubscribers(prev => prev.map(sub =>
                    sub.id_subscriber == id_subscriber
                        ? { ...sub, is_active: newStatus }
                        : sub
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

    const filteredSubscribers = subscribers.filter((sub) => {
        if (filter === "active") return sub.is_active == 1;
        if (filter === "unsubscribed") return sub.is_active == 0;
        return true;
    });

    const totalSubscribers = subscribers.length;
    const activeSubscribers = subscribers.filter(s => s.is_active == 1).length;
    const unsubscribedSubscribers = subscribers.filter(s => s.is_active == 0).length;

    if (loading) {
        return (
            <div className='relative flex-1 p-6 bg-gray-50 min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500 mx-auto mb-4'></div>
                    <p className='text-gray-500'>Chargement des abonnés...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='relative flex-1 p-6 bg-gray-50 min-h-screen w-full overflow-hidden'>
            <div className='flex items-center justify-between flex-wrap gap-4'>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Newsletter</h1>
                    <p className="text-gray-600 mt-1">Gestion des abonnés à la newsletter</p>
                </div>

                <div className='flex items-center gap-4 bg-white px-4 py-2 rounded-xl shadow-sm'>
                    <div className='text-center'>
                        <p className='text-xs text-gray-500'>Total</p>
                        <p className='text-xl font-bold text-gray-800'>{totalSubscribers}</p>
                    </div>
                    <div className='w-px h-8 bg-gray-200'></div>
                    <div className='text-center'>
                        <p className='text-xs text-gray-500'>Abonnés</p>
                        <p className='text-xl font-bold text-green-600'>{activeSubscribers}</p>
                    </div>
                    <div className='w-px h-8 bg-gray-200'></div>
                    <div className='text-center'>
                        <p className='text-xs text-gray-500'>Désabonnés</p>
                        <p className='text-xl font-bold text-gray-500'>{unsubscribedSubscribers}</p>
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
                        Tous les abonnés
                    </button>
                    <button
                        onClick={() => setFilter("active")}
                        className={`shadow-sm border rounded-full px-4 py-2 cursor-pointer text-sm transition-all ${
                            filter === "active"
                                ? "bg-green-500 text-white border-green-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                        Abonnés actifs
                    </button>
                    <button
                        onClick={() => setFilter("unsubscribed")}
                        className={`shadow-sm border rounded-full px-4 py-2 cursor-pointer text-sm transition-all ${
                            filter === "unsubscribed"
                                ? "bg-gray-500 text-white border-gray-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                        Désabonnés
                    </button>
                </div>
            </div>

            {/* Tableau des abonnés */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Inscrit le</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Statut</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {filteredSubscribers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className='px-6 py-12 text-center text-gray-500'>
                                        Aucun abonné trouvé
                                    </td>
                                </tr>
                            ) : (
                                filteredSubscribers.map((subscriber) => (
                                    <tr key={subscriber.id_subscriber} className='hover:bg-gray-50'>
                                        <td className='px-4 py-4 text-sm font-medium text-gray-900'>#{subscriber.id_subscriber}</td>
                                        <td className='px-4 py-4'>
                                            <div className='text-sm font-medium text-gray-900 break-all'>{subscriber.email}</div>
                                        </td>
                                        <td className='px-4 py-4'>
                                            <div className='text-sm text-gray-900'>
                                                {new Date(subscriber.created_at).toLocaleDateString('fr-FR')}
                                            </div>
                                            <div className='text-xs text-gray-500'>
                                                {new Date(subscriber.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                        <td className='px-4 py-4'>
                                            {subscriber.is_active == 1 ? (
                                                <span className='px-2 py-1 text-xs rounded-full bg-green-100 text-green-700'>✅ Abonné</span>
                                            ) : (
                                                <span className='px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600'>⏸ Désabonné</span>
                                            )}
                                        </td>
                                        <td className='px-4 py-4'>
                                            <button
                                                onClick={() => handleToggleSubscriber(subscriber.id_subscriber, subscriber.is_active)}
                                                className={`flex items-center gap-1 text-xs cursor-pointer transition-colors ${
                                                    subscriber.is_active == 1
                                                        ? 'text-red-600 hover:text-red-800'
                                                        : 'text-green-600 hover:text-green-800'
                                                }`}
                                                title={subscriber.is_active == 1 ? 'Désabonner' : 'Réactiver'}
                                            >
                                                {subscriber.is_active == 1 ? (
                                                    <>
                                                        <span>Désabonner</span>
                                                        <Ban size={16} />
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Réactiver</span>
                                                        <RotateCcw size={16} />
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
