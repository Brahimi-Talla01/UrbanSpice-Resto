import { service_data } from '../assets/assets/assets';

const Services = () => {
    return (
        <div className='w-full md:px-8 lg:px-24 max-w-screen-2xl mx-auto overflow-hidden'>
            <h1 className='text-2xl text-center py-4 md:pt-8 md:text-4xl font-semibold font-outfit'> Nos services</h1>

            <div className='grid px-8 md:px-0 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 py-4 md:py-8'>
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
        </div>
    )
}

export default Services;
