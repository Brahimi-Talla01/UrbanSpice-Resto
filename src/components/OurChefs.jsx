import { useState, useEffect, useRef } from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { prof_data } from '../assets/assets/assets';

const OurChefs = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const scrollContainerRef = useRef(null);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;            
            const cardWidth = container.scrollWidth / prof_data.length;
            const scrollLeft = container.scrollLeft;
            const currentIndex = Math.round(scrollLeft / cardWidth);
            setActiveSlide(currentIndex);
        }
    };

    const scrollToSlide = (index) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;            
            const cardWidth = container.scrollWidth / prof_data.length;
            container.scrollTo({
                left: cardWidth * index,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);
   
    return (
        <div className='w-full overflow-hidden'>
            <h1 className='text-2xl text-center py-4 md:pt-8 md:text-4xl font-semibold'> Nos Chefs Professionnels</h1>

            {/* Desktop */}
            <div className='hidden md:grid px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-36 mx-auto gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 py-4 md:py-8'>
                {prof_data.map((service, index) => (
                    <div 
                        key={index}
                        className='bg-background-top-light rounded-md p-4 flex items-center justify-center flex-col shadow-md hover:scale-102 hover:shadow-2xl duration-300 group'
                    >
                        <div className='w-full h-50 rounded overflow-hidden relative group'>
                            <img 
                                src={service.image} 
                                alt={`Chef ${service.name}`} 
                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                            />
                            
                            <div className='absolute bottom-[-40px] group-hover:bottom-0 w-full bg-white/40 py-2 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500'>
                                <a href="#" className='cursor-pointer text-lg font-bold hover:text-yellow-500 transition duration-300'>
                                    <Facebook />
                                </a>
                                <a href="#" className='cursor-pointer text-lg font-bold hover:text-yellow-500 transition duration-300'>
                                    <Instagram />
                                </a>
                                <a href="#" className='cursor-pointer text-lg font-bold hover:text-yellow-500 transition duration-300'>
                                    <Twitter />
                                </a>
                            </div>
                        </div>
                        <h1 className='text-2xl text-gray-800 py-0.5 text-center font-semibold'>{service.name}</h1>
                        <p className='text-sm font-semibold text-gray-600 pb-1 text-center'>{service.post}</p>
                        <div>
                            <p className='text-sm text-gray-700 text-justify'>{service.description}</p>
                        </div>
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
                    {prof_data.map((service, index) => (
                        <div 
                            key={index}
                            className='bg-gray-50 flex-shrink-0 rounded-md p-4 flex items-center justify-center flex-col shadow-md group snap-start'
                            style={{
                                width: 'calc(100vw - 4rem)', 
                                maxWidth: '320px'
                            }}
                        >
                            <div className='w-full h-48 rounded overflow-hidden relative group'>
                                <img 
                                    src={service.image} 
                                    alt={`Chef ${service.name}`} 
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                                />
                                
                                <div className='absolute bottom-[-40px] group-hover:bottom-0 w-full bg-white/40 py-2 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500'>
                                    <a href="#" className='cursor-pointer text-lg font-bold hover:text-yellow-500 transition duration-300'>
                                        <Facebook />
                                    </a>
                                    <a href="#" className='cursor-pointer text-lg font-bold hover:text-yellow-500 transition duration-300'>
                                        <Instagram />
                                    </a>
                                    <a href="#" className='cursor-pointer text-lg font-bold hover:text-yellow-500 transition duration-300'>
                                        <Twitter />
                                    </a>
                                </div>
                            </div>
                            <h1 className='text-xl text-gray-800 py-0.5 text-center font-semibold'>{service.name}</h1>
                            <p className='text-sm font-semibold text-gray-600 pb-1 text-center'>{service.post}</p>
                            <div>
                                <p className='text-sm text-gray-700 text-justify'>{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex justify-center gap-2 mt-6'>
                    {prof_data.map((_, index) => (
                        <button
                            key={index}
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
        </div>
    )
}

export default OurChefs;