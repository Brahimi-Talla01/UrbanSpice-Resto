import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/StoreContext';

/**
 * AdminRoute — protection des routes /admin (feature n°3).
 *
 * Le backend protège déjà ses API (AuthMiddleware → 401/403 selon la route,
 * voir src/Routes/api.php). Ce composant ferme la faille côté interface :
 * auparavant, App.jsx affichait `{true ? <Layout /> : <Login />}` écrit en dur,
 * donc n'importe quel visiteur voyait le tableau de bord admin (en erreurs 401).
 *
 * Comportement (guidé par sessionChecked du StoreContext, qui ne devient vrai
 * qu'après la réponse de auth→check — `loading` seul ne suffit pas car il passe
 * à false dès le montage tant que user est null) :
 *  - check de session en cours → écran de chargement (pas de flash, pas de
 *    redirection prématurée d'un admin dont la session est encore en vol)
 *  - non connecté → modal Login ouvert + redirection vers /
 *  - connecté mais rôle ≠ "admin" → toast d'accès refusé + redirection vers /
 */
const AdminRoute = ({ children }) => {
    const { user, sessionChecked, setIsShowLogin } = useAuth();
    const location = useLocation();

    const isAdmin = user?.role === 'admin';

    // Non connecté : ouvrir le modal de connexion (une fois, pas à chaque rendu).
    // L'effet s'exécute après le commit contenant <Navigate>, donc le modal
    // reste bien ouvert une fois renvoyé sur l'accueil.
    useEffect(() => {
        if (sessionChecked && !user) {
            setIsShowLogin(true);
        }
    }, [sessionChecked, user, setIsShowLogin]);

    // Connecté mais pas admin : avertir une seule fois par refus
    useEffect(() => {
        if (sessionChecked && user && !isAdmin) {
            toast.warn('Accès refusé : cette section est réservée aux administrateurs.');
        }
    }, [sessionChecked, user, isAdmin]);

    // Vérification de session en cours → on n'affiche rien qui clignote
    if (!sessionChecked) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 bg-gray-900">
                <Loader2 className="w-10 h-10 animate-spin text-yellow-400" aria-hidden="true" />
                <p className="text-gray-300 text-sm">Vérification de l'accès administrateur…</p>
            </div>
        );
    }

    if (!user) {
        // Mémorise la page voulue pour une éventuelle redirection après connexion
        return <Navigate to="/" replace state={{ from: location.pathname }} />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
