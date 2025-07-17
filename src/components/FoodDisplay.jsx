import { useEffect, useState } from 'react'
import { X } from 'lucide-react';
import FoodList from './FoodList';
import { card_menu } from '../assets/assets/assets';

const FoodDisplay = () => {

    const [showFilters, setShowFilters] = useState(false);
    const [menuFilter, setMenuFilter] = useState("All");

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleChange = (e) => {
        setMenuFilter(e.target.value);
        setShowFilters(false);
    }

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
    }

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
    }

    const getFilterMenu = () => {
        return card_menu
        .filter((dish) => {

            // Filtre par catégorie de menu
            const matchesCategory = menuFilter === "All" || menuFilter === dish.menu;
            
            // Filtre par prix minimum
            const matchesMinPrice = minPrice === "" || (dish.price).split(' ')[0] >= parseFloat(minPrice);
            
            // Filtre par prix maximum
            const matchesMaxPrice = maxPrice === "" || (dish.price).split(' ')[0] <= parseFloat(maxPrice);
            
            return matchesCategory && matchesMinPrice && matchesMaxPrice;
        })
        .slice(0, menuFilter === "All" && minPrice === "" && maxPrice === "" ? 9 : undefined);
    }

    useEffect(() => {
        if (showFilters) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [showFilters]);

    const moment_of_the_day = ["Petit-déjeuner", "Déjeuner", "Diner", "Brunch"];
    const type_of_dish = ["Plats principaux", "Accompagnements", "Boisson", "Desserts"];
    const culinary_origin = ["Cuisine locale", "Cuisine occidentale", "Cuisine saine", "Cuisine gourmande"];

    // Icône de filtre avec du CSS
    const FilterIcon = () => (
        <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
            <div className="w-full h-0.5 bg-gray-600"></div>
            <div className="w-3/4 h-0.5 bg-gray-600"></div>
            <div className="w-1/2 h-0.5 bg-gray-600"></div>
        </div>
    );

    return (
        <div className='w-full relative'>
            {/* Overlay pour mobile */}
            {showFilters && (
                <div 
                    className='md:hidden fixed inset-0 bg-black/30 bg-opacity-50 z-40'
                    onClick={() => setShowFilters(false)}
                />
            )}

            <div className='grid grid-cols-4 gap-4 px-4 sm:px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto mb-8 mt-24 md:mt-8'>

                {/*Btn filter pour mobile */}
                <div className='absolute -top-16 right-4 sm:right-8 md:right-32 md:hidden flex items-center gap-2'>
                    <h1 className='uppercase font-semibold text-xl font-outfit text-light'>Filtrer les menus</h1>
                    <button
                        onClick={() => setShowFilters(!showFilters)} 
                        className='p-2 w-10 h-10 cursor-pointer rounded-md bg-gray-100 hover:bg-gray-200 transition-colors'
                    >
                        <FilterIcon />
                    </button>
                </div>

                {/*Filter section - Desktop */}
                <div className={`hidden md:flex md:col-start-1 md:col-span-1 w-full z-10 flex-col bg-background-top-light p-4 rounded-lg`}>
                    <h1 className='uppercase font-semibold text-xl font-outfit text-light mb-4'>Filtrer les menus</h1>

                    {/*Cancel Filter */}
                    <div
                        className="flex items-center gap-3 pl-2 pr-4 py-1 rounded-md bg-white/60 hover:bg-white transition-colors cursor-pointer"
                    >
                        <input
                            type="radio"
                            id="reset"
                            name="reset"
                            value="Tout"
                            checked={"All" === menuFilter}
                            onChange={() => setMenuFilter("All")}
                            className="w-4 h-4 text-blue-600 accent-blue-500 cursor-pointer"
                        />
                        <label
                            htmlFor="reset"
                            className="text-sm cursor-pointer w-full"
                        >
                            Tout les menus
                        </label>
                    </div>

                    <h1 className='text-lg font-semibold font-outfit py-2'>Moment de la journée :</h1>
                    <div className="space-y-2">
                        {moment_of_the_day.map((moment, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 pl-2 pr-4 py-1 rounded-md bg-white/60 hover:bg-white transition-colors cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    id={`moment-${index}`}
                                    name="moment"
                                    value={moment}
                                    checked={moment === menuFilter}
                                    onChange={(e) => handleChange(e)}
                                    className="w-4 h-4 text-blue-600 accent-blue-500 cursor-pointer"
                                />
                                <label
                                    htmlFor={`moment-${index}`}
                                    className="text-sm cursor-pointer w-full"
                                >
                                    {moment}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className='py-2'>
                        <h1 className='text-lg font-semibold font-outfit py-2'>Type de plats :</h1>
                        <div className="space-y-2">
                            {type_of_dish.map((dish, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 pl-2 pr-4 py-1 rounded-md bg-white/60 hover:bg-white transition-colors cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        id={`dish-${index}`}
                                        name="dish"
                                        value={dish}
                                        checked={dish === menuFilter}
                                        onChange={(e) => handleChange(e)}
                                        className="w-4 h-4 text-blue-600 accent-blue-500 cursor-pointer"
                                    />
                                    <label
                                        htmlFor={`dish-${index}`}
                                        className="text-sm cursor-pointer w-full"
                                    >
                                        {dish}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='mb-2'>
                        <h1 className='text-lg font-semibold font-outfit py-2'>Origine culinaire :</h1>
                        <div className="space-y-2">
                            {culinary_origin.map((culinary, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 pl-2 pr-4 py-1 rounded-md bg-white/60 hover:bg-white transition-colors cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        id={`culinary-${index}`}
                                        name="culinary"
                                        value={culinary}
                                        checked={culinary === menuFilter}
                                        onChange={(e) => handleChange(e)}
                                        className="w-4 h-4 text-blue-600 accent-blue-500 cursor-pointer"
                                    />
                                    <label
                                        htmlFor={`culinary-${index}`}
                                        className="text-sm cursor-pointer w-full"
                                    >
                                        {culinary}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form>
                        <h1 className='text-lg font-semibold font-outfit py-2'>Prix :</h1>
                        <div className='flex items-center gap-2 justify-between w-full'>

                            <div className='flex flex-col items-start font-open'>
                                <label>Min(XAF) :</label>
                                <input 
                                    type="number" 
                                    min={0}
                                    value={minPrice}
                                    placeholder='0'
                                    onChange={handleMinPriceChange}
                                    className='bg-white rounded border border-amber-400 w-24 outline-blue-600 px-1 py-0.5'
                                />
                            </div>

                            <div className='flex flex-col items-start font-open'>
                                <label>Max(XAF) :</label>
                                <input 
                                    type="number" 
                                    min={0}
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange} 
                                    placeholder='0'
                                    className='bg-white rounded border border-amber-400 px-1 w-24 outline-blue-600 py-0.5'
                                />
                            </div>

                        </div>
                    </form>

                </div>

                {/*Filter section - Mobile Sliding Panel */}
                <div className={`md:hidden fixed top-0 right-0 h-full w-4/5 bg-background-top-light z-50 transform transition-transform duration-300 ease-in-out ${
                    showFilters ? 'translate-x-0' : 'translate-x-full'
                } shadow-2xl`}>
                    
                    {/* Header avec bouton fermer */}
                    <div className='flex items-center justify-between p-4 border-b border-gray-200'>
                        <h1 className='uppercase font-semibold text-xl font-outfit text-light'>Filtrer les menus</h1>
                        <button
                            onClick={() => setShowFilters(false)}
                            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                        >
                            <X className='w-6 h-6 text-gray-600' />
                        </button>
                    </div>

                    {/* Contenu des filtres */}
                    <div className='p-4 overflow-y-auto h-full pb-20'>

                        {/*Cancel Filter */}
                        <div className='mb-6'>
                            <div
                                className="flex items-center gap-3 pl-2 pr-4 py-1 rounded-md bg-white/60 hover:bg-white transition-colors cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    id="reset-mobile"
                                    name="reset-mobile"
                                    value="Tout-mobile"
                                    checked={"All" === menuFilter}
                                    onChange={() => setMenuFilter("All")}
                                    className="w-4 h-4 text-blue-600 accent-blue-500 cursor-pointer"
                                />
                                <label
                                    htmlFor="reset-mobile"
                                    className="text-sm cursor-pointer w-full"
                                >
                                    Tout les menus
                                </label>
                            </div>
                        </div>

                        <div className='mb-6'>
                            <h1 className='text-lg font-semibold font-outfit py-2'>Moment de la journée :</h1>
                            <div className="space-y-2">
                                {moment_of_the_day.map((moment, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 pl-2 pr-4 py-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            id={`moment-mobile-${index}`}
                                            name="moment-mobile"
                                            value={moment}
                                            checked={moment === menuFilter}
                                            onChange={(e) => handleChange(e)}
                                            className="w-4 h-4 text-blue-600 accent-blue-500 cursor-pointer"
                                        />
                                        <label
                                            htmlFor={`moment-mobile-${index}`}
                                            className="text-base cursor-pointer w-full"
                                        >
                                            {moment}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='mb-6'>
                            <h1 className='text-lg font-semibold font-outfit py-2'>Type de plats :</h1>
                            <div className="space-y-2">
                                {type_of_dish.map((dish, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 pl-2 pr-4 py-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            id={`dish-mobile-${index}`}
                                            name="dish-mobile"
                                            value={dish}
                                            checked={dish === menuFilter}
                                            onChange={(e) => handleChange(e)}
                                            className="w-4 h-4 text-blue-600 accent-blue-500 cursor-pointer"
                                        />
                                        <label
                                            htmlFor={`dish-mobile-${index}`}
                                            className="text-base cursor-pointer w-full"
                                        >
                                            {dish}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='mb-6'>
                            <h1 className='text-lg font-semibold font-outfit py-2'>Origine culinaire :</h1>
                            <div className="space-y-2">
                                {culinary_origin.map((culinary, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 pl-2 pr-4 py-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            id={`culinary-mobile-${index}`}
                                            name="culinary-mobile"
                                            value={culinary}
                                            checked={culinary === menuFilter}
                                            onChange={(e) => handleChange(e)}
                                            className="w-4 h-4 text-blue-600 accent-blue-500 cursor-pointer"
                                        />
                                        <label
                                            htmlFor={`culinary-mobile-${index}`}
                                            className="text-base cursor-pointer w-full"
                                        >
                                            {culinary}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form className='mb-6'>
                            <h1 className='text-lg font-semibold font-outfit py-2'>Prix :</h1>
                            <div className='flex items-center gap-2 justify-between w-full'>

                                <div className='flex flex-col items-start font-open'>
                                    <label>Min(XAF) :</label>
                                    <input 
                                        type="number" 
                                        min={0} 
                                        className='bg-white rounded border border-amber-400 w-24 outline-blue-600 px-1 py-0.5'
                                    />
                                </div>

                                <div className='flex flex-col items-start font-open'>
                                    <label>Max(XAF) :</label>
                                    <input 
                                        type="number" 
                                        min={0} 
                                        className='bg-white rounded border border-amber-400 px-1 w-24 outline-blue-600 py-0.5'
                                    />
                                </div>

                            </div>
                        </form>

                    </div>
                </div>
                
                {/*Menu section */}
                <div className='col-start-1 col-span-4 md:col-start-2 md:col-span-3 w-full bg-background-top-light rounded-lg p-4'>

                    <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>

                        {getFilterMenu().map((card) => (
                                <FoodList
                                    key={card.id}
                                    card={card}
                                /> 
                        ))}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default FoodDisplay;
