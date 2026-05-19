const TestimonyCart = ({ cart, className = "", style = {} }) => {
    // Adapter les données de l'API à l'affichage
    const name = cart.name || "Client";
    const profession = cart.profession || "Client satisfait";
    const description = cart.description || "";
    const imageUrl = cart.image_url || null;
    const rating = cart.rating || 5; // Par défaut 5 étoiles si non spécifié

    return (
        <div 
            className={`bg-background-top-light backdrop-blur-sm px-6 py-6 md:py-8 rounded-md shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 ${className}`}
            style={style}
        >
            <div className="relative mb-6">
                <div className="text-4xl text-yellow-500/30 absolute -top-2 -left-1">"</div>
                <p className='text-sm md:text-base font-medium text-gray-700 leading-relaxed text-center italic pl-4 pr-2'>
                    {description}
                </p>
                <div className="text-4xl text-yellow-500/30 absolute -bottom-6 right-0">"</div>
            </div>

            <div className='w-full flex items-center gap-4 mt-4'>
                <div className='w-16 h-16 md:w-18 md:h-18 rounded-full overflow-hidden ring-2 ring-yellow-500/20 shadow-md bg-gray-100'>
                    {imageUrl ? (
                        <img 
                            src={imageUrl} 
                            alt={`Photo de ${name}`} 
                            className='w-full h-full object-cover' 
                        />
                    ) : (
                        <div className='w-full h-full flex items-center justify-center text-gray-400'>
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    )}
                </div>

                <div className='flex flex-col items-start'>
                    <h1 className='text-lg md:text-xl text-gray-800 font-semibold leading-tight'>
                        {name}
                    </h1>
                    <p className='text-sm text-yellow-600 font-medium mt-1'>
                        {profession}
                    </p>
                    <div className="flex text-yellow-400 text-sm mt-1">
                        {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonyCart;