import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Auth from './components/Auth';
import TaskPage from './components/TaskPage';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-end mb-4">
              <ThemeToggle />
            </div>
            
            <Routes>
              <Route path="/login" element={<Auth />} />
              <Route
                path="/tasks"
                element={
                  localStorage.getItem('token') ? (
                    <TaskPage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path="/" element={<Navigate to="/tasks" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
