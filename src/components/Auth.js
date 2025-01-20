import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../api';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const endpoint = isLogin ? 'login' : 'register';
            // Notons que nous n'avons plus besoin d'ajouter /api car c'est dans la baseURL
            const response = await api.post(
                `/auth/${endpoint}`,
                { email, password }
            );

            if (response.data.token) {
                setAuthToken(response.data.token);
                navigate('/tasks');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            if (error.response) {
                // L'erreur vient du serveur
                setError(error.response.data?.error || 'Erreur du serveur');
            } else if (error.request) {
                // La requête a été faite mais pas de réponse
                setError('Impossible de joindre le serveur');
            } else {
                // Erreur de configuration de la requête
                setError('Erreur de configuration');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                    {isLogin ? 'Connexion' : 'Inscription'}
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        {isLogin ? 'Se connecter' : 'S\'inscrire'}
                    </button>
                </form>

                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="w-full mt-4 text-blue-500 hover:text-blue-600 transition-colors"
                >
                    {isLogin ? 'Créer un compte' : 'Déjà un compte ? Se connecter'}
                </button>
            </div>
        </div>
    );
};

export default Auth;