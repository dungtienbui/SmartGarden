import { webAxios } from '../utils/axios';


// get threshold values of garden with 'gardenId'
// [get] /threshold/value/:gardenId
// input: gardenId
// return: null if gardenId invalid
const getThresholdByGardenId = async (gardenId) => {
    const isInteger = Number.isInteger(parseInt(gardenId));

    if (!isInteger) {
        console.error('Invalid gardenId');
        return null;
    }

    return await webAxios.get(`/threshold/value/${gardenId}`);
}

// update light intensive threshold of garden with 'gardenId'
//[post] /update/:sensorType/:gardenId . post a object {newUpper, newLower}
// input: gardenId, newUpper, newLower
// return: null if gardenId invalid
const updateThresholdOfGarden = async (gardenId, sensorType, newUpper, newLower) => {

    const isInteger = Number.isInteger(parseInt(gardenId));

    if (!isInteger) {
        console.error('Invalid gardenId');
        return null;
    }

    return await webAxios.post(`/threshold/update/${sensorType}/${gardenId}`, { newUpper, newLower });
}


export { getThresholdByGardenId, updateThresholdOfGarden };