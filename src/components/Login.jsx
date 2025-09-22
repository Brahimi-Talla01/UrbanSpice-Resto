import { useEffect, useState } from 'react';

const Login = ({ onClose, isShowLogin }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [currState, setCurrState] = useState("Se connecter");

//     useEffect(() => {
//         if (isShowLogin) {
//             document.body.style.overflow = "hidden"
//         } else {
//             document.body.style.overflow = "auto"
//         }
//     }, [isShowLogin]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div 
            className='fixed inset-0 flex items-center justify-center bg-black/40 z-50 mt-20'
            // onClick={onClose}
        >
            <div className={`relative w-full mx-2 p-6 bg-white border border-yellow-500 shadow-xl rounded-lg ${currState === "Se connecter" ? "max-w-sm" : "max-w-lg"}`}>

                {/* Bouton de fermeture */}
                <button 
                    onClick={onClose}
                    className='absolute top-1 right-3 text-black text-4xl font-semibold hover:text-yellow-500 transition duration-300 cursor-pointer'
                >
                    &times;
                </button>

                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full py-6 text-center'>
                        <h1 className='text-3xl font-bold'> <span className='text-primary'>{currState}</span></h1>
                        <p className='font-light'>Entrer vos informations pour vous connecter</p>
                    </div>

                    <form onSubmit={handleSubmit} className='mt-6 w-full text-gray-600'>
                        {currState === "Créer un compte" ? 
                            <div className='flex flex-col'>
                                <label>Nom</label>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    type="text"
                                    required
                                    placeholder='Votre nom'
                                    className='border-b-2 border-gray-300 p-2 outline-none mb-6'
                                />
                            </div> : <></>
                        }

                        <div className='flex flex-col'>
                            <label>Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                required
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
                                required
                                placeholder='votre mot de passe'
                                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
                            />
                        </div>

                        <button type='submit' className='w-full py-2 font-medium bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded cursor-pointer hover:bg-primary/90 transition-all'>
                            {currState !== "Se connecter" ? "Créer un compte" : "Se connecter"}
                        </button>
                        {currState === "Créer un compte" 
                            ? <p className='py-2'>Vous avez déjá un compte ? <span className='text-primary cursor-pointer' onClick={() => setCurrState("Se connecter")}>Se connecter</span></p> 
                            : <p className='py-2'>Crée un compte ? <span className='text-sm hover:text-yellow-500 transition duration-300 cursor-pointer' onClick={() => setCurrState("Créer un compte")}>Créer un compte</span></p>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;