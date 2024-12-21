import api from './api';

export const getLists = async () => {
    const response = await api.get('/api/lists');
    return response.data;
};

export const addList = async (list) => {
    const response = await api.post('/api/lists', list);
    return response.data;
};
