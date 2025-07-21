import { service_data } from '../assets/assets/assets';

const Services = () => {
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
                <div className='flex gap-4 px-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory'>
                    {service_data.map((service, index) => (
                        <div 
                            key={index}
                            className={`
                                bg-background-top-light h-36 rounded-md flex items-center justify-center flex-col shadow-md snap-start shrink-0
                                ${index === 0 ? 'w-[75%]' : 'w-[60%]'}
                            `}
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
                            className='w-2 h-2 bg-gray-300 rounded-full'
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Services;