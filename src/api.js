// src/api.js (même contenu qu'avant)
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://todo-backend-73py.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
    } else {
        delete api.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
    }
};

export default api;