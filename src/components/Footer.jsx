import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon, Send, MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { assets } from '../assets/assets/assets';
import { toast } from 'react-toastify';
import { subscribeNewsletter } from '../../services/newsletterApi';

// Smooth scroll vers une section de l'accueil (marge de 80px sous la navbar
// sticky — même logique que Navbar.scrollToSection). Hors composant : pas de
// dépendance d'effet à déclarer.
const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return false;
    window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    return true;
};

const Footer = () => {
    // ── Newsletter : formulaire vivant (état + envoi serveur) ─────
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ── Liens Utiles : vraies destinations (sections de la page d'accueil) ──
    const location = useLocation();

    const usefulLinks = [
        { name: 'Accueil', href: '#home' },
        { name: 'À propos de nous', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'FAQs', href: '#faqs' },
        { name: 'Contact', href: '#contact' },
    ];

    // Depuis une autre page publique : <Link> navigue vers /#section, puis on
    // scrolle une fois l'accueil monté (ScrollToTop vient de remonter à 0 —
    // notre délai passe après son smooth scroll, l'appel le plus récent gagne).
    useEffect(() => {
        if (location.pathname === '/' && location.hash) {
            const timer = setTimeout(() => {
                scrollToSection(location.hash.replace('#', ''));
            }, 250);
            return () => clearTimeout(timer);
        }
    }, [location]);

    // Déjà sur l'accueil : scroll direct, pas de re-navigation
    const handleUsefulLink = (e, href) => {
        const id = href.replace('#', '');
        if (location.pathname === '/' && document.getElementById(id)) {
            e.preventDefault();
            scrollToSection(id);
        }
    };

    // Filet anti double-soumission + regex avant même d'appeler l'API
    // (le serveur revalide de toute façon — voir NewsletterController)
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const handleSubmitNewsletter = async (e) => {
        e.preventDefault(); // stoppe le rechargement natif de la page

        if (isSubmitting) return;

        const trimmed = email.trim();
        if (!EMAIL_REGEX.test(trimmed)) {
            toast.error('Veuillez saisir une adresse email valide.');
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await subscribeNewsletter(trimmed);
            if (response.success) {
                toast.success(response.message || 'Inscription confirmée !');
                setEmail(''); // reset seulement après succès
            } else {
                toast.error(response.message || 'Une erreur est survenue.');
            }
        } catch (error) {
            toast.error(error.message || "Impossible de s'abonner. Réessayez plus tard.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className='w-full bg-gradient-to-b from-gray-800 to-gray-900 relative mt-8 overflow-hidden'>
            
            <div className="absolute top-0 left-0 w-full overflow-hidden">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 fill-white">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            <div className='pt-20 pb-12'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-36 mx-auto'>

                    {/* Newsletter */}
                    <div className='col-span-1 sm:col-span-2 lg:col-span-2 space-y-6'>
                        
                        {/* Logo */}
                        <Link to='/' className='group flex items-center gap-3 cursor-pointer mb-6'>
                            <div className="relative">
                                <img className='w-8 md:w-10 h-8 md:h-10' src={assets.logo} alt="Logo" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                            </div>
                            <h1 className='text-2xl md:text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300'>
                                Urban<span className='text-yellow-400 group-hover:text-white'>Spice</span>
                            </h1>
                        </Link>

                        {/* Description */}
                        <p className="text-gray-300 leading-relaxed max-w-md">
                            Découvrez une expérience culinaire unique où tradition et modernité se rencontrent. 
                            Savourez nos plats dans une ambiance chaleureuse et authentique.
                        </p>

                        {/* Newsletter */}
                        <div className='space-y-3'>
                            <h3 className='text-white font-bold text-lg flex items-center gap-2'>
                                <Mail className="w-5 h-5 text-yellow-400" />
                                Newsletter
                            </h3>
                            <p className="text-gray-300 text-sm">Restez informé de nos nouveautés et offres spéciales</p>
                            
                            <form onSubmit={handleSubmitNewsletter} className='flex items-stretch bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20 hover:border-yellow-400/50 transition-all duration-300'>
                                <input 
                                    type="email" 
                                    placeholder='votre@email.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isSubmitting}
                                    aria-label='Adresse email pour la newsletter'
                                    className='flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-300 border-none outline-none text-sm disabled:opacity-50' 
                                />                        
                                <button
                                    type='submit'
                                    disabled={isSubmitting}
                                    aria-label="S'abonner à la newsletter"
                                    className='flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white hover:shadow-xl font-semibold rounded-xl shadow-lg hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100'
                                >
                                    {isSubmitting ? (
                                        <Loader2 className='w-4 h-4 animate-spin' />
                                    ) : (
                                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Liens Utiles */}
                    <div className='space-y-4'>
                        <h3 className='text-xl font-bold text-white pb-2 border-b-2 border-yellow-400 inline-block'>
                            Liens Utiles
                        </h3>
                        <ul className='space-y-3'>
                            {usefulLinks.map((link, index) => (
                                <li key={index}>
                                    <Link 
                                        to={`/${link.href}`}
                                        onClick={(e) => handleUsefulLink(e, link.href)}
                                        className='group text-gray-300 hover:text-yellow-400 transition-all duration-300 flex items-center gap-2 py-1'
                                    >
                                        <div className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Nos Services */}
                    <div className='space-y-4'>
                        <h3 className='text-xl font-bold text-white pb-2 border-b-2 border-yellow-400 inline-block'>
                            Nos Services
                        </h3>
                        <ul className='space-y-3'>
                            {[
                                'Réservation en ligne',
                                'Commande à emporter', 
                                'Livraison à domicile',
                                'Service traiteur',
                                'Menus personnalisés'
                            ].map((service, index) => (
                                <li key={index}>
                                    <span className='group text-gray-300 hover:text-yellow-400 transition-all duration-300 flex items-center gap-2 py-1 cursor-pointer'>
                                        <div className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="group-hover:translate-x-2 transition-transform duration-300 text-sm leading-relaxed">{service}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Réseaux Sociaux & Contact */}
                    <div className='space-y-6'>
                        <div className='space-y-4'>
                            <h3 className='text-xl font-bold text-white pb-2 border-b-2 border-yellow-400 inline-block'>
                                Suivez-nous
                            </h3>
                            
                            <div className='flex gap-4'>
                                {[
                                    { icon: FacebookIcon, color: 'hover:bg-blue-600', label: 'Facebook' },
                                    { icon: TwitterIcon, color: 'hover:bg-sky-500', label: 'Twitter' },
                                    { icon: InstagramIcon, color: 'hover:bg-pink-600', label: 'Instagram' }
                                ].map((social, index) => (
                                    <a 
                                        key={index}
                                        href="#" 
                                        className={`group w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 hover:border-transparent hover:shadow-lg`}
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div className='space-y-3'>
                            <h4 className='text-white font-semibold flex items-center gap-2'>
                                <Phone className="w-4 h-4 text-yellow-400" />
                                Contact Rapide
                            </h4>
                            <div className='space-y-2 text-sm'>
                                <p className='text-gray-300 flex items-center gap-2'>
                                    <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                                    Emana, Ydé 530012
                                </p>
                                <p className='text-gray-300 flex items-center gap-2'>
                                    <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                                    +237 XXX XXX XXX
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Copyright Section */}
            <div className='bg-gray-900/80 backdrop-blur-sm border-t border-gray-600/30'>
                <div className='max-w-screen-2xl mx-auto px-6 md:px-8 lg:px-24 py-6'>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                        
                        <div className='flex items-center gap-2 text-gray-400 text-sm'>
                            <span>© 2025</span>
                            <Link to='/' className='group'>
                                <span className='font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300'>
                                    Urban<span className='text-yellow-400 group-hover:text-white'>Spice</span>
                                </span>
                            </Link>
                            <span>• Tous droits réservés</span>
                        </div>

                        {/* Legal Links */}
                        <div className='flex items-center gap-6 text-sm'>
                            <a href="#" className='text-gray-400 hover:text-yellow-400 transition-colors duration-300'>
                                Politique de confidentialité
                            </a>
                            <a href="#" className='text-gray-400 hover:text-yellow-400 transition-colors duration-300'>
                                Mentions légales
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating */}
            <div className="absolute top-1/4 left-10 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
            
        </footer>
    )
}

export default Footer;