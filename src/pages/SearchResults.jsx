// frontend/src/pages/SearchResults.jsx
// Page de résultats de recherche — ?q=... (filtrage client sur storeMenus,
// source de vérité = menus publiés de la BDD chargés par StoreContext)
import { useContext, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Utensils } from 'lucide-react';
import { StoreContext } from '../contexts/StoreContext';
import FoodList from '../components/FoodList';

// Normalisation : minuscules + sans accents (« Ndolè » ↔ « ndole »)
const normalizeText = (text) =>
    String(text ?? '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

const SearchResults = () => {
    const { storeMenus } = useContext(StoreContext);
    const [searchParams] = useSearchParams();
    const query = (searchParams.get('q') || '').trim();

    // Résultats : titre OU catégorie correspondant à la requête
    const results = useMemo(() => {
        const term = normalizeText(query);
        if (!term) return [];
        return storeMenus.filter(
            (menu) =>
                normalizeText(menu.title).includes(term) ||
                normalizeText(menu.category).includes(term)
        );
    }, [storeMenus, query]);

    // Alternatives si aucun résultat : les 4 mieux notés
    const suggestions = useMemo(() => {
        if (results.length > 0 || storeMenus.length === 0) return [];
        return [...storeMenus]
            .sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0))
            .slice(0, 4);
    }, [results.length, storeMenus]);

    return (
        <div className='w-full px-4 sm:px-8 md:px-16 lg:px-24 2xl:px-36 max-w-screen-2xl mx-auto py-12 min-h-[60vh]'>

            {/* En-tête : requête + compteur */}
            <div className='mb-8'>
                <h1 className='text-3xl md:text-4xl font-bold font-outfit text-gray-900'>
                    Résultats de recherche
                </h1>
                {query && (
                    <p className='text-gray-600 mt-2 flex items-center gap-2'>
                        <Search className='w-5 h-5 text-orange-500' />
                        {results.length > 0 ? (
                            <span>
                                <span className='font-semibold text-gray-900'>{results.length}</span>
                                {' '}{results.length > 1 ? 'plats trouvés' : 'plat trouvé'} pour « {query} »
                            </span>
                        ) : (
                            <span>Aucun plat trouvé pour « {query} »</span>
                        )}
                    </p>
                )}
            </div>

            {/* Grille de résultats (même composant que la page carte) */}
            {results.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {results.map((menu) => (
                        <FoodList
                            key={menu.id_menu ?? menu.id}
                            card={menu}
                            id={menu.id_menu ?? menu.id}
                        />
                    ))}
                </div>
            ) : (
                /* État vide : suggestions alternatives */
                <div className='text-center py-12'>
                    <div className='w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <Utensils className='w-8 h-8 text-orange-400' />
                    </div>
                    <p className='text-lg text-gray-600 mb-2'>
                        Aucun plat ne correspond à votre recherche.
                    </p>
                    <p className='text-sm text-gray-400 mb-8'>
                        Essayez un autre mot-clé ou parcourez nos suggestions.
                    </p>

                    {suggestions.length > 0 && (
                        <div className='max-w-3xl mx-auto'>
                            <h2 className='text-lg font-semibold text-gray-900 mb-4'>Nos plats les mieux notés</h2>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                                {suggestions.map((menu) => (
                                    <FoodList
                                        key={menu.id_menu ?? menu.id}
                                        card={menu}
                                        id={menu.id_menu ?? menu.id}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <Link
                        to='/'
                        className='inline-block mt-8 px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl'
                    >
                        Voir tout le menu
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
