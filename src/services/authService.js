import axios from 'axios';

const API_URL = 'https://todo-backend-73py.onrender.com/api';

export const login = async (credentials) => {
    try {
        console.log("Tentative de connexion...");
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        const { token } = response.data;

        console.log("Token reçu, sauvegarde...");
        localStorage.setItem('token', token);

        try {
            console.log("Récupération de la liste...");
            const listResponse = await axios.get(`${API_URL}/list/unique`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Réponse liste:", listResponse.data);
            if (listResponse.data && listResponse.data.ID_List) {
                localStorage.setItem('listId', listResponse.data.ID_List);
            }
        } catch (listError) {
            console.error('Erreur lors de la récupération de la liste:', listError);
            // Ne pas bloquer la connexion si la récupération de la liste échoue
        }

        return response.data;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        throw error;
    }
};