import { webAxios } from '../utils/axios';

const getAllGarden = async () => {
    return await webAxios.get('/garden');
};

const getAllSensor = async (gardenId) => {
    return await webAxios.get('/sensor/info', { params: { gardenId } });
};

// get threshold values of garden with 'gardenId'
// [get] :/threshold/value/:gardenId
const getThresholdByGardenId = async (gardenId) => {
    return await webAxios.get('/threshold/value', { params: { gardenId } });
}

export { getAllGarden, getAllSensor, getThresholdByGardenId };
