import { Link, Outlet } from 'react-router-dom';
import { assets } from '../../assets/assets/assets';
import Sidebar from '../../components/admin/Sidebar';

const Layout = () => {

  return (
    <>
        <div className=' flex items-center justify-between py-2 h-[70px] px-4 shadow'>
            <div className='w-full flex items-center justify-between'>
                {/* Logo */}
                <Link to='/' className='group flex items-center gap-3 cursor-pointer'>
                    <div className="relative">
                        <img className='w-6 md:w-8 h-6 md:h-8' src={assets.logo} alt="Logo" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                    </div>
                    <h1 className='text-2xl font-bold text-background-dark-light group-hover:text-yellow-400 transition-colors duration-300'>
                        Urban<span className='text-yellow-400 group-hover:text-background-dark-light'>Spice</span>
                    </h1>
                </Link>  
                <Link to="/" className="flex items-center justify-center gap-3 px-5  py-2 rounded-full cursor-pointer font-bold text-sm transition-all duration-300 focus:outline-none focus:ring-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-yellow-300">
                    Voir le site
                </Link>    
            </div>
        </div>
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            <Outlet />
        </div>
    </>
  )
}

export default Layout;
