import { useState, useRef, useEffect } from 'react';
import { getAllServices } from '../../services/serviceApi';
import { toast } from 'react-toastify';

const Services = () => {

    const [activeSlide, setActiveSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const scrollContainerRe = useRef(null);

    // Calculer l'index du slide actif
    const handleScroll = () => {
        if (scrollContainerRe.current && services.length > 0) {
            const container = scrollContainerRe.current;
            const cardWidth = container.scrollWidth / services.length;
            const scrollLeft = container.scrollLeft;
            const currentIndex = Math.round(scrollLeft / cardWidth);
            setActiveSlide(currentIndex);
        }
    };

    // Charger les services depuis l'API
    const loadServices = async () => {
        try {
            setLoading(true);
            const response = await getAllServices();
            if (response.success && response.services) {
                setServices(response.services);
            }
        } catch (error) {
            console.error("Erreur chargement services:", error);
            toast.error("Erreur lors du chargement des services");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadServices();
    }, []);

    // Attacher l'événement scroll après chargement des services
    useEffect(() => {
        const container = scrollContainerRe.current;
        if (container && services.length > 0) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [services]);

    if (loading) {
        return (
            <div id='services' className='w-full px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-36 mx-auto overflow-hidden'>
                <h1 className='text-2xl text-center py-4 md:pt-8 md:text-4xl font-semibold font-outfit'> Nos services</h1>
                <div className='flex justify-center py-12'>
                    <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500'></div>
                </div>
            </div>
        );
    }

    return (
        <div id='services' className='w-full px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-36 mx-auto overflow-hidden'>
            <h1 className='text-2xl text-center py-4 md:pt-8 md:text-4xl font-semibold font-outfit'> Nos services</h1>

            {/* Desktop */}
            <div className='hidden md:grid px-8 md:px-0 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 py-4 md:py-8'>
                {services.map((service, index) => (
                    <div 
                        key={service.id_service || index}
                        className='bg-background-top-light h-36 rounded-md flex items-center justify-center flex-col shadow-md hover:shadow-lg transition-shadow duration-300'
                    >
                        <div className='w-16 h-16 rounded-full overflow-hidden bg-gray-100'>
                            {service.image_url ? (
                                <img 
                                    src={service.image_url} 
                                    alt={service.title} 
                                    className='w-full h-full object-cover' 
                                />
                            ) : (
                                <div className='w-full h-full flex items-center justify-center text-gray-400'>
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <h1 className='text-xl text-light font-open font-semibold mt-2'>{service.title}</h1>
                    </div>
                ))}
            </div>

            {/* Mobile - Carrousel */}
            <div className='md:hidden py-4 md:py-8'>
                {services.length > 0 ? (
                    <>
                        <div
                            ref={scrollContainerRe}
                            className='flex gap-3 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory'
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none'
                            }}
                        >
                            {services.map((service, index) => (
                                <div 
                                    key={service.id_service || index}
                                    className={`
                                        bg-background-top-light h-36 rounded-md flex items-center justify-center flex-col shadow-md snap-start shrink-0
                                        ${index === 0 ? 'w-[75%]' : 'w-[60%]'}
                                    `}
                                    style={{
                                        width: 'calc(100vw - 4rem)', 
                                        maxWidth: '600px' 
                                    }}
                                >
                                    <div className='w-16 h-16 rounded-full overflow-hidden bg-gray-100'>
                                        {service.image_url ? (
                                            <img 
                                                src={service.image_url} 
                                                alt={service.title} 
                                                className='w-full h-full object-cover' 
                                            />
                                        ) : (
                                            <div className='w-full h-full flex items-center justify-center text-gray-400'>
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <h1 className='text-xl text-light font-open font-semibold text-center px-2 mt-2'>{service.title}</h1>
                                </div>
                            ))}
                        </div>

                        {/* Indicateurs de défilement */}
                        {services.length > 1 && (
                            <div className='flex justify-center gap-2 mt-4'>
                                {services.map((_, index) => (
                                    <div 
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            activeSlide === index 
                                                ? 'bg-yellow-500 scale-110' 
                                                : 'bg-gray-300 hover:bg-gray-400'
                                        }`} 
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className='text-center py-12 text-gray-500'>
                        Aucun service disponible pour le moment.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Services;