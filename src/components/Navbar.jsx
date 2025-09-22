import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets/assets';
import { ShoppingCart, Heart, Search, Moon, Sun, Menu, Info, Briefcase, Utensils, Phone, X, ArrowLeft, Home, User } from 'lucide-react';
import { Link } from 'react-router-dom';

import { StoreContext } from '../contexts/StoreContext';

const Navbar = () => {

    const { getTotalCart, getTotalHeart, setIsShowLogin } = useContext(StoreContext);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [inputSearchOpen, setInputSearchOpen] = useState(false);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [mobileMenuOpen]);

    return (
        <>
            <nav className='w-full bg-white px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-36 mx-auto flex justify-between items-center sticky top-0 z-50 h-20'>

                <div className='w-full flex items-center justify-between relative'>

                    {/* Left: Menu icon (mobile) */}
                    <div className='md:hidden'>
                        <Menu className='w-6 h-6 cursor-pointer' onClick={() => setMobileMenuOpen(true)} />
                    </div>

                    {/* Center: Logo */}
                    <Link to='/' className='flex items-center gap-2 cursor-pointer'>
                        <img className='w-6 md:w-8 h-6 md:h-8' src={assets.logo} alt="Logo" />
                        <h1 className='text-xl md:text-2xl font-semibold font-outfit'>
                            Urban<span className='text-light'>Spice</span>
                        </h1>
                    </Link>

                    <nav className='hidden md:flex'>
                        <ul className="flex items-center p-4 gap-4 text-lg font-semibold">
                            <Link to='/' onClick={() => setMobileMenuOpen(false)} className='hover:text-light px-2'>Accueil</Link>
                            <li className='cursor-pointer hover:text-light px-2'>À propos</li>
                            <li className='cursor-pointer hover:text-light px-2'>Services</li>
                            <Link
                                to='/faqs' 
                                onClick={() => setMobileMenuOpen(false)} 
                                className='hover:text-light px-2'
                            >
                                FAQs
                            </Link>
                            <li className='cursor-pointer hover:text-light px-2'>Contact</li>
                        </ul>
                    </nav>

                    {/* Right: Search (mobile) + full icons (desktop) */}
                    <div className="flex items-center gap-4 text-light text-xl">
                        <button
                            className="cursor-pointer p-1 hover:bg-gray-100 rounded-md transition"
                            onClick={() => setInputSearchOpen(true)}
                        >
                            <Search className="w-6 h-6 text-light" />
                        </button>

                        {inputSearchOpen && (
                            <form
                                className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full md:max-w-4xl md:rounded-md px-4 py-2 flex items-center gap-2 bg-background-menu-dark text-background-top-light shadow-md z-50 transition-transform duration-300 ${
                                    inputSearchOpen ? 'translate-y-0' : '-translate-y-10'
                                }`}
                            >

                                <button
                                    type="button"
                                    onClick={() => setInputSearchOpen(false)}
                                    className="p-2 rounded-full hover:bg-white/10 transition"
                                >
                                    <ArrowLeft className="w-6 h-6 text-background-top-light" />
                                </button>

                                <input
                                    type="search"
                                    placeholder="Rechercher un menu..."
                                    className="flex-1 px-4 py-1 md:py-2 rounded-md bg-background-top-light text-background-menu-dark placeholder:text-gray-500 border-none focus:outline-none"
                                />

                                <button
                                    type="submit"
                                    className="p-2 rounded-md bg-background-top-light hover:bg-white text-background-menu-dark transition cursor-pointer"
                                >
                                    <Search className="w-5 h-5 md:w-6 md:h-6" />
                                </button>
                            </form>
                        )}

                        {/* Login icon (Mobile) */}
                        <div className='md:hidden'>
                            <button 
                                onClick={() => setIsShowLogin(true)} 
                                className='bg-background-top-light px-2 py-2 rounded-full cursor-pointer'
                            >
                                <User className="hover:text-yellow-400" />
                            </button>
                        </div>

                        {inputSearchOpen && (
                            <div onClick={() => setInputSearchOpen(false)} className="fixed hidden md:flex inset-0 bg-gray-500/80 bg-opacity-50 z-45"></div>
                        )}


                        {/* Desktop icons */}
                        <div className='hidden md:flex items-center gap-4'>
                            <div className='relative p-1 hover:bg-gray-100 rounded-md transition'>
                                <Link to='/favorite'>
                                    <Heart className="w-6 h-6 cursor-pointer" />
                                </Link>
                                <span className="absolute -top-2 -right-1 text-xs bg-background-dark-light text-white rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                                    {getTotalHeart()}
                                </span>
                            </div>
                            <div className='relative p-1 hover:bg-gray-100 rounded-md transition'>
                                <Link to='/card'>                    
                                    <ShoppingCart className="w-6 h-6 cursor-pointer" />
                                </Link>
                                <span className="absolute -top-2 -right-1 text-xs bg-background-dark-light text-white rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                                    {getTotalCart()}
                                </span>
                            </div>
                            <button 
                                onClick={() => setIsShowLogin(true)} 
                                className='bg-background-top-light px-2 py-2 rounded-full cursor-pointer'
                            >
                                <User className="hover:text-yellow-400" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile sliding menu */}
                <div className={`fixed top-0 left-0 h-full w-3/4 bg-background-top-light shadow-md transform transition-transform duration-300 z-50 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex justify-between items-center p-4 border-b border-gray-200">
                        <div className='p-0.5 rounded bg-gray-200 '>
                            <X className="cursor-pointer" onClick={() => setMobileMenuOpen(false)} />
                        </div>
                        <Link 
                            to='/' 
                            className='flex items-center gap-1 cursor-pointer'
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <img className='w-4 h-4' src={assets.logo} alt="Logo" />
                            <h1 className='text-[16px] font-semibold font-outfit'>
                                Urban<span className='text-light'>Spice</span>
                            </h1>
                        </Link>
                    </div>

                    <nav>
                        <ul className="flex flex-col p-4 gap-4 text-lg">
                            <Link 
                                to='/' 
                                onClick={() => setMobileMenuOpen(false)} 
                                className='hover:text-light flex gap-2 items-center'
                            >
                                <Home className='w-5 h-5' />
                                Accueil
                            </Link>
                            <a href='#about' className='cursor-pointer hover:text-light flex items-center gap-2'>
                                <Info className='w-5 h-5' />
                                À propos
                            </a>
                            <li className='cursor-pointer hover:text-light flex items-center gap-2'>
                                <Briefcase className='w-5 h-5' />
                                Services
                            </li>
                            <Link 
                            to='/faqs' 
                            onClick={() => setMobileMenuOpen(false)} 
                            className='hover:text-light flex items-center gap-2'>
                                <Utensils className='w-5 h-5' />
                                FAQs
                            </Link>
                            <li className='cursor-pointer hover:text-light flex items-center gap-2'>
                                <Phone className='w-5 h-5' />
                                Contact
                            </li>
                        </ul>
                    </nav>

                    <div className='flex flex-col gap-6 items-start border-t border-gray-200 mt-4 p-4'>
                        <Link 
                            to='/card' 
                            className='flex items-center justify-between gap-2 cursor-pointer'
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <p>Voir mon panier </p>
                            <div className='relative'>
                                <ShoppingCart className="w-6 h-6 cursor-pointer text-light" />
                                <span className="absolute -top-2 -right-1 text-xs bg-background-dark-light text-white rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                                    {getTotalCart()}
                                </span>
                            </div>
                        </Link>
                        <Link 
                            to='/favorite' 
                            className='flex items-center justify-between gap-2 cursor-pointer'
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <p>Voir mes favoris  </p>
                            <div className='relative'>
                                <Heart className="w-6 h-6 cursor-pointer text-light" />
                                <span className="absolute -top-2 -right-1 text-xs bg-background-dark-light text-white rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                                    {getTotalHeart()}
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* <div className='flex items-center gap-2 border-t border-gray-200 mt-2 w-full p-4'>
                        <p>Connexion</p>
                        <button 
                            onClick={() => setIsShowLogin(true)} 
                            className='bg-background-top-light px-2 py-2 rounded-full cursor-pointer'
                        >
                            <User className="hover:text-yellow-400" />
                        </button>
                    </div> */}
                </div>

                {/* Overlay when menu is open (optional) */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 bg-black/30 bg-opacity-30 z-40" onClick={() => setMobileMenuOpen(false)} />
                )}
            </nav>
        </>
    );
};

export default Navbar;
