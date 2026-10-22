// frontend/src/pages/admin/Dashboard.jsx — données réelles de la BDD (module stats)
import { useState, useEffect, useCallback } from 'react';
import {
  ListOrdered,
  Users,
  DollarSign,
  Clock,
  Star,
  ChefHat,
  Package,
  ShoppingBag
} from 'lucide-react';
import DashboardChart from '../../components/admin/DashboardChart';
import { getOverview } from '../../../services/statsApi';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les statistiques depuis l'API (module stats, route admin)
  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getOverview();
      if (response.success) {
        setData(response);
      } else {
        throw new Error(response.message || 'Structure de réponse invalide');
      }
    } catch (err) {
      console.error('Erreur chargement statistiques:', err);
      setError(err.message || 'Impossible de charger les statistiques');
      toast.error(err.message || 'Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const stats = data?.stats ?? {};
  const revenus = data?.revenus ?? 0;
  const revenusParMois = data?.revenusParMois ?? [];
  const topCategories = data?.topCategories ?? [];
  const topMenus = data?.topMenus ?? [];
  const topPlats = data?.topPlats ?? [];
  const recentOrders = data?.commandesRecentes ?? [];

  const formatAmount = (value) => Number(value || 0).toLocaleString('fr-FR');

  // Donut dynamique construit sur les vraies catégories de menus
  const donutColors = ['#f97316', '#fb923c', '#fed7aa', '#fcd34d', '#fca5a5', '#d1d5db'];
  const totalCategories = topCategories.reduce((acc, c) => acc + Number(c.total), 0);
  let cumulative = 0;
  const donutSegments = topCategories.map((category, index) => {
    const start = (cumulative / (totalCategories || 1)) * 360;
    cumulative += Number(category.total);
    const end = (cumulative / (totalCategories || 1)) * 360;
    return `${donutColors[index % donutColors.length]} ${start}deg ${end}deg`;
  });

  const statsCards = [
    {
      title: 'Total Commandes',
      value: formatAmount(stats.commandes),
      sub: `${formatAmount(stats.commandes_en_cours)} en attente`,
      icon: ListOrdered,
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Commandes en Cours',
      value: formatAmount(stats.commandes_en_cours),
      sub: `sur ${formatAmount(stats.commandes)} au total`,
      icon: Clock,
      lightBg: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Total Clients',
      value: formatAmount(stats.clients),
      sub: 'comptes enregistrés',
      icon: Users,
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Revenus Totaux',
      value: `${formatAmount(revenus)} XAF`,
      sub: 'toutes commandes',
      icon: DollarSign,
      lightBg: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Articles Vendus',
      value: formatAmount(stats.articles_vendus),
      sub: 'plats commandés',
      icon: ShoppingBag,
      lightBg: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      title: 'Chefs Cuisiniers',
      value: formatAmount(stats.chefs),
      sub: `${formatAmount(stats.chefs_actifs)} actifs sur le site`,
      icon: ChefHat,
      lightBg: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    {
      title: 'Menus Publiés',
      value: formatAmount(stats.menus_publies),
      sub: `sur ${formatAmount(stats.menus)} menus`,
      icon: Package,
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  const getStatusInfo = (isCompleted) =>
    isCompleted == 1
      ? { label: 'Terminé', classes: 'bg-green-100 text-green-800' }
      : { label: 'En attente', classes: 'bg-yellow-100 text-yellow-800' };

  const formatDateTime = (value) => {
    if (!value) return '—';
    return new Date(String(value).replace(' ', 'T')).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className='flex-1 p-6 bg-gray-50 min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500'></div>
      </div>
    );
  }

  return (
    <div className='flex-1 p-6 bg-gray-50 min-h-screen'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>Dashboard Restaurant</h1>
        <p className='text-gray-600 mt-1'>Aperçu des performances de votre restaurant (données de la base)</p>
      </div>

      {/* Message d'erreur avec bouton Réessayer */}
      {error && (
        <div className='text-center py-8 text-red-500 bg-red-50 rounded-lg mb-6'>
          <p className='text-lg font-semibold'>⚠️ {error}</p>
          <button
            onClick={loadStats}
            className='mt-4 px-5 py-2 rounded-full cursor-pointer font-bold text-sm bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-xl'
          >
            Réessayer
          </button>
        </div>
      )}

      {!error && !data && (
        <div className='text-center py-16 text-gray-400'>Aucune statistique disponible.</div>
      )}

      {data && (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

          <div className='col-span-2'>
            {/* Stats Cards — compteurs réels */}
            <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-8'>
              {statsCards.map((stat) => (
                <div key={stat.title} className='bg-white rounded-xl shadow-sm border border-gray-200 p-3 hover:shadow-lg transition-all duration-300'>
                  <div className='flex items-center gap-2'>
                    <div className={`p-3 rounded-xl ${stat.lightBg}`}>
                      <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                    <div>
                      <h3 className='text-sm font-medium text-gray-500'>{stat.title}</h3>
                      <p className='text-xl font-bold text-gray-900 mt-1'>{stat.value}</p>
                      <p className='text-xs text-gray-400'>{stat.sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Left Section - Charts & Analytics */}
            <div className='lg:col-span-2 space-y-6'>

              {/* Revenue Chart — revenus réels par mois */}
              <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                <div className='md:flex items-center justify-between mb-6'>
                  <h2 className='text-lg font-semibold text-gray-900'>Revenus des 8 derniers mois</h2>
                  <span className='text-sm text-gray-500'>Depuis la base de données</span>
                </div>
                <DashboardChart data={revenusParMois} />
              </div>

              {/* Recent Orders — dernières commandes réelles */}
              <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                <div className='p-6 border-b border-gray-200'>
                  <h2 className='text-lg font-semibold text-gray-900'>Commandes Récentes</h2>
                </div>
                {recentOrders.length === 0 ? (
                  <div className='p-6 text-center text-gray-400'>Aucune commande pour le moment.</div>
                ) : (
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
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        {recentOrders.map((order) => {
                          const status = getStatusInfo(order.is_completed);
                          return (
                            <tr key={order.id_commande} className='hover:bg-gray-50 transition-colors'>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                #{String(order.id_commande).padStart(3, '0')}
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{order.custumer_name}</td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                {order.items && order.items.length > 0 ? (
                                  <span title={order.items.map((it) => `${it.quantity}× ${it.title}`).join(', ')}>
                                    {order.items.slice(0, 2).map((it) => `${it.quantity}× ${it.title}`).join(', ')}
                                    {order.items.length > 2 ? '…' : ''}
                                  </span>
                                ) : (
                                  <span className='text-gray-400 italic' title='Détail non enregistré — commande antérieure au suivi des articles'>
                                    {order.total_item} (détail non enregistré)
                                  </span>
                                )}
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                                {formatAmount(order.total_amount)} {order.currency}
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status.classes}`}>
                                  {status.label}
                                </span>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{formatDateTime(order.created_at)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Section - Trending Menus */}
          <div className='col-span-3 md:col-span-1 space-y-6'>

            {/* Top Categories — répartition réelle des menus */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-lg font-semibold text-gray-900'>Top Catégories</h2>
                <span className='text-sm text-gray-500'>Menus</span>
              </div>

              {topCategories.length === 0 ? (
                <div className='text-center text-gray-400 py-6'>Aucun menu en base.</div>
              ) : (
                <>
                  <div className='flex items-center justify-center'>
                    <div className='relative w-32 h-32'>
                      <div
                        className='w-full h-full rounded-full'
                        style={{ background: `conic-gradient(${donutSegments.join(', ')})` }}
                      >
                        <div className='absolute inset-4 bg-white rounded-full flex items-center justify-center'>
                          <ChefHat className='w-6 h-6 text-orange-500' />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-6 space-y-3'>
                    {topCategories.slice(0, 5).map((category, index) => (
                      <div key={category.category} className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div
                            className='w-3 h-3 rounded-full'
                            style={{ backgroundColor: donutColors[index % donutColors.length] }}
                          ></div>
                          <span className='text-sm text-gray-600'>{category.category}</span>
                        </div>
                        <span className='text-sm font-semibold text-gray-900'>
                          {totalCategories > 0 ? Math.round((Number(category.total) / totalCategories) * 100) : 0}%
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Trending Menus — meilleurs menus par note */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-lg font-semibold text-gray-900'>Menus Tendances</h2>
                <span className='text-sm text-gray-500'>Mieux notés</span>
              </div>

              {topMenus.length === 0 ? (
                <div className='text-center text-gray-400 py-6'>Aucun menu en base.</div>
              ) : (
                <div className='space-y-4'>
                  {topMenus.map((menu) => (
                    <div key={menu.id_menu} className='flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors'>
                      <div className='w-12 h-12 bg-orange-100 rounded-lg overflow-hidden flex items-center justify-center'>
                        {menu.image_url ? (
                          <img src={menu.image_url} alt={menu.title} className='w-full h-full object-cover' />
                        ) : (
                          <span className='text-2xl'>🍽️</span>
                        )}
                      </div>

                      <div className='flex-1 min-w-0'>
                        <h3 className='text-sm font-semibold text-gray-900 truncate'>{menu.title}</h3>
                        <p className='text-xs text-gray-500'>{menu.category}</p>
                        <div className='flex items-center gap-2 mt-1'>
                          <Star className='w-3 h-3 text-yellow-400 fill-current' />
                          <span className='text-xs text-gray-600'>{Number(menu.rating || 0).toFixed(1)}</span>
                        </div>
                      </div>

                      <div className='text-right'>
                        <p className='text-sm font-bold text-gray-900'>{formatAmount(menu.price)} {menu.currency}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Plats les Plus Vendus — depuis la table order_items */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-lg font-semibold text-gray-900'>Plats les Plus Vendus</h2>
                <span className='text-sm text-gray-500'>Par quantité</span>
              </div>

              {topPlats.length === 0 ? (
                <div className='text-center text-gray-400 py-6'>Aucun plat vendu pour le moment.</div>
              ) : (
                <div className='space-y-4'>
                  {topPlats.map((plat, index) => (
                    <div key={`${plat.titre}-${index}`} className='flex items-center justify-between'>
                      <div className='flex items-center gap-3 min-w-0'>
                        <span className='w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold shrink-0'>
                          {index + 1}
                        </span>
                        <span className='text-sm text-gray-600 truncate'>{plat.titre}</span>
                      </div>
                      <span className='text-sm font-semibold text-gray-900 whitespace-nowrap ml-3'>
                        {formatAmount(plat.quantite)} vendus
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
