import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets/assets';
import { ShoppingCart, Heart, Search, Menu, Info, Briefcase, Utensils, Phone, X, ArrowLeft, Home, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../contexts/StoreContext';
import UserProfile from './UserProfile';

const Navbar = () => {
    const { getTotalCart, getTotalHeart, setIsShowLogin } = useContext(StoreContext);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [inputSearchOpen, setInputSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [mobileMenuOpen]);


    // Fonction pour le smooth scroll
    const scrollToSection = (href) => {
        const sectionId = href.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
                const offsetTop = element.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
        }
        setIsOpenMenu(false); 
    };

    useEffect(() => {
        const handleScroll = () => {
                const sections = ['home', 'about', 'services', 'contact', 'faqs'];
                const scrollPosition = window.scrollY + 100;

                for (const section of sections) {
                    const element = document.getElementById(section);
                    if (element) {
                    const { offsetTop, offsetHeight } = element;
                            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                                setActiveSection(section);
                                break;
                            }
                    }
                }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const navItems = [
        { name: 'Accueil', href: '#home' },
        { name: 'Services', href: '#services'},
        { name: 'A propos', href: '#about' },
        { name: 'Contact', href: '#contact' },
        { name: 'Faqs', href: '#faqs' },
    ];

    return (
        <>
            {/* Navbar principale */}
            <nav className={`w-full px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-36 mx-auto flex justify-between items-center sticky top-0 z-50 h-20 transition-all duration-300 ${
                scrolled 
                    ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100' 
                    : 'bg-white shadow-sm'
            }`}>
                
                <div className='w-full flex items-center justify-between relative'>

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

                    {/* Navigation centrale - Desktop */}
                    <nav className='hidden lg:flex'>
                        <ul className="flex items-center gap-8">
                            {navItems.map((item, index) => {

                                const sectionId = item.href.replace('#', '');
                                const isActive = activeSection === sectionId;
                                return (
                                    <li key={index}>
                                        <button
                                            onClick={() => scrollToSection(item.href)} 
                                            className={`relative px-4 py-2 text-base font-medium cursor-pointer transition-all duration-300 hover:text-yellow-500 ${
                                                isActive 
                                                    ? 'text-yellow-500' 
                                                    : 'text-gray-700 hover:text-yellow-500'
                                            }`}
                                        >
                                            {item.name}
                                            {isActive && (
                                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                            )}
                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    {/* Actions à droite */}
                    <div className="flex items-center gap-3">
                        
                        {/* Bouton de recherche */}
                        <button
                            className="p-2.5 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-300"
                            onClick={() => setInputSearchOpen(true)}
                        >
                            <Search className="w-5 h-5 text-gray-600" />
                        </button>

                        {/* Icônes desktop */}
                        <div className='hidden md:flex items-center gap-2'>
                            
                            {/* Favoris */}
                            <Link to='/favorite' className='relative p-2.5 hover:bg-gray-100 rounded-full transition-colors duration-300 group'>
                                <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
                                {getTotalHeart() > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 text-xs bg-red-500 text-white rounded-full flex items-center justify-center font-medium">
                                        {getTotalHeart()}
                                    </span>
                                )}
                            </Link>

                            {/* Panier */}
                            <Link to='/card' className='relative p-2.5 hover:bg-gray-100 rounded-full transition-colors duration-300 group'>
                                <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
                                {getTotalCart() > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 text-xs bg-orange-500 text-white rounded-full flex items-center justify-center font-medium">
                                        {getTotalCart()}
                                    </span>
                                )}
                            </Link>
                        </div>

                        {/* Bouton Login  */}
                        {
                            !isConnected ? 
                                <button 
                                    onClick={() => setIsShowLogin(true)} 
                                    className='hidden md:flex items-center cursor-pointer gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
                                >
                                    Se connecter
                                </button>
                            : <UserProfile />
                        }

                        {/* Menu mobile */}
                        <button 
                            className='lg:hidden p-2.5 hover:bg-gray-100 rounded-full transition-colors duration-300'
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className='w-5 h-5 text-gray-600' />
                        </button>
                    </div>
                </div>

                {/* Barre de recherche overlay */}
                {inputSearchOpen && (
                    <div className="fixed inset-0 bg-black/20 z-50 flex items-start justify-center pt-4">
                        <div className="w-full max-w-2xl mx-4">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 transform animate-in fade-in slide-in-from-top-4 duration-300">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setInputSearchOpen(false)}
                                        className=" cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                                    </button>
                                    
                                    <div className="flex-1 relative">
                                        <input
                                            type="search"
                                            placeholder="Rechercher un menu..."
                                            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                                            autoFocus
                                        />
                                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-lg transition-all cursor-pointer">
                                            <Search className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Menu mobile sidebar */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
                mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                
                {/* Header du menu mobile */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-yellow-50">
                    <Link 
                        to='/' 
                        className='flex items-center gap-2 cursor-pointer'
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <img className='w-8 h-8' src={assets.logo} alt="Logo" />
                        <h1 className='text-xl font-bold font-outfit bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                            Urban<span className='text-gray-700'>Spice</span>
                        </h1>
                    </Link>
                    <button 
                        className="p-2 hover:bg-white/50 rounded-full transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Navigation mobile */}
                <nav className="py-4">
                    <ul className="space-y-2">
                        {[
                            { icon: Home, name: 'Accueil', href: '#home' },
                            { icon: Info, name: 'À propos', href: '#about' },
                            { icon: Briefcase, name: 'Services', href: '#services' },
                            { icon: Utensils, name: 'FAQs', href: '#faqs' },
                            { icon: Phone, name: 'Contact', href: '#contact' },
                        ].map((item, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        scrollToSection(item.href);
                                    }}
                                    className='w-full flex items-center gap-4 px-6 py-4 text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-all duration-300'
                                >
                                    <item.icon className='w-5 h-5' />
                                    <span className="font-medium">{item.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Actions mobiles */}
                <div className='border-t border-gray-100 p-6 space-y-4'>
                    <Link 
                        to='/card' 
                        className='flex items-center justify-between p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors'
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="text-gray-700 font-medium">Mon panier</span>
                        <div className='relative'>
                            <ShoppingCart className="w-5 h-5 text-orange-500" />
                            {getTotalCart() > 0 && (
                                <span className="absolute -top-2 -right-2 min-w-[18px] h-4 px-1 text-xs bg-orange-500 text-white rounded-full flex items-center justify-center">
                                    {getTotalCart()}
                                </span>
                            )}
                        </div>
                    </Link>

                    <Link 
                        to='/favorite' 
                        className='flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors'
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="text-gray-700 font-medium">Mes favoris</span>
                        <div className='relative'>
                            <Heart className="w-5 h-5 text-red-500" />
                            {getTotalHeart() > 0 && (
                                <span className="absolute -top-2 -right-2 min-w-[18px] h-4 px-1 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                                    {getTotalHeart()}
                                </span>
                            )}
                        </div>
                    </Link>

                    <button 
                        onClick={() => {
                            setIsShowLogin(true);
                            setMobileMenuOpen(false);
                        }} 
                        className='w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105'
                    >
                        <User className="w-5 h-5" />
                        Se connecter
                    </button>
                </div>
            </div>

            {/* Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black/30 z-30" onClick={() => setMobileMenuOpen(false)} />
            )}

            {/* Overlay */}
            {inputSearchOpen && (
                <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setInputSearchOpen(false)} />
            )}
        </>
    );
};

export default Navbar;