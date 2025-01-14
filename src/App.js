import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Auth from './components/Auth';
import TaskPage from './components/TaskPage';
import ThemeToggle from './components/ThemeToggle';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  // Vérifier si l'utilisateur est authentifié
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  // Rediriger vers /login si le token n'est pas présent
  useEffect(() => {
    if (!isAuthenticated() && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
          <div className="container mx-auto px-4 py-8">
            {isAuthenticated() && (
              <div className="flex justify-end mb-4">
                <ThemeToggle />
              </div>
            )}
            
            <Routes>
              <Route 
                path="/login" 
                element={
                  isAuthenticated() ? (
                    <Navigate to="/tasks" replace />
                  ) : (
                    <Auth />
                  )
                } 
              />
              <Route
                path="/tasks"
                element={
                  <PrivateRoute>
                    <TaskPage />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/" 
                element={
                  <Navigate to={isAuthenticated() ? "/tasks" : "/login"} replace />
                } 
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
