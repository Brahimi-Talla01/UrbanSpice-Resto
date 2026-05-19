import { useEffect, useState } from 'react'
import FoodList from './FoodList';
import { getPublishedMenus } from '../../services/menuApi';
import { ToastContainer } from 'react-toastify';

const FoodDisplay = () => {

    const [showFilters, setShowFilters]   = useState(false);
    const [menuFilter, setMenuFilter]     = useState("All");
    const [minPrice, setMinPrice]         = useState("");
    const [maxPrice, setMaxPrice]         = useState("");
    const [menus, setMenus]               = useState([]);
    const [loading, setLoading]           = useState(true);

    const handleChange = (e) => {
        setMenuFilter(e.target.value);
        setShowFilters(false);
    };

    const handleMinPriceChange = (e) => setMinPrice(e.target.value);
    const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);

    const loadMenus = async () => {
        try {
            setLoading(true);
            const response = await getPublishedMenus();
            if (response.success && response.menus) {
                setMenus(response.menus);
            }
        } catch (error) {
            console.error("Erreur chargement menus:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMenus();
    }, []);

    useEffect(() => {
        document.body.style.overflow = showFilters ? "hidden" : "auto";
    }, [showFilters]);

    const getFilterMenu = () => {
        return menus.filter((dish) => {
            // ✅ CORRECTION : l'API retourne 'category', pas 'menu'
            // AVANT : dish.menu === menuFilter → toujours false car dish.menu n'existe pas
            // APRÈS : dish.category === menuFilter
            const matchesCategory =
                menuFilter === "All" || dish.category === menuFilter;

            const price = parseFloat(dish.price) || 0;
            const matchesMinPrice = minPrice === "" || price >= parseFloat(minPrice);
            const matchesMaxPrice = maxPrice === "" || price <= parseFloat(maxPrice);

            return matchesCategory && matchesMinPrice && matchesMaxPrice;
        });
    };

    const moment_of_the_day = ["Petit-déjeuner", "Déjeuner", "Dîner", "Brunch"];
    const type_of_dish      = ["Plats principaux", "Accompagnements", "Boissons", "Desserts"];
    const culinary_origin   = ["Cuisine locale", "Cuisine occidentale", "Cuisine saine", "Cuisine gourmande"];

    const FilterIcon = () => (
        <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
            <div className="w-full h-0.5 bg-gray-600"></div>
            <div className="w-3/4 h-0.5 bg-gray-600"></div>
            <div className="w-1/2 h-0.5 bg-gray-600"></div>
        </div>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                    <p className="text-gray-500">Chargement des menus...</p>
                </div>
            </div>
        );
    }

    const filteredMenus = getFilterMenu();

    return (
        <div className='w-full relative'>

            {showFilters && (
                <div
                    className='md:hidden fixed inset-0 bg-black/30 z-40'
                    onClick={() => setShowFilters(false)}
                />
            )}

            <div className='grid grid-cols-4 gap-4 px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-36 mx-auto mb-8 mt-24 md:mt-8'>

                {/* Btn filter mobile */}
                <div className='absolute -top-16 right-4 sm:right-8 md:right-32 md:hidden flex items-center gap-2'>
                    <h1 className='uppercase font-semibold text-xl font-outfit text-light'>Filtrer les menus</h1>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className='p-2 w-10 h-10 cursor-pointer rounded-md bg-gray-100 hover:bg-gray-200 transition-colors'
                    >
                        <FilterIcon />
                    </button>
                </div>

                {/* Filter section - Desktop */}
                <div className={`hidden md:flex md:col-start-1 md:col-span-1 w-full z-10 flex-col bg-background-top-light p-4 rounded-lg`}>
                    <h1 className='uppercase font-semibold text-xl font-outfit text-light mb-4'>Filtrer les menus</h1>

                    {/* Reset */}
                    <div className="flex items-center gap-3 pl-2 pr-4 py-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <input
                            type="radio"
                            id="reset"
                            name="filterGroup"
                            value="All"
                            checked={"All" === menuFilter}
                            onChange={() => setMenuFilter("All")}
                            className="w-4 h-4 accent-yellow-500 cursor-pointer"
                        />
                        <label htmlFor="reset" className="text-sm cursor-pointer w-full">
                            Tous les menus
                        </label>
                    </div>

                    <h1 className='text-lg font-semibold font-outfit py-2'>Moment de la journée :</h1>
                    <div className="space-y-2">
                        {moment_of_the_day.map((moment, index) => (
                            <div key={index} className="flex items-center gap-3 pl-2 pr-4 py-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                                <input
                                    type="radio"
                                    id={`moment-${index}`}
                                    name="filterGroup"
                                    value={moment}
                                    checked={moment === menuFilter}
                                    onChange={handleChange}
                                    className="w-4 h-4 accent-yellow-500 cursor-pointer"
                                />
                                <label htmlFor={`moment-${index}`} className="text-sm cursor-pointer w-full">
                                    {moment}
                                </label>
                            </div>
                        ))}
                    </div>

                    <h1 className='text-lg font-semibold font-outfit py-2'>Type de plats :</h1>
                    <div className="space-y-2">
                        {type_of_dish.map((dish, index) => (
                            <div key={index} className="flex items-center gap-3 pl-2 pr-4 py-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                                <input
                                    type="radio"
                                    id={`dish-${index}`}
                                    name="filterGroup"
                                    value={dish}
                                    checked={dish === menuFilter}
                                    onChange={handleChange}
                                    className="w-4 h-4 accent-yellow-500 cursor-pointer"
                                />
                                <label htmlFor={`dish-${index}`} className="text-sm cursor-pointer w-full">
                                    {dish}
                                </label>
                            </div>
                        ))}
                    </div>

                    <h1 className='text-lg font-semibold font-outfit py-2'>Origine culinaire :</h1>
                    <div className="space-y-2">
                        {culinary_origin.map((culinary, index) => (
                            <div key={index} className="flex items-center gap-3 pl-2 pr-4 py-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                                <input
                                    type="radio"
                                    id={`culinary-${index}`}
                                    name="filterGroup"
                                    value={culinary}
                                    checked={culinary === menuFilter}
                                    onChange={handleChange}
                                    className="w-4 h-4 accent-yellow-500 cursor-pointer"
                                />
                                <label htmlFor={`culinary-${index}`} className="text-sm cursor-pointer w-full">
                                    {culinary}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Filtre prix */}
                    <div className='py-2'>
                        <h1 className='text-lg font-semibold font-outfit py-2'>Prix :</h1>
                        <div className='flex items-center gap-2 justify-between w-full'>
                            <div className='flex flex-col items-start font-open'>
                                <label className="text-sm">Min (XAF) :</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={minPrice}
                                    onChange={handleMinPriceChange}
                                    className='bg-white rounded border border-amber-400 w-24 outline-blue-600 px-1 py-0.5'
                                />
                            </div>
                            <div className='flex flex-col items-start font-open'>
                                <label className="text-sm">Max (XAF) :</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                    className='bg-white rounded border border-amber-400 px-1 w-24 outline-blue-600 py-0.5'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu section */}
                <div className='col-start-1 col-span-4 md:col-start-2 md:col-span-3 w-full bg-background-top-light rounded-lg p-4'>

                    {filteredMenus.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <p className="text-xl font-semibold mb-2">Aucun menu disponible</p>
                            <p className="text-sm">
                                {menuFilter !== "All"
                                    ? `Aucun plat dans la catégorie "${menuFilter}"`
                                    : "Aucun menu publié pour le moment"}
                            </p>
                        </div>
                    ) : (
                        <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                            {filteredMenus.map((card) => (
                                <FoodList
                                    key={card.id_menu}
                                    card={card}
                                    id={card.id_menu}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default FoodDisplay;
