import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTask, deleteTask, getTasks, updateTaskStatus } from '../services/taskService';
import { logout } from '../services/authService';
import './TaskPage.css';

const TaskPage = () => {
   const navigate = useNavigate();
   const [tasks, setTasks] = useState([]);
   const [description, setDescription] = useState('');
   const [hideDoneTasks, setHideDoneTasks] = useState(false);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

   const handleLogout = () => {
       logout();
       navigate('/');
   };

   const toggleHideDoneTasks = () => {
       setHideDoneTasks(!hideDoneTasks);
   };

   const fetchTasks = async () => {
       setLoading(true);
       setError(null);
       try {
           const ID_List = localStorage.getItem('listId');
           if (!ID_List) {
               throw new Error('ID de liste non trouvé');
           }
           const data = await getTasks(ID_List);
           setTasks(data);
       } catch (err) {
           console.error('Erreur:', err);
           setError('Impossible de charger les tâches');
       } finally {
           setLoading(false);
       }
   };

   const handleSubmit = async (e) => {
       e.preventDefault();
       if (!description.trim()) return;

       setError(null);
       try {
           const ID_List = localStorage.getItem('listId');
           if (!ID_List) throw new Error('ID de liste non trouvé');

           await addTask({ Description: description, isDone: false, ID_List });
           setDescription('');
           await fetchTasks();
       } catch (err) {
           console.error('Erreur:', err);
           setError('Impossible d\'ajouter la tâche');
       }
   };

   const handleToggleStatus = async (task) => {
       try {
           await updateTaskStatus(task.ID_Task, !task.isDone);
           await fetchTasks();
       } catch (err) {
           console.error('Erreur:', err);
           setError('Impossible de mettre à jour le statut');
       }
   };

   const handleDeleteTask = async (ID_Task) => {
       try {
           await deleteTask(ID_Task);
           await fetchTasks();
       } catch (err) {
           console.error('Erreur:', err);
           setError('Impossible de supprimer la tâche');
       }
   };

   useEffect(() => {
       fetchTasks();
   }, []);

   if (loading) return <div>Chargement...</div>;

   return (
       <div className="task-page">
           <div className="header-container">
               <h2>Mes Tâches</h2>
               <button 
                   onClick={handleLogout}
                   className="logout-button"
               >
                   Déconnexion
               </button>
           </div>

           {error && <div className="error-message">{error}</div>}
           
           <form onSubmit={handleSubmit} className="task-form">
               <input
                   type="text"
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                   placeholder="Ajouter une tâche..."
                   className="task-input"
               />
               <button type="submit" className="add-button">Ajouter</button>
           </form>
           
           <div className="button-container">
               <button 
                   onClick={toggleHideDoneTasks}
                   className="toggle-button"
               >
                   {hideDoneTasks ? 'Afficher toutes les tâches' : 'Masquer les tâches réalisées'}
               </button>
           </div>

           <ul className="task-list">
               {tasks
                   .filter(task => !hideDoneTasks || !task.isDone)
                   .map(task => (
                       <li key={task.ID_Task} className="task-item">
                           <span className="task-description">{task.Description}</span>
                           <div className="task-actions">
                               <button
                                   className={`status-button ${task.isDone ? 'done' : 'undone'}`}
                                   onClick={() => handleToggleStatus(task)}
                               >
                                   {task.isDone ? 'Terminé' : 'En cours'}
                               </button>
                               <button
                                   className="delete-button"
                                   onClick={() => handleDeleteTask(task.ID_Task)}
                               >
                                   ❌
                               </button>
                           </div>
                       </li>
                   ))}
           </ul>
       </div>
   );
};

export default TaskPage;