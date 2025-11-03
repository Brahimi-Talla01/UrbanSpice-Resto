import { useEffect, useState } from 'react';
// import { navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/StoreContext';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = ({ onClose, isShowLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState({type:'', text:''});
  const [loading, setLoading] = useState(false);

  // UseContext de l'inscription de l'utilisateur
  const { Register, Login } = useAuth();
  const navigate = useNavigate();
  const [currState, setCurrState] = useState("Se connecter");

  // Fonction pour créer les données de connexion avec validation
  const createLoginData = () => {
    // Validation des champs
    if (password.trim().length <= 0 || email.trim().length <= 0) {
      setMessage({
        type: 'error',
        text: 'veuillez remplir tous les champs'
      })
      return true;
    }

    // Validation de l'email avec regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setMessage({
        type: 'error',
        text: "Veuillez entrer un email valide"
      });
      return null;
    }

    // Validation du mot de passe
    if (password.trim().length < 6) {
      setMessage({
        type: 'error',
        text: "Le mot de passe doit contenir au moins 6 caractères"
      });
      return null;
    }

    // Création de l'objet loginData avec nettoyage des données
    const loginData = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
      // name: name.trim()
    };

    return loginData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Création des données de connexion avec validation
    const userData = createLoginData();
    
    if (!userData) {
      return; // La validation a échoué
    }

    setLoading(true);

    try {
      if (currState === "Créer un compte") {
        const response = await Register(userData);
        if (!response) {
          setMessage({
            type: 'error',
            text: "Erreur lors de l'inscription"
          });
          return;
        }
        setMessage({
            type: "success",
            text: message.text || "Compte créé avec succès!..."
        });
        //rediriger vers la page de connexion
        setTimeout(()=> {
            setCurrState("Se connecter"); // Basculer vers la connexion après inscription
            // navigate('/login')
        })
        // Réinitialiser les champs
        setName('');
        setEmail('');
        setPassword('');

        
      } else {
        const response = await Login(email, password);
        if (!response) {
          setMessage({
            type: 'error',
            text: "Email ou mot de passe incorrect"
          });
          return;
        }
        setMessage({
            type: 'success',
            text: "Connexion réussie!"
        });
        //On Sauvegarde les donnees utilisateurs
        localStorage.setItem("user", JSON.stringify(response.user));

        //On redirige en fonction du role
        setTimeout(()=>{
          if (response.user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        })
        onClose(); // Fermer la modal après connexion réussie
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: "Une erreur est survenue: " + error.message
      });
    } finally {
        setLoading(false);
    }
  };

  // Nettoyage des champs quand on change d'état
  useEffect(() => {
    if (currState === "Se connecter") {
      setName(''); // Vider le champ nom en mode connexion
    }
  }, [currState]);

  return (
    <div 
      className='fixed inset-0 flex items-center justify-center bg-black/40 z-50 mt-20'
      onClick={onClose}
    >
      <div 
        className={`relative w-full mx-2 p-6 bg-white border border-yellow-500 shadow-xl rounded-lg ${currState === "Se connecter" ? "max-w-sm" : "max-w-lg"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture */}
        <button 
          onClick={onClose}
          className='absolute top-1 right-3 text-black text-4xl font-semibold hover:text-yellow-500 transition duration-300 cursor-pointer'
        >
          &times;
        </button>

        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'> 
              <span className='text-primary'>{currState}</span>
            </h1>
            <p className='font-light'>
              {currState === "Se connecter" 
                ? "Entrer vos informations pour vous connecter" 
                : "Créer votre compte"}
            </p>
          </div>

          {/* mess age de retour utilisateur */}
          {message.text && (<div className={`mb-4 p-2 rounded-lg ${
            message.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

          <form onSubmit={handleSubmit} className='mt-6 w-full text-gray-600'>
            {currState === "Créer un compte" && (
              <div className='flex flex-col'>
                <label>Nom</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                //   required
                  placeholder='Votre nom'
                  className='border-b-2 border-gray-300 p-2 outline-none mb-6'
                />
              </div>
            )}

            <div className='flex flex-col'>
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                // required
                placeholder='votre@email.com'
                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
              />
            </div>

            <div className='flex flex-col'>
              <label>Mot de passe</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                // required
                placeholder='votre mot de passe'
                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
              />
            </div>

            <button 
              type='submit' 
              disabled = {loading}
              className='w-full py-2 font-medium bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded cursor-pointer hover:bg-primary/90 transition-all'
            >
              {currState === "Se connecter" ? "Se connecter" : "Créer un compte"}
            </button>
            
            {currState === "Créer un compte" 
              ? (
                <p className='py-2'>
                  Vous avez déjà un compte ? 
                  <span 
                    className='text-primary cursor-pointer ml-1'
                    onClick={() => setCurrState("Se connecter")}
                  >
                    Se connecter
                  </span>
                </p>
              ) 
              : (
                <p className='py-2'>
                  Crée un compte ? 
                  <span 
                    className='text-sm hover:text-yellow-500 transition duration-300 cursor-pointer ml-1'
                    onClick={() => setCurrState("Créer un compte")}
                  >
                    Créer un compte
                  </span>
                </p>
              )
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;