// frontend/src/pages/admin/Users.jsx — page admin Utilisateurs
// Classement des comptes par le chiffre d'affaires qu'ils apportent :
// backend → module admin, action users (AdminModel::getAllUsers) qui renvoie
// pour chaque utilisateur : last_login, nb_actions (commandes + réservations)
// et revenu (somme des total_amount de ses commandes), déjà triés par revenu DESC.
import { useState, useEffect, useCallback } from 'react';
import { getAllUser } from '../../../services/api';
import { toast } from 'react-toastify';
import { Users as UsersIcon, LogIn, DollarSign, Trophy, ShieldCheck, User } from 'lucide-react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllUser();
            if (response.success && Array.isArray(response.users)) {
                setUsers(response.users);
            } else {
                throw new Error(response.message || 'Structure de réponse invalide');
            }
        } catch (err) {
            console.error('Erreur chargement utilisateurs:', err);
            setError(err.message || 'Impossible de charger les utilisateurs');
            toast.error(err.message || 'Erreur lors du chargement des utilisateurs');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const formatAmount = (value) => Number(value || 0).toLocaleString('fr-FR');

    const formatDateTime = (value) => {
        if (!value) return null;
        return new Date(String(value).replace(' ', 'T')).toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const totalRevenue = users.reduce((acc, u) => acc + Number(u.revenu || 0), 0);
    const connectedUsers = users.filter((u) => u.last_login).length;
    const topUser = users[0] || null;

    const medals = ['🥇', '🥈', '🥉'];

    const roleBadge = (role) =>
        role === 'admin'
            ? 'bg-purple-100 text-purple-800'
            : 'bg-blue-100 text-blue-800';

    if (loading) {
        return (
            <div className='relative flex-1 p-6 bg-gray-50 min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500 mx-auto mb-4'></div>
                    <p className='text-gray-500'>Chargement des utilisateurs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='relative flex-1 p-6 bg-gray-50 min-h-screen w-full overflow-hidden'>
            <div className='flex items-center justify-between flex-wrap gap-4'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>Utilisateurs</h1>
                    <p className='text-gray-600 mt-1'>
                        Classement par chiffre d'affaires apporté au restaurant
                    </p>
                </div>

                <div className='flex items-center gap-4 bg-white px-4 py-2 rounded-xl shadow-sm mb-8'>
                    <div className='text-center'>
                        <p className='text-xs text-gray-500'>Comptes</p>
                        <p className='text-xl font-bold text-gray-800'>{users.length}</p>
                    </div>
                    <div className='w-px h-8 bg-gray-200'></div>
                    <div className='text-center'>
                        <p className='text-xs text-gray-500'>Connectés</p>
                        <p className='text-xl font-bold text-green-600'>{connectedUsers}</p>
                    </div>
                    <div className='w-px h-8 bg-gray-200'></div>
                    <div className='text-center'>
                        <p className='text-xs text-gray-500'>CA total</p>
                        <p className='text-xl font-bold text-yellow-600'>{formatAmount(totalRevenue)} XAF</p>
                    </div>
                </div>
            </div>

            {/* Message d'erreur avec bouton Réessayer */}
            {error && (
                <div className='text-center py-8 text-red-500 bg-red-50 rounded-lg mb-6'>
                    <p className='text-lg font-semibold'>⚠️ {error}</p>
                    <button
                        onClick={loadUsers}
                        className='mt-4 px-5 py-2 rounded-full cursor-pointer font-bold text-sm bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-xl'
                    >
                        Réessayer
                    </button>
                </div>
            )}

            {!error && users.length === 0 && (
                <div className='text-center py-16 text-gray-400 bg-white rounded-xl'>
                    Aucun utilisateur enregistré pour le moment.
                </div>
            )}

            {!error && users.length > 0 && (
                <>
                    {/* Podium — meilleur client */}
                    <div className='bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-4 mb-6 flex items-center gap-4 shadow-inner'>
                        <div className='text-4xl'>🏆</div>
                        <div className='flex-1'>
                            <p className='text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1'>
                                <Trophy size={14} className='text-yellow-500' />
                                Meilleur client
                            </p>
                            <p className='text-lg font-bold text-gray-900'>
                                {topUser.nom_user}
                                <span className='text-sm font-medium text-gray-500'> — {topUser.email_user}</span>
                            </p>
                        </div>
                        <div className='text-right'>
                            <p className='text-2xl font-bold text-yellow-600'>{formatAmount(topUser.revenu)} XAF</p>
                            <p className='text-xs text-gray-500'>
                                {topUser.nb_actions} action{topUser.nb_actions > 1 ? 's' : ''} sur le site
                            </p>
                        </div>
                    </div>

                    {/* Tableau classement */}
                    <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Rang</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Utilisateur</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Rôle</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Dernière connexion</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Chiffre d'affaires</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {users.map((u, index) => {
                                        const lastLogin = formatDateTime(u.last_login);
                                        return (
                                            <tr key={u.id_user} className='hover:bg-gray-50 transition-colors'>
                                                <td className='px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900'>
                                                    {medals[index] || `#${index + 1}`}
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='w-9 h-9 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white flex items-center justify-center font-bold'>
                                                            {String(u.nom_user || '?').charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className='text-sm font-semibold text-gray-900'>{u.nom_user}</p>
                                                            <p className='text-xs text-gray-500'>{u.email_user}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${roleBadge(u.role)}`}>
                                                        {u.role === 'admin' ? <ShieldCheck size={12} /> : <User size={12} />}
                                                        {u.role === 'admin' ? 'Admin' : 'Client'}
                                                    </span>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                    {lastLogin ? (
                                                        <span className='inline-flex items-center gap-1'>
                                                            <LogIn size={14} className='text-green-500' />
                                                            {lastLogin}
                                                        </span>
                                                    ) : (
                                                        <span className='text-gray-400 italic'>Jamais connecté</span>
                                                    )}
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                                    <span className='px-2 py-1 bg-gray-100 rounded-full text-xs font-semibold'>
                                                        {Number(u.nb_actions || 0)} action{Number(u.nb_actions || 0) > 1 ? 's' : ''}
                                                    </span>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                                                    <span className='inline-flex items-center gap-1'>
                                                        <DollarSign size={14} className='text-green-600' />
                                                        {formatAmount(u.revenu)} XAF
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className='px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500'>
                            Actions = commandes + réservations enregistrées sur le compte. Les commandes
                            passées sans connexion ne sont pas rattachées à un utilisateur.
                            <span className='ml-1'><UsersIcon size={12} className='inline' /></span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Users;
