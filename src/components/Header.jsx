import { assets } from '../assets/assets/assets';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowDown, Clock, Star, Award } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Header = ({ onScrollToMenu, onScrollReservation }) => {
    const slides = [assets.slideMain, assets.slideMain2, assets.slideMain3];

    return (
        <header id='home' className="relative w-full min-h-[90vh] pt-10 pb-10 overflow-hidden bg-background-top-light">
            {/* Éléments décoratifs flottants */}
            <div className="absolute inset-0 z-5">
                {/* Cercles décoratifs */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 "></div>
                <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-30 "></div>
                <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full opacity-25"></div>
                
                {/* Formes géométriques */}
                <div className="absolute top-40 right-32 w-8 h-8 border-4 border-orange-300 rotate-45 opacity-40 "></div>
                <div className="absolute bottom-60 right-16 w-6 h-6 bg-yellow-400 opacity-30"></div>
            </div>

            {/* Container principal avec grid layout */}
            <div className="relative z-20 h-full px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-36 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full items-center gap-8 lg:gap-16">
                    
                    {/* Section texte - Gauche */}
                    <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
                        {/* Badge "Welcome" */}
                        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg w-fit">
                            <Award className="w-5 h-5 text-orange-500" />
                            <span className="text-gray-700 font-medium text-sm">Bienvenue chez</span>
                        </div>

                        {/* Titre principal */}
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                                <span className="text-gray-800">Restaurant gastronomique,</span>
                                <br />
                                <span className="text-gray-700">Savourez </span>
                                <span className="relative inline-block">
                                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                                        Votre repas
                                    </span>
                                    {/* Soulignement décoratif */}
                                    <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                                        <path d="M2 7C60 2 140 2 198 7" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
                                    </svg>
                                </span>
                            </h1>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-lg md:text-xl max-w-lg leading-relaxed">
                            Chaque plat est une invitation au voyage gustatif, préparé avec passion et des ingrédients de qualité premium.
                        </p>

                        {/* Boutons d'action */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={onScrollToMenu}
                                className="group flex items-center justify-center cursor-pointer gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300"
                            >
                                Commande en Ligne
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:-rotate-90 transition-transform duration-300">
                                    <ArrowDown className='w-4 h-4' />
                                </div>
                            </button>

                            <button
                                onClick={onScrollReservation} 
                                className="flex cursor-pointer items-center justify-center gap-2 px-8 py-4 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-white"
                            >
                                Réserver une Table
                            </button>
                        </div>

                        {/* Informations supplémentaires */}
                        <div className="flex items-center gap-6 pt-4">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="w-5 h-5 text-orange-500" />
                                <span className="font-medium">Ouvert: Lun-Dim</span>
                            </div>
                        </div>
                    </div>

                    {/* Section image/slider - Droite */}
                    <div className="relative flex items-center justify-center">
                        {/* Cercle décoratif principal */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] border-4 border-dashed border-yellow-400 rounded-full opacity-60 animate-spin-very-slow"></div>
                        </div>

                        {/* Container du slider avec effet cercle */}
                        <div className="relative w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden shadow-2xl border-8 border-white bg-white">
                            <Swiper
                                modules={[Navigation, Pagination, A11y, Autoplay]}
                                autoplay={{ delay: 5000 }}
                                loop={true}
                                effect="fade"
                                slidesPerView={1}
                                pagination={{ 
                                    clickable: true,
                                    bulletActiveClass: 'swiper-pagination-bullet-active-custom'
                                }}
                                className="w-full h-full rounded-full mes-points-pagination-custom"
                            >
                                {slides.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={img}
                                            alt={`Slide ${index + 1}`}
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Badge "Best Food" */}
                        <div className="absolute top-4 right-4 lg:top-8 lg:right-8 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg transform rotate-12 animate-pulse">
                            <div className="flex items-center gap-1 font-bold text-sm">
                                <Star className="w-4 h-4 fill-current" />
                                <span>Best Food 😋</span>
                            </div>
                        </div>

                        {/* Card flottante - Plat du jour */}
                        <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">🥗</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Salade Saumon</h4>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-orange-500 font-bold">$12</p>
                                </div>
                            </div>
                        </div>

                        {/* Éléments décoratifs autour de l'image */}
                        {/* <div className="absolute -top-4 -left-4 w-6 h-6 bg-red-400 rounded-full opacity-80 animate-bounce"></div>
                        <div className="absolute -bottom-6 -right-6 w-4 h-4 bg-green-400 rounded-full opacity-70 animate-ping"></div> */}
                        <div className="absolute top-1/2 -right-8 w-5 h-5 bg-yellow-400 rotate-45 opacity-60 animate-pulse"></div>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Header;