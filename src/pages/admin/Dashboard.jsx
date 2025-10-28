import { 
  ArrowUp, 
  ArrowDown,
  ListOrdered, 
  Users, 
  DollarSign,
  TrendingUp,
  Clock,
  Star,
  ChefHat,
  Package
} from 'lucide-react';
import DashboardChart from '../../components/admin/DashboardChart';

const Dashboard = () => {
  // Données mockées pour le dashboard
  const statsCards = [
    {
      title: 'Total Commandes',
      value: '48,652',
      change: '+15%',
      trend: 'up',
      icon: ListOrdered,
      bgColor: 'bg-orange-500',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Total Clients',
      value: '1,248',
      change: '+4.2%',
      trend: 'up',
      icon: Users,
      bgColor: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Revenus Totaux',
      value: '$215,860',
      change: '+2.4%',
      trend: 'up',
      icon: DollarSign,
      bgColor: 'bg-green-500',
      lightBg: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Commandes en Cours',
      value: '23',
      change: '-8.1%',
      trend: 'down',
      icon: Clock,
      bgColor: 'bg-yellow-500',
      lightBg: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    }
  ];

  const trendingMenus = [
    {
      id: 1,
      name: 'Grilled Chicken Delight',
      category: 'Chicken',
      orders: 350,
      price: '$18.00',
      rating: 4.9,
      image: '🍗'
    },
    {
      id: 2,
      name: 'Beef Burger Supreme',
      category: 'Burger',
      orders: 285,
      price: '$22.50',
      rating: 4.7,
      image: '🍔'
    },
    {
      id: 3,
      name: 'Seafood Pasta Special',
      category: 'Pasta',
      orders: 198,
      price: '$26.00',
      rating: 4.8,
      image: '🍝'
    }
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'Marie Dubois', items: 3, total: '$45.50', status: 'completed', time: '2 min ago' },
    { id: '#ORD-002', customer: 'Jean Martin', items: 2, total: '$32.00', status: 'preparing', time: '5 min ago' },
    { id: '#ORD-003', customer: 'Sophie Chen', items: 1, total: '$18.00', status: 'pending', time: '8 min ago' },
    { id: '#ORD-004', customer: 'Paul Nkomo', items: 4, total: '$78.25', status: 'completed', time: '12 min ago' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className=' flex-1 p-6 bg-gray-50 min-h-screen'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>Dashboard Restaurant</h1>
        <p className='text-gray-600 mt-1'>Aperçu des performances de votre restaurant</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

        <div className=' col-span-2'>
          {/* Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 mb-8'>
            {statsCards.map((stat, index) => (
              <div key={index} className='bg-white rounded-xl shadow-sm border border-gray-200 p-3 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className={`p-3 rounded-xl ${stat.lightBg}`}>
                      <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                    <div className='mt-4'>
                      <h3 className='text-sm font-medium text-gray-500'>{stat.title}</h3>
                      <p className='text-xl font-bold text-gray-900 mt-1'>{stat.value}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? 
                      <ArrowUp className='w-4 h-4' /> : 
                      <ArrowDown className='w-4 h-4' />
                    }
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* Left Section - Charts & Analytics */}
          <div className='lg:col-span-2 space-y-6'>
            
            {/* Revenue Chart Placeholder */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <div className='md:flex items-center justify-between mb-6'>
                <h2 className='text-lg font-semibold text-gray-900'>Revenus des 8 derniers mois</h2>
                <select className='text-sm border border-gray-300 rounded-lg px-3 py-2'>
                  <option>Cette année</option>
                  <option>Mois dernier</option>
                </select>
              </div>
              
              {/* Simulated Chart */}
              <DashboardChart />

            </div>

            {/* Recent Orders Table */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
              <div className='p-6 border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>Commandes Récentes</h2>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Commande</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Client</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Articles</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Total</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Statut</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Heure</th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {recentOrders.map((order, index) => (
                      <tr key={index} className='hover:bg-gray-50 transition-colors'>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{order.id}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{order.customer}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{order.items}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900'>{order.total}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status === 'completed' ? 'Terminé' : 
                            order.status === 'preparing' ? 'Préparation' : 'En attente'}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{order.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        

        {/* Right Section - Trending Menus */}
        <div className='col-span-3 md:col-span-1 space-y-6'>
          
          {/* Top Categories Donut Chart */}
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-lg font-semibold text-gray-900'>Top Catégories</h2>
              <span className='text-sm text-gray-500'>Ce mois</span>
            </div>
            
            {/* Simulated Donut Chart */}
            <div className='flex items-center justify-center'>
              <div className='relative w-32 h-32'>
                <div className='w-full h-full rounded-full' style={{
                  background: `conic-gradient(
                    from 0deg,
                    #f97316 0deg 120deg,
                    #fb923c 120deg 200deg,
                    #fed7aa 200deg 280deg,
                    #f3f4f6 280deg 360deg
                  )`
                }}>
                  <div className='absolute inset-4 bg-white rounded-full flex items-center justify-center'>
                    <ChefHat className='w-6 h-6 text-orange-500' />
                  </div>
                </div>
              </div>
            </div>
            
            <div className='mt-6 space-y-3'>
              {[
                { name: 'Plats Principaux', percentage: 45, color: 'bg-orange-500' },
                { name: 'Entrées', percentage: 28, color: 'bg-orange-400' },
                { name: 'Desserts', percentage: 18, color: 'bg-orange-300' },
                { name: 'Boissons', percentage: 9, color: 'bg-gray-300' }
              ].map((category, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <span className='text-sm text-gray-600'>{category.name}</span>
                  </div>
                  <span className='text-sm font-semibold text-gray-900'>{category.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Menus */}
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-lg font-semibold text-gray-900'>Menus Tendances</h2>
              <span className='text-sm text-gray-500'>Cette semaine</span>
            </div>
            
            <div className='space-y-4'>
              {trendingMenus.map((menu) => (
                <div key={menu.id} className='flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors'>
                  <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl'>
                    {menu.image}
                  </div>
                  
                  <div className='flex-1 min-w-0'>
                    <h3 className='text-sm font-semibold text-gray-900 truncate'>{menu.name}</h3>
                    <p className='text-xs text-gray-500'>{menu.category}</p>
                    <div className='flex items-center gap-2 mt-1'>
                      <Star className='w-3 h-3 text-yellow-400 fill-current' />
                      <span className='text-xs text-gray-600'>{menu.rating}</span>
                      <span className='text-xs text-gray-400'>•</span>
                      <span className='text-xs text-gray-600'>{menu.orders} commandes</span>
                    </div>
                  </div>
                  
                  <div className='text-right'>
                    <p className='text-sm font-bold text-gray-900'>{menu.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;