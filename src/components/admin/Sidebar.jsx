import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, 
  Utensils, 
  Package, 
  CalendarClock, 
  Wrench, 
  ChefHat, 
  MessageSquareMore, 
} from 'lucide-react';
import AdminProfileSection from './AdminProfileSection';

const Sidebar = () => {
  const links = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Menus', path: '/admin/menu', icon: Utensils },
    { name: 'Commande', path: '/admin/commande', icon: Package },
    { name: 'Reservation', path: '/admin/reservation', icon: CalendarClock },
    { name: 'Service', path: '/admin/service', icon: Wrench },
    { name: 'Chefs Cuisinier', path: '/admin/chefhat', icon: ChefHat },
    { name: 'Témoignage', path: '/admin/temoignage', icon: MessageSquareMore },
  ];

  return (
    <div className='flex flex-col justify-between bg-white shadow-xl pt-8 border-r border-gray-200 z-20'>
      
      <div>

        <div className='px-6 mb-8 hidden md:block'>
          <h2 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
            Administration
          </h2>
        </div>

        {/* Navigation Links */}
        <nav className='flex-1 space-y-1 px-3'>
          {links.map((link, index) => (
            <NavLink 
              key={link.path}
              to={link.path}
              end={link.path === '/admin'}
              className={({ isActive }) => `
                group relative flex items-center gap-4 py-2 px-2 mx-1 rounded-xl
                text-gray-700 dark:text-gray-300 font-medium
                transition-all duration-300 ease-out
                hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 
                dark:hover:from-gray-800 dark:hover:to-gray-700
                hover:text-gray-900 dark:hover:text-white 
                hover:scale-[1.02] hover:-translate-y-0.5
                ${isActive 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow shadow-yellow-200 transform scale-[1.02]' 
                  : ''
                }
              `}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >

              {/* Icône */}
              <div className={`
                relative p-2 rounded-lg transition-all duration-300
                ${({ isActive }) => isActive 
                  ? 'bg-white/20' 
                  : 'group-hover:bg-yellow-400/20'
                }
              `}>
                <link.icon className={`
                  w-5 h-5 transition-all duration-300
                  ${({ isActive }) => isActive 
                    ? 'text-white' 
                    : 'text-gray-500 group-hover:text-yellow-600'
                  }
                `} />
                
              </div>

              {/* Texte */}
              <span className={`
                hidden md:inline-block text-sm font-semibold tracking-wide
                transition-all duration-300
                ${({ isActive }) => isActive 
                  ? 'text-white drop-shadow-sm' 
                  : 'group-hover:translate-x-1'
                }
              `}>
                {link.name}
              </span>

              {/* Effet sur mobile */}
              <div className={`
                md:hidden absolute right-2 opacity-0 transition-all duration-300
                ${({ isActive }) => !isActive && 'group-hover:opacity-100 group-hover:translate-x-1'}
              `}>
                <div className='w-2 h-2 bg-yellow-400 rounded-full' />
              </div>
            </NavLink>
          ))}
        </nav>

      </div>

      <AdminProfileSection />

    </div>
  );
};

export default Sidebar;