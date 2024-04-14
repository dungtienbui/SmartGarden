import { webAxios } from '../utils/axios';

const getAllGarden = async () => {
    return await webAxios.get('/garden');
};

const getAllSensor = async (gardenId) => {
    return await webAxios.get('/sensor/info', { params: { gardenId } });
};

const getSensorInfo = async (sensorId) => {
    return await webAxios.get(`/sensor/info/${sensorId}`);
};

export { getAllGarden, getAllSensor, getSensorInfo };
