import { useState, useRef, useEffect, useContext } from 'react';
import { User, Settings, LogOut, Edit3, Check, X, Mail, Lock } from 'lucide-react';
import { getAllUser, getUserProfil, updateProfile, logout } from '../../services/api';
import { StoreContext } from '../contexts/StoreContext';
import { useNavigate } from 'react-router-dom';

const UserProfileToggle = ({ user, onLogout, onUpdateUser }) => {
  const {refreshUser} = useContext(StoreContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || user?.nom_user || '',
    email: user?.email || user?.email_user || '',
    password: ''
  });

   // On synchroniser avec les props user quand elles changent
  useEffect(() => {
    setEditedUser({
      name: user?.name || user?.nom_user || '',
      email: user?.email || user?.email_user || '',
      password: ''
    });
  }, [user]);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const dropdownRef = useRef(null);

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsEditing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * MISE A JOUR UTILISATEUR
   * @param {*} e 
   */

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    // setEditedUser(true);
     
    try {
      // Appel de l'API  ici
      const response = await updateProfile(editedUser);

      if (response.success && response.user) {
        setEditedUser({
          name: response.user.nom_user || '',
          email: response.user.email_user || '',
          password: ''
        });
        setIsEditing(false)
      }

      onUpdateUser(response.user)
      //Effacer le message apres 3 second
      // setTimeout(() => {
      //   setMessage({type: '', text: ''});
      // }, 3000);

      //setIsEditing(false);
      setShowPassword(false);
      alert('Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditedUser({
      nom_user: user?.nom_user || '',
      email_user: user?.email_user || '',
      password: ''
    });
    setIsEditing(false);
    setShowPassword(false);
  };


  /**
   * DECONNEXION UTILISATEUR
   * @param {*} name 
   * @returns 
   */

  const handleLogout = async() => {
    try {
      await logout();
      // Mettre a jour le user immediatement apres l'action deconnexion
      await refreshUser();
      navigate('/');
    } catch (error) {
      console.error("Erreur lors de la deconnexion", error);
    }
  }

  const getInitials = (name) => {

    const userName = user?.name || user?.nom_user || '';

    if (!userName || typeof userName !== 'string') {
      return 'U';
    }

    return userName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const hasUserData = user && (user.name || user.nom_user);

  if (!hasUserData) {
    console.warn('UserProfileToggle: Donnees utilisateur manquantes:', user);
    return null
  }

  const displayName = user?.name || user?.nom_user || "Utilisateur"
  const displayEmail = user?.email || user?.email_user || ''

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center space-x-2 p-2 rounded-full hover:bg-yellow-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
      >
        <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full flex items-center justify-center font-semibold text-sm shadow-lg">
          {getInitials(displayName)}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-900">{displayName}</p>
          <p className="text-xs text-gray-500">{user.role === 'admin' ? 'admin' : 'Utilisateur'} en ligne </p>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full flex items-center justify-center font-semibold shadow-lg">
                {getInitials(displayName)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{displayName}</h3>
                <p className="text-sm text-gray-600">{displayEmail}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 text-gray-400 cursor-pointer hover:text-yellow-600 hover:bg-yellow-100 rounded-full transition-colors duration-200"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Edit Section */}
          {isEditing ? (
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nouveau mot de passe (optionnel)
                </label>
                <input
                  type="password"
                  value={editedUser.password}
                  onChange={(e) => setEditedUser({...editedUser, password: e.target.value})}
                  placeholder="Laisser vide pour ne pas changer"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-colors"
                />
              </div>

            {/* MISER A JOUR UTILISATEUR*/}
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={handleSaveChanges}
                  className="flex-1 cursor-pointer flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors duration-200"
                >
                  <Check className="w-4 h-4" />
                  <span>Sauvegarder</span>
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 cursor-pointer flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                  <span>Annuler</span>
                </button>
              </div>
            </div>
          ) : (
            /* Menu Items */
            <div className="py-2">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full cursor-pointer flex items-center px-4 py-3 text-left text-gray-700 hover:bg-yellow-50 transition-colors duration-200"
              >
                <Settings className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <p className="font-medium">Modifier le profil</p>
                  <p className="text-sm text-gray-500">Changer vos informations</p>
                </div>
              </button>

              <div className="border-t border-gray-100 my-2"></div>
            {/* DECONNEXION UTILISATEUR */}
              <button
                onClick={handleLogout}
                className="w-full flex cursor-pointer items-center px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-medium">Se déconnecter</p>
                  <p className="text-sm text-red-400">Quitter votre session</p>
                </div>
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

// Composant de démonstration
const UserProfile = ({user}) => {
  // const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleUpdateUser = async (updatedData) => {
    // Simuler un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(prevUser => ({
          ...prevUser,
          nom_user: user?.nom_user || '',
          email_user: user?.email_user || '',
          password: ''
        }));
        resolve();
      }, 1000);
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
      <div className="">
        {/* Header avec le toggle utilisateur */}
        <div className="bg-white rounded-full border border-gray-100 mb-0">
          <div className="flex items-center justify-between">
            
            {isLoggedIn && user ? (
              <UserProfileToggle 
                user={user}
                onLogout={handleLogout}
                onUpdateUser={handleUpdateUser}
              />
            ) : (
              <div className="text-gray-500">Utilisateur déconnecté</div>
            )}
          </div>
        </div>

      </div>
  );
};

export default UserProfile;