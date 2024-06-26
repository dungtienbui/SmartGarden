import { webAxios } from '../utils/axios';

const getdvcondition = async (gardenId, dvIds) => {
    let retData = [];
    if (gardenId == 1) {
        const newestValue = await webAxios.get(`/device/data`, { params: { device: dvIds } });
        if (newestValue && +newestValue.EC === 0) {
            retData = newestValue.DT;
        }
    } else {
        retData = { DeviceId: dvIds, state: 0 };
    }
    return retData;
};

const getdvappliedThreshold = async (gardenId, dvIds) => {
    let retData = 1;
    if (gardenId == 1) {
        const newestValue = await webAxios.get(`/device/appliedTh/data`, { params: { device: dvIds } });
        if (newestValue && +newestValue.EC === 0) {
            retData = newestValue.DT;
        }
    } else {
        retData = 0;
    }
    return retData;
};

const changeappliedThreshold = async (device, value) => {
    await webAxios.post(`/device/appliedTh`, { device: device, value: value });
};

const changedevice = async (device, value) => {
    await webAxios.post(`/device`, { device: device, value: value });
};

export { getdvcondition, changedevice, getdvappliedThreshold, changeappliedThreshold };
