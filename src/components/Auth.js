import React, { useState } from 'react';
import { login, register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ pseudo: '', mail: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                const credentials = { Mail: form.mail, Password: form.password };
                const response = await login(credentials);
                navigate("/tasks");
            } else {
                const userData = {
                    Pseudo: form.pseudo,
                    Mail: form.mail,
                    Password: form.password
                };
                await register(userData);
                const loginResponse = await login({ 
                    Mail: form.mail, 
                    Password: form.password 
                });
                navigate("/tasks");
            }
        } catch (error) {
            setError(error.response?.data?.error || "Une erreur est survenue");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {isLogin ? "Connexion" : "Créer un compte"}
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}


        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
            {!isLogin && (
                <div className="flex flex-col space-y-1">
                    <label htmlFor="pseudo" className="block text-sm font-medium text-gray-700">
                        Pseudo
                    </label>
                    <input
                        id="pseudo"
                        name="pseudo"
                        type="text"
                        required={!isLogin}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => setForm({ ...form, pseudo: e.target.value })}
                        placeholder="Entrez votre pseudo"
                    />
                </div>
            )}

            <div className="flex flex-col space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Adresse email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setForm({ ...form, mail: e.target.value })}
                    placeholder="Entrez votre email"
                />
            </div>

            <div className="flex flex-col space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mot de passe
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Entrez votre mot de passe"
                />
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isLogin ? "Se connecter" : "S'inscrire"}
                </button>
            </div>
        </form>

                    <div className="mt-6">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            {isLogin ? "Créer un nouveau compte" : "Déjà inscrit ? Connectez-vous"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;