import React, { useState } from 'react';
import { addTask } from '../services/taskService';

const TaskForm = ({ onTaskAdded }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const ID_List = localStorage.getItem('listId'); // Récupère l'ID de la liste
            if (!ID_List) {
                throw new Error("Aucune liste trouvée pour cet utilisateur !");
            }

            await addTask({ Description: description, isDone: false, ID_List });
            setDescription(''); // Réinitialise le champ
            onTaskAdded();      // Rafraîchit la liste des tâches
        } catch (error) {
            console.error("Erreur lors de l'ajout de la tâche:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description de la tâche"
                required
            />
            <button type="submit">Ajouter Tâche</button>
        </form>
    );
};

export default TaskForm;
