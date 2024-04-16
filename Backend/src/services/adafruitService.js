import axios from '../utils/axios';
import queryService from './queryService';
require('dotenv').config()

const key = process.env.X_AIO_KEY;
const saveNewestData = async () => {
    try {
        const sensorIds = ['anhsang', 'doamdat', 'doamkk', 'nhietdo'];
        for (const sensorId of sensorIds) {
            const newestValue = await axios.get('/' + sensorId + '/data/last', { params: { 'x-aio-key': key } });
            const lastSavedValue = await queryService.getLastValueWithSensor(sensorId);
            if (!lastSavedValue || (lastSavedValue && new Date(lastSavedValue.timestamp) < new Date(newestValue.created_at))) {
                const isOutThreshold = await queryService.checkThreshold(sensorId, newestValue.value);
                await queryService.saveNewestValue(new Date(newestValue.created_at), sensorId, newestValue.value, isOutThreshold);
            }
        }
    } catch (err) {
        console.log(err);
    }
}
const getDeviceCondition = async (device) => {
    try {
        const newestValue = await axios.get('/' + device + '/data/last', { params: { 'x-aio-key': key } });
        const deviceData = {
            device,
            value: parseInt(newestValue.value),
            time: new Date(newestValue.created_at),
             };
        return deviceData;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const postDeviceCondition = async (device, value) => {
    try {
        console.log(device, value)
        const data = {  value: value  };
        const response = await axios.post('/'+ device  + '/data', data, { params: { 'x-aio-key': key } });
        return value;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};


const updateData = () => {
    const timerId = setInterval(async () => {await saveNewestData()}, process.env.TIME_INTERVAL)
}

module.exports = { updateData, getDeviceCondition, postDeviceCondition };