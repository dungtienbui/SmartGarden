import { webAxios } from '../utils/axios';

const login = async (username, password) => {
    return await webAxios.post('/user/login', { username, password });
};

const logout = async () => {
    return await webAxios.put('/user/logout');
};

const getUserNames = async () => {
    return await webAxios.get('/user/username');
};

export { login, logout, getUserNames };
