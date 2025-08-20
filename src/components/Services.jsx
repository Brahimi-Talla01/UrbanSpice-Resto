import { useState, useRef, useEffect } from 'react';
import { service_data } from '../assets/assets/assets';

const Services = () => {

    const [activeSlide, setActiveSlide] = useState(0);
    const scrollContainerRe = useRef(null);

    const handleScroll = () => {
        if (scrollContainerRe.current) {
            const container = scrollContainerRe.current;
            const cardWidth = container.scrollWidth / service_data.length;
            const scrollLeft = container.scrollLeft;
            const currentIndex = Math.round(scrollLeft / cardWidth);
            setActiveSlide(currentIndex);
        }
    };

    useEffect(() => {
        const container = scrollContainerRe.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);


    return (
        <div className='w-full md:px-8 lg:px-24 max-w-screen-2xl mx-auto overflow-hidden'>
            <h1 className='text-2xl text-center py-4 md:pt-8 md:text-4xl font-semibold font-outfit'> Nos services</h1>

            {/* Desktop */}
            <div className='hidden md:grid px-8 md:px-0 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 py-4 md:py-8'>
                {service_data.map((service, index) => (
                    <div 
                        key={index}
                        className='bg-background-top-light h-36 rounded-md flex items-center justify-center flex-col shadow-md'
                    >
                        <div className='w-16 h-16 rounded-full overflow-hidden'>
                            <img src={service.image} alt={`Service ${index + 1}`} className='w-full h-full bg-cover' />
                        </div>
                        <h1 className='text-xl text-light font-open font-semibold'>{service.title}</h1>
                    </div>
                ))}
            </div>

            {/* Mobile */}
            <div className='md:hidden py-4 md:py-8'>
                <div
                    ref={scrollContainerRe}
                    className='flex gap-3 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory'
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {service_data.map((service, index) => (
                        <div 
                            key={index}
                            className={`
                                bg-background-top-light h-36 rounded-md flex items-center justify-center flex-col shadow-md snap-start shrink-0
                                ${index === 0 ? 'w-[75%]' : 'w-[60%]'}
                            `}
                            style={{
                                width: 'calc(100vw - 4rem)', 
                                maxWidth: '600px' 
                            }}
                        >
                            <div className='w-16 h-16 rounded-full overflow-hidden'>
                                <img src={service.image} alt={`Service ${index + 1}`} className='w-full h-full bg-cover' />
                            </div>
                            <h1 className='text-xl text-light font-open font-semibold text-center px-2'>{service.title}</h1>
                        </div>
                    ))}
                </div>

                {/* Indicateurs de défilement */}
                <div className='flex justify-center gap-2 mt-4'>
                    {service_data.map((_, index) => (
                        <div 
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                activeSlide === index 
                                    ? 'bg-yellow-500 scale-110' 
                                    : 'bg-gray-300 hover:bg-gray-400'
                        }`} />    
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Services;