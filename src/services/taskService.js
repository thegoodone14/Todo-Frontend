import api from '../api';

export const getTasks = async (ID_List) => {
    try {
        console.log("Récupération des tâches pour la liste:", ID_List);
        const response = await api.get(`/list/${ID_List}/tasks`);
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
        const response = await api.post(`/list/tasks`, taskData);
        console.log("Réponse de l'ajout:", response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche:', error);
        throw error;
    }
};

export const updateTaskStatus = async (ID_Task, isDone) => {
    try {
        const response = await api.put(`/list/tasks/${ID_Task}/status`, { isDone });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
        throw error;
    }
};

export const deleteTask = async (ID_Task) => {
    try {
        const response = await api.delete(`/list/tasks/${ID_Task}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression de la tâche:', error);
        throw error;
    }
};