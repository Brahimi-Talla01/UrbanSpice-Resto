// Slides
import slideMain from './Img-slide.jpg';
import slide1 from './img-slider1.jpeg';
import slide2 from './img-slider2.jpeg';
import slide3 from './Img-slider3.jpeg';
import slide4 from './Img-slider4.jpeg';
import slide5 from './Img-slider5.jpg';
import slide6 from './Img-slider6.webp';
import slideMain2 from './header_img.png';
import slideMain3 from './slideMain1.jpg';

//Logo
import logo from './food-restaurant.png';

// Services
import service1 from './Img-livraison.jpeg';
import service1NoBg from './Img-livraison1.png';
import service7 from './commande1.jpeg';

// Déjeuners
import dejeunerIcon from './icon-dejeuner.jpeg';
import dejeunerImg from './Img-dejeuner.jpeg';
import dejeunerImg2 from './Img-dejeuner2.jpeg';
import dejeunerPng from './Img-dejeune.png';
import dejeunerNoBg from './Img-dejeune2.png';
import dejeuner2NoBg from './Img-dejeuner2-removebg-preview.png';

// Dîners
import diner1 from './Img-diner.jpeg';
import diner2 from './Img-diner2.jpeg';

// Cartes
import card1 from './Img-card.jpeg';
import card2 from './Img-card2.jpeg';
import card3 from './Img-card3.jpeg';
import card4 from './Img-card4.jpeg';
import card5 from './Img-card5.jpeg';

//Testimony
import test1 from './images.jpeg';
import filter_icon from './menu.png';
import rating_start from './rating_starts.png';

// Image pour le menu
import accompagnement1 from './acc1.jpeg';
import accompagnement2 from './acc2.jpeg';
import boisson1 from './boisson1.jpeg';
import boisson2 from './boisson2.jpeg';
import brunch1 from './brunch1.jpeg';
import brunch2 from './brunch2.jpeg';
import dej1 from './dej1.jpeg';
import dej2 from './dej2.jpeg';
import dessert1 from './dessert1.jpeg';
import dessert2 from './dessert2.jpeg';
import din1 from './diner1.jpeg';
import din2 from './diner2.jpeg';
import gourmande1 from './gour1.jpeg';
import gourmande2 from './gour2.jpeg';
import locale1 from './locale1.jpeg';
import locale2 from './locale2.jpeg';
import occidentale1 from './occ1.jpeg';
import occidentale2 from './occ2.jpeg';
import petdej1 from './petitdej1.jpeg';
import petdej2 from './petitdej2.jpeg';
import saine1 from './saine1.jpeg';
import saine2 from './saine2.png';

export const assets = {
    slideMain,
    slideMain2,
    slideMain3,

    slide1,
    slide2,
    slide3,
    slide4,
    slide5,
    slide6,
    service1NoBg,
    service1,

    logo,

    dejeuner2NoBg,
    dejeunerIcon,
    dejeunerImg,
    dejeunerImg2,
    dejeunerPng,
    dejeunerNoBg,

    diner1,
    diner2,

    card1,
    card2,
    card3,
    card4,
    card5,

    filter_icon,
}

export const service_data =[
    {
        "image": service1,
        "title":"Livraison",
    },
    {
        "image": service7,
        "title":"Commande",
    },
    {
        "image": dej1,
        "title":"Pétit Déjeuner",
    },
    {
        "image": dejeunerImg,
        "title":"Déjeuner",
    },
    {
        "image": diner1,
        "title":"Diner",
    },
];

