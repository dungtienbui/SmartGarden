import axios from '../utils/axios';
import db from '../models';
import queryService from './queryService';
require('dotenv').config()

const key = process.env.X_AIO_KEY;
const getNewestData = async () => {
    try {
        const sensorIds = ['anhsang', 'doamdat', 'doamkk', 'nhietdo'];
        for (const sensorId of sensorIds) {
            const newestValue = await axios.get('/' + sensorId + '/data/last', { params: { 'x-aio-key': key } });
            const lastSavedValue = await queryService.getLastSavedValue(sensorId);
            if (!lastSavedValue || (lastSavedValue && new Date(lastSavedValue.timestamp) < new Date(newestValue.created_at))) {
                await queryService.saveNewestValue(new Date(newestValue.created_at), sensorId, newestValue.value, false);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getNewestData };