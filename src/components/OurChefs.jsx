// frontend/src/components/OurChefs.jsx - Section chefs de la page d'accueil (données BDD)
import { useState, useEffect, useRef, useCallback } from 'react';
import { Facebook, Instagram, Twitter, User } from 'lucide-react';
import { getActiveChefs } from '../../services/chefApi';
import { toast } from 'react-toastify';

const OurChefs = () => {
    const [chefs, setChefs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const scrollContainerRef = useRef(null);

    // Charger les chefs actifs depuis l'API (données créées par l'admin)
    const loadChefs = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getActiveChefs();
            if (response.success && response.chefs) {
                setChefs(response.chefs);
            } else {
                throw new Error(response.message || 'Structure de réponse invalide');
            }
        } catch (err) {
            console.error("Erreur chargement chefs:", err);
            setError(err.message || "Impossible de charger les chefs");
            toast.error(err.message || "Erreur lors du chargement des chefs");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadChefs();
    }, [loadChefs]);

    const scrollToSlide = (index) => {
        const container = scrollContainerRef.current;
        if (container && chefs.length > 0) {
            const cardWidth = container.scrollWidth / chefs.length;
            container.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
        }
    };

    // Suivi du slide actif au défilement (mobile)
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || chefs.length === 0) return undefined;
        const handleScroll = () => {
            const cardWidth = container.scrollWidth / chefs.length;
            setActiveSlide(Math.round(container.scrollLeft / cardWidth));
        };
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [chefs]);

    if (loading) {
        return (
            <div className='w-full overflow-hidden'>
                <h1 className='text-2xl text-center py-4 md:pt-8 md:text-4xl font-semibold'> Nos Chefs Professionnels</h1>
                <div className='flex justify-center py-12'>
                    <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500'></div>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full overflow-hidden'>
            <h1 className='text-2xl text-center py-4 md:pt-8 md:text-4xl font-semibold'> Nos Chefs Professionnels</h1>

            {/* Message d'erreur avec bouton Réessayer */}
            {error && (
                <div className='mx-4 sm:mx-8 md:mx-16 lg:mx-24 text-center py-8 text-red-500 bg-red-50 rounded-lg mb-4'>
                    <p className='text-lg font-semibold'>⚠️ {error}</p>
                    <button
                        onClick={loadChefs}
                        className='mt-4 px-5 py-2 rounded-full cursor-pointer font-bold text-sm bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-xl'
                    >
                        Réessayer
                    </button>
                </div>
            )}

            {/* Aucun chef actif en base */}
            {!error && chefs.length === 0 && (
                <div className='flex flex-col items-center justify-center py-12 text-gray-400'>
                    <User className='w-12 h-12 mb-2' />
                    <p>Aucun chef disponible pour le moment.</p>
                </div>
            )}

            {chefs.length > 0 && (
                <>
                    {/* Desktop */}
                    <div className='hidden md:grid px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-36 mx-auto gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 py-4 md:py-8'>
                        {chefs.map((chef) => (
                            <div
                                key={chef.id_chef}
                                className='bg-background-top-light rounded-md p-4 flex items-center justify-center flex-col shadow-md hover:scale-102 hover:shadow-2xl duration-300 group'
                            >
                                <div className='w-full h-50 rounded overflow-hidden relative group'>
                                    {chef.image_url ? (
                                        <img
                                            src={chef.image_url}
                                            alt={`Chef ${chef.name}`}
                                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                        />
                                    ) : (
                                        <div className='w-full h-full bg-gray-100 flex items-center justify-center'>
                                            <User className='w-10 h-10 text-gray-400' />
                                        </div>
                                    )}

                                    {chef.social_link && (
                                        <div className='absolute bottom-[-40px] group-hover:bottom-0 w-full bg-white/40 py-2 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500'>
                                            <a href={chef.social_link} target='_blank' rel='noopener noreferrer' className='cursor-pointer text-lg font-bold hover:text-yellow-500 transition duration-300'>
                                                <Facebook />
                                            </a>
                                            <a href={chef.social_link} target='_blank' rel='noopener noreferrer' className='cursor-pointer text-lg font-bold hover:text-yellow-500 transition duration-300'>
                                                <Instagram />
                                            </a>
                                            <a href={chef.social_link} target='_blank' rel='noopener noreferrer' className='cursor-pointer text-lg font-bold hover:text-yellow-500 transition duration-300'>
                                                <Twitter />
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <h1 className='text-2xl text-gray-800 py-0.5 text-center font-semibold'>{chef.name}</h1>
                                <p className='text-sm font-semibold text-gray-600 pb-1 text-center'>{chef.post}</p>
                                {chef.description && (
                                    <div>
                                        <p className='text-sm text-gray-700 text-justify'>{chef.description}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile */}
                    <div className='md:hidden py-2 md:py-8'>
                        <div
                            ref={scrollContainerRef}
                            className='flex gap-3 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory'
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none'
                            }}
                        >
                            {chefs.map((chef) => (
                                <div
                                    key={chef.id_chef}
                                    className='bg-gray-50 flex-shrink-0 rounded-md p-4 flex items-center justify-center flex-col shadow-md group snap-start'
                                    style={{
                                        width: 'calc(100vw - 4rem)',
                                        maxWidth: '320px'
                                    }}
                                >
                                    <div className='w-full h-48 rounded overflow-hidden relative group'>
                                        {chef.image_url ? (
                                            <img
                                                src={chef.image_url}
                                                alt={`Chef ${chef.name}`}
                                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                            />
                                        ) : (
                                            <div className='w-full h-full bg-gray-100 flex items-center justify-center'>
                                                <User className='w-10 h-10 text-gray-400' />
                                            </div>
                                        )}

                                        {chef.social_link && (
                                            <div className='absolute bottom-[-40px] group-hover:bottom-0 w-full bg-white/40 py-2 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500'>
                                                <a href={chef.social_link} target='_blank' rel='noopener noreferrer' className='cursor-pointer text-lg font-bold hover:text-yellow-500 transition duration-300'>
                                                    <Facebook />
                                                </a>
                                                <a href={chef.social_link} target='_blank' rel='noopener noreferrer' className='cursor-pointer text-lg font-bold hover:text-yellow-500 transition duration-300'>
                                                    <Instagram />
                                                </a>
                                                <a href={chef.social_link} target='_blank' rel='noopener noreferrer' className='cursor-pointer text-lg font-bold hover:text-yellow-500 transition duration-300'>
                                                    <Twitter />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                    <h1 className='text-xl text-gray-800 py-0.5 text-center font-semibold'>{chef.name}</h1>
                                    <p className='text-sm font-semibold text-gray-600 pb-1 text-center'>{chef.post}</p>
                                    {chef.description && (
                                        <div>
                                            <p className='text-sm text-gray-700 text-justify'>{chef.description}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className='flex justify-center gap-2 mt-6'>
                            {chefs.map((chef, index) => (
                                <button
                                    key={chef.id_chef}
                                    onClick={() => scrollToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        activeSlide === index
                                            ? 'bg-yellow-500 scale-110'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default OurChefs;
