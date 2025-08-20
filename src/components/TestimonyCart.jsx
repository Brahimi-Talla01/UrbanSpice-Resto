const TestimonyCart = ({ cart, className = "", style = {} }) => {
    return (
        <div 
            className={`bg-background-top-light backdrop-blur-sm px-6 py-6 md:py-8 rounded-md shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 ${className}`}
            style={style}
        >
            <div className="relative mb-6">
                <div className="text-4xl text-yellow-500/30 absolute -top-2 -left-1">"</div>
                <p className='text-sm md:text-base font-medium text-gray-700 leading-relaxed text-center italic pl-4 pr-2'>
                    {cart.description}
                </p>
                <div className="text-4xl text-yellow-500/30 absolute -bottom-6 right-0">"</div>
            </div>

            <div className='w-full flex items-center gap-4 mt-4'>
                <div className='w-16 h-16 md:w-18 md:h-18 rounded-full overflow-hidden ring-2 ring-yellow-500/20 shadow-md'>
                    <img 
                        src={cart.image} 
                        alt={`Photo de ${cart.name}`} 
                        className='w-full h-full object-cover' 
                    />
                </div>

                <div className='flex flex-col items-start'>
                    <h1 className='text-lg md:text-xl text-gray-800 font-semibold leading-tight'>
                        {cart.name}
                    </h1>
                    <p className='text-sm text-yellow-600 font-medium mt-1'>
                        {cart.profession}
                    </p>
                    <div className="flex text-yellow-400 text-sm mt-1">
                        ★★★★★
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestimonyCart;