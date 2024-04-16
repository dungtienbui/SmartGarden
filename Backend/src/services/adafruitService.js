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

const updateData = () => {
    const timerId = setInterval(async () => {await saveNewestData()}, process.env.TIME_INTERVAL)
}

module.exports = { updateData };