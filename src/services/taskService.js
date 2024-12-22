import axios from 'axios';

// URL de l'API correcte
const API_URL = 'https://todo-backend-73py.onrender.com/api';

// Configuration par défaut d'Axios avec le token
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getTasks = async (ID_List) => {
    try {
        console.log("Récupération des tâches pour la liste:", ID_List);
        const response = await axios.get(`${API_URL}/list/${ID_List}/tasks`);
        console.log("Tâches récupérées:", response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
        throw error;
    }
};

export const addTask = async (taskData) => {
    try {
        console.log("Envoi de la tâche:", taskData);
        const response = await axios.post(`${API_URL}/list/tasks`, taskData);
        console.log("Réponse de l'ajout:", response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche:', error);
        throw error;
    }
};

export const updateTaskStatus = async (ID_Task, isDone) => {
    try {
        const response = await axios.put(`${API_URL}/list/tasks/${ID_Task}/status`, { isDone });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
        throw error;
    }
};

export const deleteTask = async (ID_Task) => {
    try {
        const response = await axios.delete(`${API_URL}/list/tasks/${ID_Task}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression de la tâche:', error);
        throw error;
    }
};