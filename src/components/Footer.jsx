import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon, Send, MapPin, Phone, Mail } from 'lucide-react';
import { assets } from '../assets/assets/assets';

const Footer = () => {
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
                            
                            <form className='flex items-stretch bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20 hover:border-yellow-400/50 transition-all duration-300'>
                                <input 
                                    type="email" 
                                    placeholder='votre@email.com' 
                                    className='flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-300 border-none outline-none text-sm' 
                                />                        
                                <button
                                    type='submit' 
                                    className='flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white hover:shadow-xl font-semibold rounded-xl shadow-lg hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 group cursor-pointer'
                                >
                                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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
                            {['Accueil', 'À propos de nous', 'Services', 'FAQs', 'Contact'].map((item, index) => (
                                <li key={index}>
                                    <a href="#" className='group text-gray-300 hover:text-yellow-400 transition-all duration-300 flex items-center gap-2 py-1'>
                                        <div className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="group-hover:translate-x-2 transition-transform duration-300">{item}</span>
                                    </a>
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