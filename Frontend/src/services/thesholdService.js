import { webAxios } from '../utils/axios';

// get threshold values of garden with 'gardenId'
// [get] /threshold/value/:gardenId
// input: gardenId
// return: null if gardenId invalid
const getThresholdBySensorId = async (sensorId) => {
    return await webAxios.get(`/setting/threshold/value/${sensorId}`);
};
//[post] /update/:sensorId. post a object {newUpper, newLower}
// input: sensorId, newUpper, newLower
// return: null if gardenId invalid
const updateThresholdOfSensor = async (sensorId, newUpper, newLower) => {
    return await webAxios.post(`/setting/threshold/update/${sensorId}`, { newUpper, newLower });
};

export { getThresholdBySensorId, updateThresholdOfSensor };
