import { useState, useRef, useEffect } from 'react';
import { assets, testimonie_data } from '../assets/assets/assets';
import TestimonyCart from './TestimonyCart';

const Testimony = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const scrollTestRef = useRef(null);

    const handleScroll = () => {
        if (scrollTestRef.current) {
            const container = scrollTestRef.current;
            const cardWidth = container.scrollWidth / testimonie_data.length;
            const scrollLeft = container.scrollLeft;
            const currentIndex = Math.round(scrollLeft / cardWidth);
            setActiveSlide(currentIndex);
        }
    };

    const scrollToSlide = (index) => {
        if (scrollTestRef.current) {
            const container = scrollTestRef.current;            
            const cardWidth = container.scrollWidth / testimonie_data.length;
            container.scrollTo({
                left: cardWidth * index,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const container = scrollTestRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div className='w-full h-100 md:h-130 relative my-8 overflow-hidden'>

            <div className='w-full h-full absolute inset-0'>
                <img 
                    src={assets.urbanSpice}
                    alt="UrbanSpice" 
                    className='w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000' 
                />
            </div>

            <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60'/>

            <div className='absolute top-0 md:top-5 left-1/2 transform -translate-x-1/2 w-full md:px-8 lg:px-24 max-w-screen-2xl mx-auto overflow-hidden'>
                <div className="text-center py-8">
                    <h1 className='text-xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg'>
                        Ce que nos clients disent de nous !
                    </h1>
                    <div className=" hidden md:flex w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
                </div>

                {/* Desktop */}
                <div className='hidden md:grid px-8 md:px-0 gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 py-4 md:py-8'>
                    {testimonie_data.map((testimony, index) => (
                        <TestimonyCart 
                            key={index}
                            cart={testimony} 
                        />
                    ))}
                </div>

                {/* Mobile */}
                <div className='md:hidden py-2 md:py-8'>
                    <div 
                        ref={scrollTestRef}
                        className='flex gap-4 px-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory'
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {testimonie_data.map((testimony, index) => (
                            <TestimonyCart 
                                key={index}
                                cart={testimony}
                                className="flex-shrink-0 snap-start"
                                style={{
                                    width: 'calc(100vw - 1.5rem)', 
                                    maxWidth: '600px' 
                                }}
                            />
                        ))}
                    </div>

                    <div className='flex justify-center gap-3 mt-8'>
                        {testimonie_data.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    activeSlide === index 
                                        ? 'bg-yellow-500 scale-125 shadow-lg shadow-yellow-500/50' 
                                        : 'bg-white/50 hover:bg-white/70 hover:scale-110'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default Testimony;