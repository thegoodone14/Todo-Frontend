import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskFilters from './TaskFilters';

const TaskList = ({ listId }) => {
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        priority: '',
        isDone: undefined,
        sortBy: 'dueDate'
    });

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const queryParams = new URLSearchParams();
            if (filters.search) queryParams.append('search', filters.search);
            if (filters.priority) queryParams.append('priority', filters.priority);
            if (filters.isDone !== undefined) queryParams.append('isDone', filters.isDone);
            if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);

            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/list/${listId}/tasks?${queryParams.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setTasks(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches:', error);
        }
    };

    useEffect(() => {
        if (listId) {
            fetchTasks();
        }
    }, [listId, filters]);

    const toggleTaskStatus = async (taskId, currentStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/list/tasks/${taskId}/status`,
                { isDone: !currentStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchTasks();
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut:', error);
        }
    };

    const updatePriority = async (taskId, newPriority) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/list/tasks/${taskId}/priority`,
                { priority: newPriority },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchTasks();
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la priorité:', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/list/tasks/${taskId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchTasks();
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'HIGH': return 'text-red-600 dark:text-red-400';
            case 'MEDIUM': return 'text-yellow-600 dark:text-yellow-400';
            case 'LOW': return 'text-green-600 dark:text-green-400';
            default: return 'text-gray-600 dark:text-gray-400';
        }
    };

    return (
        <div className="space-y-4">
            <TaskFilters filters={filters} onFilterChange={setFilters} />
            
            <div className="space-y-2">
                {tasks.map(task => (
                    <div
                        key={task.ID_Task}
                        className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                    >
                        <div className="flex items-center space-x-4">
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={() => toggleTaskStatus(task.ID_Task, task.isDone)}
                                className="h-5 w-5 rounded border-gray-300 dark:border-gray-600"
                            />
                            <span className={`${task.isDone ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                                {task.Description}
                            </span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <select
                                value={task.priority}
                                onChange={(e) => updatePriority(task.ID_Task, e.target.value)}
                                className={`p-1 rounded border ${getPriorityColor(task.priority)}`}
                            >
                                <option value="LOW">Basse</option>
                                <option value="MEDIUM">Moyenne</option>
                                <option value="HIGH">Haute</option>
                            </select>

                            {task.dueDate && (
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                            )}

                            <button
                                onClick={() => deleteTask(task.ID_Task)}
                                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
