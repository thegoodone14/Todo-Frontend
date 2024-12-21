import React, { useEffect, useState, useCallback } from 'react';
import { getTasks } from '../services/taskService';
import TaskForm from './TaskForm';

const TaskList = ({ ID_List }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = useCallback(async () => {
        try {
            const data = await getTasks(ID_List);
            setTasks(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des tâches:", error);
        }
    }, [ID_List]);
    

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <div>
            <h2>Liste des tâches</h2>
            <TaskForm ID_List={ID_List} onTaskAdded={fetchTasks} />
            <ul>
                {tasks.map((task) => (
                    <li key={task.Id_Task}>
                        {task.Description} {task.isDone ? "(Terminé)" : ""}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
