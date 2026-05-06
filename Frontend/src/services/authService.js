import api from './api';

export const login = (email, password) => {
    return api.post('/auth/login', { email, password });
};

export const register = (data) => {
    return api.post('/auth/register', data);
};

export const getMe = () => {
    return api.get('/auth/me');
};

export default { login, register, getMe };