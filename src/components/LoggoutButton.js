// Dans components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
            Déconnexion
        </button>
    );
};

export default LogoutButton;