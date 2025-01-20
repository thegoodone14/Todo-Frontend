import axios from 'axios';

const api = axios.create({
    baseURL: 'https://todo-backend-73py.onrender.com/api', // URL complète de l'API
    headers: {
        'Content-Type': 'application/json',
    },
});

// Ajouter un intercepteur pour logging
api.interceptors.request.use(request => {
    console.log('Starting Request:', request)
    return request
});

api.interceptors.response.use(response => {
    console.log('Response:', response)
    return response
}, error => {
    console.error('Response Error:', error)
    return Promise.reject(error)
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