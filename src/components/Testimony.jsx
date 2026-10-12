// frontend/src/components/Testimony.jsx (page publique)
import { useState, useEffect } from 'react';
import { assets } from '../assets/assets/assets';
import TestimonyCart from './TestimonyCart';
import { getActiveTestimonies } from '../../services/testimonyApi';
import { toast } from 'react-toastify';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimony = () => {
    const [testimonies, setTestimonies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    
    // Nombre de cartes visibles selon l'écran
    const getCardsPerView = () => {
        if (window.innerWidth < 768) return 1; // Mobile
        if (window.innerWidth < 1024) return 2; // Tablette
        return 3; // Desktop
    };
    
    const [cardsPerView, setCardsPerView] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    // Charger les témoignages actifs depuis l'API
    const loadTestimonies = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getActiveTestimonies();
            if (response.success && response.testimonies) {
                setTestimonies(response.testimonies);
            } else {
                throw new Error(response.message || 'Structure de réponse invalide');
            }
        } catch (error) {
            console.error("Erreur chargement témoignages:", error);
            setError(error.message || "Impossible de charger les témoignages");
            toast.error(error.message || "Erreur lors du chargement des témoignages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTestimonies();
    }, []);

    // Mettre à jour le nombre de cartes visibles au redimensionnement
    useEffect(() => {
        const handleResize = () => {
            const newCardsPerView = getCardsPerView();
            setCardsPerView(newCardsPerView);
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculer le nombre total de pages
    useEffect(() => {
        if (testimonies.length > 0 && cardsPerView > 0) {
            const pages = Math.ceil(testimonies.length / cardsPerView);
            setTotalPages(pages);
            // S'assurer que currentPage reste valide
            if (currentPage >= pages) {
                setCurrentPage(0);
            }
        }
    }, [testimonies, cardsPerView]);

    // Obtenir les témoignages à afficher sur la page courante
    const getCurrentTestimonies = () => {
        const start = currentPage * cardsPerView;
        const end = start + cardsPerView;
        return testimonies.slice(start, end);
    };

    // Navigation
    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <div className='w-full min-h-[400px] relative my-8 overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60' />
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500'></div>
                </div>
            </div>
        );
    }

    if (testimonies.length === 0) {
        return (
            <div className='w-full min-h-[400px] relative my-8 overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60' />
                <div className='relative z-10 flex flex-col items-center justify-center py-16'>
                    <p className='text-xl text-white text-center'>Aucun témoignage disponible pour le moment.</p>
                    {error && <p className='text-white/70 text-sm mt-2'>{error}</p>}
                </div>
            </div>
        );
    }

    const currentTestimonies = getCurrentTestimonies();
    // Calculer la largeur des cartes (égales)
    const cardWidth = `${100 / cardsPerView}%`;

    return (
        <div className='w-full min-h-[500px] md:min-h-[550px] relative my-8 overflow-hidden'>
            {/* Image de fond */}
            <div className='w-full h-full absolute inset-0'>
                <img 
                    src={assets.urbanSpice}
                    alt="UrbanSpice" 
                    className='w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000' 
                />
            </div>

            {/* Overlay sombre */}
            <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60'/>

            {/* Contenu */}
            <div className='relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-36 py-8'>
                {/* Titre */}
                <div className="text-center py-6 md:py-8">
                    <h1 className='text-xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg'>
                        Ce que nos clients disent de nous !
                    </h1>
                    <div className="hidden md:flex w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
                </div>

                {/* Carrousel */}
                <div className="relative">
                    {/* Flèche gauche */}
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-20 
                            w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm 
                            hover:bg-yellow-500/80 transition-all duration-300 flex items-center justify-center
                            disabled:opacity-30 disabled:cursor-not-allowed
                            text-white shadow-lg`}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Conteneur des cartes */}
                    <div className="overflow-hidden mx-4 md:mx-8">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out gap-4 md:gap-6"
                            style={{
                                transform: `translateX(0%)`,
                            }}
                        >
                            {currentTestimonies.map((testimony, idx) => (
                                <div 
                                    key={testimony.id_temoignage || idx}
                                    className="flex-shrink-0"
                                    style={{ width: `calc(${cardWidth} - 0.75rem)` }}
                                >
                                    <TestimonyCart cart={testimony} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Flèche droite */}
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages - 1}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-20
                            w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm 
                            hover:bg-yellow-500/80 transition-all duration-300 flex items-center justify-center
                            disabled:opacity-30 disabled:cursor-not-allowed
                            text-white shadow-lg`}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Indicateurs (dots) */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToPage(idx)}
                                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 
                                    ${currentPage === idx 
                                        ? 'bg-yellow-500 scale-125 shadow-lg shadow-yellow-500/50' 
                                        : 'bg-white/50 hover:bg-white/70 hover:scale-110'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>    
    );
};

export default Testimony;