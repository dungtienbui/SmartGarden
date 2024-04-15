import { webAxios } from '../utils/axios';

const login = async (username, password) => {
    return await webAxios.post('/user/login', { username, password });
};

export { login };
