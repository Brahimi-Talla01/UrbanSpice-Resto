import { Clock, DollarSign, ListOrdered, Users } from 'lucide-react';
import petdej1 from './petitdej1.jpeg';
import petdej2 from './petitdej2.jpeg';
import service7 from './commande1.jpeg';
import dej1 from './dej1.jpeg';
import dejeunerImg from './Img-dejeuner.jpeg';
import diner1 from './Img-diner.jpeg';
import service1 from './Img-livraison.jpeg';

// Chefs
import chef1 from './chef1.jpeg';
import chef2 from './chef2.jpeg';
import chef3 from './chef3.jpeg';
//Testimony
import test1 from './images.jpeg';
import zdeveloper from './Zdevelopper.jpeg';


// Table : User
const users = [
  {
    id: 1,
    nom: "Dupont",
    email: "dupont@example.com",
    MotDePasse: "password123",
    role: "user"
  },
  {
    id: 2,
    nom: "Martin",
    email: "martin@example.com",
    MotDePasse: "securepass",
    role: "admin"
  }
];

// Table : Reservation
const reservations = [
  {
    id: 1,
    nom: "Marie",
    email: "marie@gmail.com",
    telephone: "6 12 34 56 78",
    heure: "19:00",
    date: "2025-09-30",
    is_completed: false,
    nb_place: 4,
    message: "Table près de la fenêtre s'il vous plaît.",
    created_at: "2025-09-10T15:20:00Z",
  },
  {
    id: 2,
    nom: "Feuzeu",
    email: "feuzeu@gmail.com",
    telephone: "06 87 65 43 21",
    heure: "20:30",
    date: "2024-04-16",
    is_completed: true,
    nb_place: 2,
    message: "Pour une occasion spéciale.",
    created_at: "2024-04-10T15:20:00Z",
  },
  {
    id: 3,
    nom: "Tagne",
    email: "tagne@gmail.com",
    telephone: "6 87 65 43 21",
    heure: "15:30",
    date: "2025-10-16",
    is_completed: false,
    nb_place: 6,
    message: "Pour ma bb.",
    created_at: "2025-09-22T15:10:00Z",
  }
];

// Table : Menu
const menu = [
  {
    "id": "uuid-123",
    "title": "Croc Monsieur",
    "description": "Un délicieux croque monsieur croustillant, garni de jambon et fromage.",
    "price": 3000,
    "currency": "XAF",
    "image_url": petdej1,
    "category": "Petit-déjeuner",
    "rating": 4.5,
    "is_published": false,
    "published_at": "2025-09-22T09:00:00Z",
    "is_deleted": false,
    "created_at": "2025-09-01T12:00:00Z",
    "updated_at": "2025-09-21T18:30:00Z"
  },
  {
    "id": "uuid-124",
    "title": "Pain + Oeuf",
    "description": "Un petit-déjeuner simple et nourrissant à base de pain grillé et œuf.",
    "price": 3000,
    "currency": "XAF",
    "image_url": petdej2,
    "category": "Petit-déjeuner",
    "rating": 4.5,
    "is_published": true,
    "published_at": "2025-09-22T09:00:00Z",
    "is_deleted": false,
    "created_at": "2025-09-01T12:00:00Z",
    "updated_at": "2025-09-21T18:30:00Z"
  },
];

// Table : Chef_cuisinier
const chefsCuisiniers = [
  {
    id_chef: 1,
    image: "https://via.placeholder.com/150x150?text=Chef+Jean",
    lien: "#chef-jean",
    nom_cuisinier: "Jean Martin",
    post: "Chef Exécutif",
    description: "Spécialiste des cuisines méditerranéennes depuis 15 ans."
  },
  {
    id_chef: 2,
    image: "https://via.placeholder.com/150x150?text=Chef+Sophie",
    lien: "#chef-sophie",
    nom_cuisinier: "Sophie Dubois",
    post: "Sous-Chef",
    description: "Passionnée par les saveurs du sud de la France."
  }
];

// Table : Panier
const panier = [
  {
    "id": "cart-789",
    "user_id": "user-123",
    "menu_id": "uuid-123",
    "quantity": 2,
    "price_snapshot": 3000,
    "currency": "XAF",
    "added_at": "2025-09-21T10:00:00Z"
  }
];

// Table : Favoris
const favoris = [
  {
    "id": "fav-456",
    "user_id": "user-123",
    "menu_id": "uuid-123",
    "created_at": "2025-09-20T14:00:00Z"
  },
];

