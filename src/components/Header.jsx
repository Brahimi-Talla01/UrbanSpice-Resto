import { assets } from '../assets/assets/assets';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Header = () => {

    const slides = [assets.slideMain, assets.slideMain2, assets.slideMain3];

    return (
        <header className="relative w-full h-[90vh] overflow-hidden">
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
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 space-y-4">
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold font-outfit max-w-3xl leading-snug">
                    Faites une pause gourmande et découvrez nos créations culinaires inspirantes.
                </h1>
                <p className="text-white text-base font-open md:text-lg max-w-2xl">
                    Chaque plat est une invitation au voyage gustatif, préparé avec passion et des ingrédients de qualité.
                </p>
                <button className="bg-background-menu-light hover:bg-yellow-400 text-gray-900 font-semibold text-sm md:text-lg rounded-full px-6 py-3 transition duration-300 shadow-lg w-fit cursor-pointer">
                    Commander Maintenant
                </button>
            </div>
        </header>
    );
};

export default Header;
