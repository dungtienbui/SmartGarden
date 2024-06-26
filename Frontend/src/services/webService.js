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

const getNewestData = async (gardenId) => {
    let retData = [];
    if (gardenId == 1) {
        const sensorIds = ['anhsang', 'doamdat', 'doamkk', 'nhietdo'];
        for (let i = 0; i < sensorIds.length; i++) {
            const newestValue = await webAxios.get(`/sensor/data/new/${sensorIds[i]}`);
            if (newestValue && newestValue.EC === 0) retData.push(newestValue.DT);
        }
    } else {
        retData = [
            { time: '00:00:00 AM', value: '0', unit: 'lux' },
            { time: '00:00:00 AM', value: '0', unit: '%' },
            { time: '00:00:00 AM', value: '0', unit: '%' },
            { time: '00:00:00 AM', value: '0', unit: '°C' },
        ];
    }
    return retData;
};

const getPageSensorData = async (gardenId, sensorId, page, limit, from, to) => {
    if (gardenId == 1) {
        return await webAxios.get(`/sensor/data/page/${sensorId}`, { params: { page, limit, from, to } });
    }
    return;
};

const getPageOperationData = async (gardenId, deviceId, page, limit, filterValue) => {
    if (gardenId == 1) {
        return await webAxios.get(`/device/data/page/${deviceId}`, {
            params: { page, limit, ...filterValue },
        });
    }
    return;
};

const getPageOutThresholdData = async (gardenId, sensorId, page, limit, filterValue) => {
    if (gardenId == 1) {
        return await webAxios.get(`sensor/data/page/outThreshold/${sensorId}`, {
            params: { page, limit, ...filterValue },
        });
    }
    return;
};

const getBulbSetting = async () => {
    return await webAxios.get('/device/setting/den');
};

const setBulbSetting = async (color, intensity) => {
    return await webAxios.put('/device/setting/den', { color, intensity });
};

export {
    getAllGarden,
    getAllSensor,
    getSensorInfo,
    getNewestData,
    getPageSensorData,
    getPageOperationData,
    getPageOutThresholdData,
    getBulbSetting,
    setBulbSetting,
};
