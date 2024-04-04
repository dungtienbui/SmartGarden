import { webAxios } from '../utils/axios';

const getAllGarden = async () => {
    return await webAxios.get('/garden');
};

export { getAllGarden };