export const card_menu = [
    {
        id: "1",
        image: petdej1,
        menu: "Petit-déjeuner",
        title: "Croc Monsieur",
        price: "3000 XAF",
        start: rating_start,
        description: "Un délicieux croque monsieur croustillant, garni de jambon et fromage."
    },
    {
        id: "2",
        image: dej1,
        menu: "Déjeuner",
        title: "Déjeuner healthy",
        price: "500 XAF",
        start: rating_start,
        description: "Un repas équilibré et sain, parfait pour une pause déjeuner légère."
    },
    {
        id: "3",
        image: din1,
        menu: "Diner",
        title: "Plat de salade",
        price: "3000 XAF",
        start: rating_start,
        description: "Un bol de salade fraîche avec légumes croquants et vinaigrette maison."
    },
    {
        id: "4",
        image: brunch1,
        menu: "Brunch",
        title: "Brunch",
        price: "3000 XAF",
        start: rating_start,
        description: "Un assortiment parfait de douceurs et de salé pour vos matins détendus."
    },
    {
        id: "5",
        image: locale1,
        menu: "Cuisine locale",
        title: "Plat de ndolé",
        price: "500 XAF",
        start: rating_start,
        description: "Le classique ndolé camerounais accompagné de viande ou crevettes."
    },
    {
        id: "6",
        image: occidentale1,
        menu: "Cuisine occidentale",
        title: "Viande rotis",
        price: "3000 XAF",
        start: rating_start,
        description: "Viande rôtie lentement au four avec herbes aromatiques et légumes."
    },
    {
        id: "7",
        image: petdej2,
        menu: "Petit-déjeuner",
        title: "Pain + Oeuf",
        price: "2000 XAF",
        start: rating_start,
        description: "Un petit-déjeuner simple et nourrissant à base de pain grillé et œuf."
    },
    {
        id: "8",
        image: din2,
        menu: "Diner",
        title: "Riz parfumé",
        price: "3500 XAF",
        start: rating_start,
        description: "Riz délicatement parfumé accompagné de légumes sautés."
    },
    {
        id: "9",
        image: accompagnement1,
        menu: "Accompagnements",
        title: "Plat de foutou",
        price: "3500 XAF",
        start: rating_start,
        description: "Foutou traditionnel accompagné d’une sauce riche et savoureuse."
    },
    {
        id: "10",
        image: accompagnement2,
        menu: "Accompagnements",
        title: "Wata fufu",
        price: "3500 XAF",
        start: rating_start,
        description: "Wata fufu accompagné de sauce claire aux arômes épicés."
    },
    {
        id: "11",
        image: occidentale2,
        menu: "Cuisine occidentale",
        title: "Petit dejeuner",
        price: "3500 XAF",
        start: rating_start,
        description: "Petit déjeuner copieux avec viennoiseries, fruits et boissons chaudes."
    },
    {
        id: "12",
        image: saine1,
        menu: "Cuisine saine",
        title: "Cuisine saine",
        price: "3500 XAF",
        start: rating_start,
        description: "Repas nutritif et équilibré pour garder la forme toute la journée."
    },
    {
        id: "13",
        image: saine2,
        menu: "Cuisine saine",
        title: "Cuisine saine",
        price: "3500 XAF",
        start: rating_start,
        description: "Une combinaison de produits frais pour une alimentation saine."
    },
    {
        id: "14",
        image: locale2,
        menu: "Cuisine locale",
        title: "Foutou sauce graine",
        price: "1500 XAF",
        start: rating_start,
        description: "Foutou accompagné d'une sauce graine riche et onctueuse."
    },
    {
        id: "15",
        image: locale2,
        menu: "Plats principaux",
        title: "Plats principaux",
        price: "2000 XAF",
        start: rating_start,
        description: "Un plat principal savoureux inspiré de recettes locales."
    },
    {
        id: "16",
        image: dej2,
        menu: "Plats principaux",
        title: "Plats principaux",
        price: "3000 XAF",
        start: rating_start,
        description: "Plat principal copieux idéal pour le déjeuner ou le dîner."
    },
    {
        id: "17",
        image: gourmande1,
        menu: "Cuisine gourmande",
        title: "Cuisine gourmande",
        price: "1500 XAF",
        start: rating_start,
        description: "Une explosion de saveurs pour les amateurs de bonne cuisine."
    },
    {
        id: "18",
        image: gourmande2,
        menu: "Cuisine gourmande",
        title: "Cuisine gourmande",
        price: "1500 XAF",
        start: rating_start,
        description: "Un plat savoureux et généreux, pour les plus gourmands."
    },
    {
        id: "19",
        image: dej2,
        menu: "Déjeuner",
        title: "Déjeuner",
        price: "1500 XAF",
        start: rating_start,
        description: "Une option simple mais délicieuse pour bien manger à midi."
    },
    {
        id: "20",
        image: dessert1,
        menu: "Desserts",
        title: "Dessert",
        price: "1500 XAF",
        start: rating_start,
        description: "Un dessert sucré et léger pour finir votre repas en beauté."
    },
    {
        id: "21",
        image: dessert2,
        menu: "Desserts",
        title: "Dessert",
        price: "1500 XAF",
        start: rating_start,
        description: "Un plaisir sucré qui ravira petits et grands."
    },
    {
        id: "22",
        image: brunch2,
        menu: "Brunch",
        title: "Brunch",
        price: "2000 XAF",
        start: rating_start,
        description: "Un mix sucré-salé parfait pour un brunch gourmand et varié."
    },
    {
        id: "23",
        image: boisson1,
        menu: "Boisson",
        title: "Boisson",
        price: "2000 XAF",
        start: rating_start,
        description: "Boisson fraîche et désaltérante pour accompagner vos plats."
    },
    {
        id: "24",
        image: boisson2,
        menu: "Boisson",
        title: "Boisson",
        price: "2000 XAF",
        start: rating_start,
        description: "Une boisson rafraîchissante, idéale à tout moment de la journée."
    },
];

export const prof_data = [
    {
        "image": "https://example.com/images/chef_ramsey.jpg",
        "name": "Gordon Ramsay",
        "post": "Chef Cuisinier Renommé",
        "description": "Célèbre chef britannique, restaurateur et personnalité de la télévision, connu pour ses émissions culinaires et ses restaurants étoilés Michelin à travers le monde."
    },
    {
        "image": "https://example.com/images/sommelier_dupont.jpg",
        "name": "Isabelle Dupont",
        "post": "Sommelière Experte",
        "description": "Sommelière passionnée et reconnue pour sa connaissance approfondie des vins, capable de sublimer chaque plat par des accords mets-vins parfaits."
    },
    {
        "image": "https://example.com/images/boulanger_martin.jpg",
        "name": "Jean-Pierre Martin",
        "post": "Maître Boulanger-Pâtissier",
        "description": "Artisan boulanger-pâtissier dévoué, perpétuant les traditions de la boulangerie française avec des créations gourmandes et des pains artisanaux exceptionnels."
    }
];

export const testimonie_data = [
    {
        "description": "Le service est impécable! Le personnel est attentionné, souriant et trés professionnel, On se sent vraiment choyé.",
        "image": test1,
        "name": "Samuel",
        "profession": "Dev, Full-Stack",
    },
    {
        "description": "Le service est impécable! Le personnel est attentionné, souriant et trés professionnel, On se sent vraiment choyé.",
        "image": test1,
        "name": "Lesly",
        "profession": "Entrepreneur",
    },
    {
        "description": "Le service est impécable! Le personnel est attentionné, souriant et trés professionnel, On se sent vraiment choyé.",
        "image": test1,
        "name": "Patrick",
        "profession": "Data scientist",
    }
]