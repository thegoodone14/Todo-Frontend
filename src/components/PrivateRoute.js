import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // Vérifier si l'utilisateur est authentifié
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return !!token; // Convertit token en booléen
    };

    // Si non authentifié, rediriger vers la page de connexion
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    // Si authentifié, afficher le composant enfant
    return children;
};

export default PrivateRoute;
