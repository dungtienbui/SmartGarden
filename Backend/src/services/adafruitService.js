import axios from '../utils/axios';
import queryService from './queryService';
require('dotenv').config()

const key = process.env.X_AIO_KEY;

const updateData = () => {
    setInterval(async () => {await saveNewestData()}, process.env.TIME_INTERVAL)
}

const saveNewestData = async () => {
    try {
        const sensorIds = ['anhsang', 'doamdat', 'doamkk', 'nhietdo'];
        for (const sensorId of sensorIds) {
            const newestValue = await axios.get('/' + sensorId + '/data/last', { params: { 'x-aio-key': key } });
            const lastSavedValue = await queryService.getLastSensorValue(sensorId);
            if (!lastSavedValue || (lastSavedValue && new Date(lastSavedValue.timestamp) < new Date(newestValue.created_at))) {
                const { isBelowLowerBound, isAboveUpperBound } = await queryService.checkThreshold(sensorId, newestValue.value);
                await queryService.saveNewestSensorValue(new Date(newestValue.created_at), sensorId, newestValue.value, isBelowLowerBound, isAboveUpperBound);
                if (isBelowLowerBound || isAboveUpperBound) {
                    if (sensorId === 'anhsang') {
                        const device = await queryService.geDeviceById('den');
                        if (device.isApplyThreshold) {
                            const postState = isBelowLowerBound ? 1 : 0;
                            await postDeviceCondition('den', postState);
                        }
                    } else if (sensorId === 'doamdat') {
                        const device = await queryService.geDeviceById('maybom');
                        if (device.isApplyThreshold) {
                            const postState = isBelowLowerBound ? 1 : 0;
                            await postDeviceCondition('maybom', postState);
                        }
                    }
                }
            }
        }
        const deviceIds = ['den', 'maybom'];
        const currUser = await queryService.getCurrentUser();
        for (const deviceId of deviceIds) {
            const newestValue = await axios.get('/' + deviceId + '/data/last', { params: { 'x-aio-key': key } });
            const lastSavedValue = await queryService.getLastDeviceValue(deviceId);
            if (!lastSavedValue || (lastSavedValue && new Date(lastSavedValue.timestamp) < new Date(newestValue.created_at))) {
                await queryService.saveNewestDeviceValue(new Date(newestValue.created_at), deviceId, newestValue.value, currUser);
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
        const data = { value: value };
        await axios.post('/' + device  + '/data', data, { params: { 'x-aio-key': key } });
        return value;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = { updateData, getDeviceCondition, postDeviceCondition };