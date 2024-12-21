import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import ListContainer from './components/ListContainer';
import { setAuthToken } from './services/api';
import TaskPage from './components/TaskPage';
import './App.css'

function App() {
    useEffect(() => {
        // Récupérer le token du localStorage au démarrage
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token); // Définir le token dans les en-têtes d'autorisation
        }
    }, []);
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/tasks" element={<TaskPage />} />
                <Route path="/lists" element={<ListContainer />} />
            </Routes>
        </Router>
    );
}

export default App;