// Table : Commande
const commandes = [
  {
    "id": "order-111",
    "user_id": "user-123",
    "user_name": "Mbarga",
    "total_amount": 6000,
    "currency": "XAF",
    "is_completed": true, 
    "created_at": "2025-09-21T10:05:00Z",
    "items": [
      {
        "menu_id": "uuid-123",
        "title": "Croc Monsieur",
        "price": 3000,
        "quantity": 2
      }
    ]
  },
  {
    "id": "order-113",
    "user_id": "user-127",
    "user_name": "Mbopda",
    "total_amount": 4000,
    "currency": "XAF",
    "status": "pending", 
    "created_at": "2025-09-21T10:05:00Z",
    "items": [
      {
        "menu_id": "uuid-123",
        "title": "Ndolé viande",
        "price": 2000,
        "quantity": 1
      }
    ]
  },
  {
    "id": "order-112",
    "user_id": "user-127",
    "user_name": "Tonga",
    "total_amount": 4000,
    "currency": "XAF",
    "status": "completed", 
    "created_at": "2025-09-21T10:05:00Z",
    "items": [
      {
        "menu_id": "uuid-123",
        "title": "Viande rotis",
        "price": 2000,
        "quantity": 1
      },
      {
        "menu_id": "uuid-125",
        "title": "Viande rotis",
        "price": 500,
        "quantity": 4
      },
    ]
  },

];


// Données mockées pour le dashboard
const statsCards = [
    {
      title: 'Total Commandes',
      value: '48,652',
      change: '+15%',
      trend: 'up',
      icon: <ListOrdered />,
      bgColor: 'bg-orange-500',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Total Clients',
      value: '1,248',
      change: '+4.2%',
      trend: 'up',
      icon: <Users />,
      bgColor: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Revenus Totaux',
      value: '$215,860',
      change: '+2.4%',
      trend: 'up',
      icon: <DollarSign />,
      bgColor: 'bg-green-500',
      lightBg: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Commandes en Cours',
      value: '23',
      change: '-8.1%',
      trend: 'down',
      icon: <Clock />,
      bgColor: 'bg-yellow-500',
      lightBg: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    }
];

// Table : Temoignage
const temoignages = [
  {
    id_description: 1,
    description: "Un excellent repas, service rapide et souriant !",
    image: "https://via.placeholder.com/100x100?text=Client+1",
    nom: "Alice Bernard"
  },
  {
    id_description: 2,
    description: "Les plats sont délicieux, surtout la tarte tatin !",
    image: "https://via.placeholder.com/100x100?text=Client+2",
    nom: "Thomas Lenoir"
  }
];


//Table Service
const services =[
    {
        "id": "1",
        "image_url": service1,
        "title":"Livraison",
        "is_actived": true,
        "created_at": "2025/08/20",
    },
    {
        "id": "2",
        "image_url": service7,
        "title":"Commande",
        "is_actived": true,
        "created_at": "2025/08/20",
    },
    {
        "id": "3",
        "image_url": dej1,
        "title":"Pétit Déjeuner",
        "is_actived": true,
        "created_at": "2025/08/20",
    },
    {
        "id": "4",
        "image_url": dejeunerImg,
        "title":"Déjeuner",
        "is_actived": true,
        "created_at": "2025/08/20",
    },
    {
        "id": "5",
        "image_url": diner1,
        "title":"Diner",
        "is_actived": true,
        "created_at": "2025/08/20",
    },
];

const prof_data = [
    {
        "id": "1",
        "image_url": chef3,
        "name": "Dieuveil Malonga",
        "post": "Chef Cuisinier Renommé",
        "is_actived": true,
        "created_at": "2025/08/20",
        "description": "Célèbre chef Camerounais, restaurateur et personnalité de la télévision, connu pour ses émissions culinaires et ses restaurants étoilés Michelin à travers le monde."
    },
    {
        "id": "2",
        "image_url": chef1,
        "name": "Georgiana Viou",
        "post": "Sommelière Experte",
        "is_actived": true,
        "created_at": "2025/08/20",
        "description": "Sommelière passionnée et reconnue pour sa connaissance approfondie des vins, capable de sublimer chaque plat par des accords mets-vins parfaits."
    },
    {
        "id": "3",
        "image_url": chef2,
        "name": "Mory Sacko",
        "post": "Maître Boulanger-Pâtissier",
        "is_actived": true,
        "created_at": "2025/08/20",
        "description": "Artisan boulanger-pâtissier dévoué, perpétuant les traditions de la boulangerie française avec des créations gourmandes et des pains artisanaux exceptionnels."
    }
];

const testimonie_data = [
    {
        "id": "1",
        "is_actived": true,
        "created_at": "2025/08/20",
        "description": "Le service est impécable! Le personnel est attentionné, souriant et trés professionnel, On se sent vraiment choyé.",
        "image_url": test1,
        "name": "Samuel",
        "profession": "Dev, Full-Stack",
    },
    {
        "id": "2",
        "is_actived": true,
        "created_at": "2025/08/20",
        "description": "Le service est impécable! Le personnel est attentionné, souriant et trés professionnel, On se sent vraiment choyé.",
        "image_url": zdeveloper,
        "name": "Lesley",
        "profession": "Entrepreneur",
    },
    {
        "id": "3",
        "is_actived": true,
        "created_at": "2025/08/20",
        "description": "Le service est impécable! Le personnel est attentionné, souriant et trés professionnel, On se sent vraiment choyé.",
        "image_url": test1,
        "name": "Patrick",
        "profession": "Data scientist",
    }
];


// Exporter toutes les données pour utilisation dans le frontend
export {
  users,
  reservations,
  menu,
  chefsCuisiniers,
  panier,
  favoris,
  commandes,
  temoignages,
  services,
  prof_data,
  testimonie_data,
};