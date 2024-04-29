import { webAxios } from '../utils/axios';

const getdvcondition = async (gardenId, dvIds) => {
    let retData = [];
    if (gardenId == 1) {
        const newestValue = await webAxios.get(`/control/device/data`, { params: { device: dvIds } });
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
        const newestValue = await webAxios.get(`/control/appliedTh/data`, { params: { device: dvIds } });
        if (newestValue && +newestValue.EC === 0) {
            retData = newestValue.DT;
        }
    } else {
        retData = 0;
    }
    return retData;
};

const changeappliedThreshold = async (device, value) => {
    console.log(device, value);
    const x = await webAxios.post(`/control/appliedTh`, { device: device, value: value });
    return x;
};

const changedevice = async (device, value) => {
    const x = await webAxios.post(`/control/device`, { device: device, value: value });
    return x;
};

export { getdvcondition, changedevice, getdvappliedThreshold, changeappliedThreshold };
