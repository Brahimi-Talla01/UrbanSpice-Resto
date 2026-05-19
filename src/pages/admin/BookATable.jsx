import React, { useState, useEffect } from 'react';
import { getAllReservations, toggleCompleteReservation, deleteReservation } from '../../../services/reservationApi';
import { toast } from 'react-toastify';
import { Archive, CalendarClock, CheckCircle, Eye, EyeOff } from 'lucide-react';

const BookATable = () => {
    const [filter, setFilter] = useState("all");
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedReservation, setExpandedReservation] = useState(null);

    // Charger les réservations depuis l'API
    const loadReservations = async () => {
        try {
            setLoading(true);
            const response = await getAllReservations();
            if (response.success && response.reservations) {
                setReservations(response.reservations);
            }
        } catch (error) {
            console.error("Erreur chargement réservations:", error);
            toast.error("Erreur lors du chargement des réservations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReservations();
    }, []);

    // Pour supprimer une réservation
    const handleArchiveReservation = async (id_reservation) => {
        try {
            const response = await deleteReservation(id_reservation);
            if (response.success) {
                setReservations(prev => prev.filter(res => res.id_reservation !== id_reservation));
                toast.success("Réservation supprimée");
                if (expandedReservation === id_reservation) setExpandedReservation(null);
            } else {
                toast.error(response.message || "Erreur lors de la suppression");
            }
        } catch (error) {
            toast.error("Erreur lors de la suppression");
            console.error(error);
        }
    };

    // Pour modifier le statut
    const handleToggleReservation = async (id_reservation, currentStatus) => {
        try {
            const newStatus = currentStatus == 1 ? 0 : 1;
            const response = await toggleCompleteReservation(id_reservation, newStatus);
            if (response.success) {
                setReservations(prev => prev.map(res => 
                    res.id_reservation == id_reservation 
                        ? { ...res, is_completed: newStatus } 
                        : res
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

    // Déplier/plier les détails
    const toggleExpand = (id_reservation) => {
        setExpandedReservation(expandedReservation === id_reservation ? null : id_reservation);
    };

    // Filtrer les réservations
    const filteredReservations = reservations.filter((res) => {
        if (filter === "completed") return res.is_completed == 1;
        if (filter === "uncompleted") return res.is_completed == 0;
        return true;
    });

    const totalReservations = reservations.length;
    const completedReservations = reservations.filter(r => r.is_completed == 1).length;
    const pendingReservations = reservations.filter(r => r.is_completed == 0).length;

    if (loading) {
        return (
            <div className='relative flex-1 p-6 bg-gray-50 min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500 mx-auto mb-4'></div>
                    <p className='text-gray-500'>Chargement des réservations...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='relative flex-1 p-6 bg-gray-50 min-h-screen w-full overflow-hidden'>
            <div className='flex items-center justify-between flex-wrap gap-4'>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Réservations</h1>
                    <p className="text-gray-600 mt-1">Gestion des réservations de tables</p>
                </div>

                <div className='flex items-center gap-4 bg-white px-4 py-2 rounded-xl shadow-sm'>
                    <div className='text-center'>
                        <p className='text-xs text-gray-500'>Total</p>
                        <p className='text-xl font-bold text-gray-800'>{totalReservations}</p>
                    </div>
                    <div className='w-px h-8 bg-gray-200'></div>
                    <div className='text-center'>
                        <p className='text-xs text-gray-500'>Confirmées</p>
                        <p className='text-xl font-bold text-green-600'>{completedReservations}</p>
                    </div>
                    <div className='w-px h-8 bg-gray-200'></div>
                    <div className='text-center'>
                        <p className='text-xs text-gray-500'>En attente</p>
                        <p className='text-xl font-bold text-yellow-600'>{pendingReservations}</p>
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
                        Toutes les réservations
                    </button>
                    <button
                        onClick={() => setFilter("completed")}
                        className={`shadow-sm border rounded-full px-4 py-2 cursor-pointer text-sm transition-all ${
                            filter === "completed"
                                ? "bg-green-500 text-white border-green-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                        Réservations confirmées
                    </button>
                    <button
                        onClick={() => setFilter("uncompleted")}
                        className={`shadow-sm border rounded-full px-4 py-2 cursor-pointer text-sm transition-all ${
                            filter === "uncompleted"
                                ? "bg-yellow-500 text-white border-yellow-500"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                        Réservations en attente
                    </button>
                </div>
            </div>

            {/* Tableau des réservations */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Client</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Contact</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Places</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date & Heure</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Statut</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {filteredReservations.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className='px-6 py-12 text-center text-gray-500'>
                                        Aucune réservation trouvée
                                    </td>
                                </tr>
                            ) : (
                                filteredReservations.map((reservation) => (
                                    <React.Fragment key={reservation.id_reservation}>
                                        <tr className='hover:bg-gray-50'>
                                            <td className='px-4 py-4 text-sm font-medium text-gray-900'>#{reservation.id_reservation}</td>
                                            <td className='px-4 py-4'>
                                                <div className='text-sm font-medium text-gray-900'>{reservation.nom}</div>
                                            </td>
                                            <td className='px-4 py-4'>
                                                <div className='text-sm text-gray-500'>{reservation.email}</div>
                                                <div className='text-xs text-gray-400'>{reservation.telephone}</div>
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-900'>{reservation.nb_place} place(s)</td>
                                            <td className='px-4 py-4'>
                                                <div className='text-sm text-gray-900'>{reservation.date}</div>
                                                <div className='text-xs text-gray-500'>{reservation.heure}</div>
                                            </td>
                                            <td className='px-4 py-4'>
                                                {reservation.is_completed == 1 ? (
                                                    <span className='px-2 py-1 text-xs rounded-full bg-green-100 text-green-700'>✅ Confirmée</span>
                                                ) : (
                                                    <span className='px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700'>⏳ En attente</span>
                                                )}
                                            </td>
                                            <td className='px-4 py-4'>
                                                <div className='flex items-center gap-3'>
                                                    <button
                                                        onClick={() => handleToggleReservation(reservation.id_reservation, reservation.is_completed)}
                                                        className={`flex items-center gap-1 text-xs cursor-pointer transition-colors ${
                                                            reservation.is_completed == 1
                                                                ? 'text-gray-500 hover:text-gray-700'
                                                                : 'text-green-600 hover:text-green-800'
                                                        }`}
                                                        title={reservation.is_completed == 1 ? 'Réouvrir' : 'Confirmer'}
                                                    >
                                                        {reservation.is_completed == 1 ? (
                                                            <>
                                                                <span>Réouvrir</span>
                                                                <CalendarClock size={16} />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>Confirmer</span>
                                                                <CheckCircle size={16} />
                                                            </>
                                                        )}
                                                    </button>
                                                    
                                                    <button
                                                        onClick={() => handleArchiveReservation(reservation.id_reservation)}
                                                        className='flex items-center gap-1 text-xs text-red-600 hover:text-red-800 cursor-pointer transition-colors'
                                                        title='Supprimer'
                                                    >
                                                        <span>Supprimer</span>
                                                        <Archive size={16} />
                                                    </button>
                                                    
                                                    <button
                                                        onClick={() => toggleExpand(reservation.id_reservation)}
                                                        className='flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 cursor-pointer transition-colors'
                                                        title='Voir message'
                                                    >
                                                        {expandedReservation === reservation.id_reservation ? (
                                                            <><EyeOff size={16} /> Masquer</>
                                                        ) : (
                                                            <><Eye size={16} /> Voir message</>
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        
                                        {/* Ligne expandable pour le message */}
                                        {expandedReservation === reservation.id_reservation && (
                                            <tr className='bg-gray-50'>
                                                <td colSpan="7" className='px-6 py-4'>
                                                    <div className='space-y-2'>
                                                        <h4 className='font-semibold text-gray-900'>📝 Message du client</h4>
                                                        <p className='text-gray-600 italic'>
                                                            {reservation.message || "Aucun message"}
                                                        </p>
                                                        <div className='text-xs text-gray-400 mt-2'>
                                                            Réservé le {new Date(reservation.created_at).toLocaleString('fr-FR')}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookATable;