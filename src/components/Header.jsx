import { assets } from '../assets/assets/assets';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { ArrowDown } from 'lucide-react';

const Header = ({ onScrollToMenu }) => {

    const slides = [assets.slideMain, assets.slideMain2, assets.slideMain3];

    return (
        <header className="relative w-full h-[90vh] 2xl:h-[75vh] overflow-hidden">
            {/* Slider en fond */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Swiper
                    modules={[Navigation, Pagination, A11y, Autoplay]}
                    autoplay={{ delay: 5000 }}
                    loop={true}
                    effect="fade"
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    className="w-full h-full mes-points-pagination"
                >
                    {slides.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-black/50 z-10"></div>

            {/* Texte fixe par-dessus */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 md:px-8 lg:px-24 max-w-screen-2xl space-y-4">
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold font-outfit max-w-3xl leading-snug">
                    Faites une pause gourmande et découvrez nos créations culinaires inspirantes.
                </h1>
                <p className="text-white text-base font-open md:text-lg max-w-2xl">
                    Chaque plat est une invitation au voyage gustatif, préparé avec passion et des ingrédients de qualité.
                </p>
                <button
                    onClick={onScrollToMenu} 
                    className="flex items-center justify-center gap-3 md:w-1/3 py-4 rounded-full cursor-pointer font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:ring-yellow-300"
                >
                    Commander Maintenant
                    <ArrowDown className='w-6 h-6 animate-bounce' />
                </button>
            </div>
        </header>
    );
};

export default Header;
