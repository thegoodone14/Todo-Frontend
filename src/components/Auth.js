import React, { useState } from 'react';
import { login, register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ pseudo: '', mail: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const credentials = { Mail: form.mail, Password: form.password };
                console.log('Tentative de connexion avec:', credentials);
                const response = await login(credentials);
                console.log('Réponse du serveur:', response);
                navigate("/tasks");
            } else {
                const userData = {
                    Pseudo: form.pseudo,
                    Mail: form.mail,
                    Password: form.password
                };
                console.log('Tentative d\'enregistrement avec:', userData);
                const response = await register(userData);
                console.log('Réponse du serveur:', response);
                // Une fois enregistré, connectez automatiquement l'utilisateur
                await login({ Mail: form.mail, Password: form.password });
                navigate("/tasks");
            }
        } catch (error) {
            console.error("Détails de l'erreur:", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                config: error.config
            });
            alert("Error: " + (error.response?.data?.error || "An error occurred"));
        }
    };

    return (
        <div>
            <h2>{isLogin ? "Login" : "Register"}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        name="pseudo"
                        placeholder="Pseudo"
                        onChange={(e) => setForm({ ...form, pseudo: e.target.value })}
                    />
                )}
                <input
                    type="email"
                    name="mail"
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, mail: e.target.value })}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button type="submit">{isLogin ? "Login" : "Register"}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Switch to Register" : "Switch to Login"}
            </button>
        </div>
    );
};

export default Auth;
