import { Clock, DollarSign, ListOrdered, Users } from 'lucide-react';
import petdej1 from './petitdej1.jpeg';
import petdej2 from './petitdej2.jpeg';

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
    id_reservation: 1,
    nom: "Dupont",
    email: "dupont@example.com",
    telephone: "06 12 34 56 78",
    heure: "19:00",
    date: "2024-04-15",
    Nb_place: 4,
    message: "Table près de la fenêtre s'il vous plaît."
  },
  {
    id_reservation: 2,
    nom: "Durand",
    email: "durand@example.com",
    telephone: "06 87 65 43 21",
    heure: "20:30",
    date: "2024-04-16",
    Nb_place: 2,
    message: "Pour une occasion spéciale."
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
    "total_amount": 6000,
    "currency": "XAF",
    "status": "pending", 
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

// Exporter toutes les données pour utilisation dans le frontend
export {
  users,
  reservations,
  menu,
  chefsCuisiniers,
  panier,
  favoris,
  commandes,
  temoignages
};