import { webAxios } from '../utils/axios';


const getdvcondition = async (gardenId, dvIds) => {    
    let retData = [];
    if (gardenId == 1) {
        
        const newestValue = await webAxios.get(`/control/device/data`, {params:{ device: dvIds }});
        if (newestValue && newestValue.EC === 0) retData=newestValue.DT;
        
    } else {
        retData = { device:dvIds, value: '0', time: '00:00:00 AM'}

    }
    return retData;
};


const changedevice = async (device, value) => {
    console.log(device, value)
    const x = await webAxios.post(`/control/device`, { device: device, value: value });
    return x
};

export { getdvcondition, changedevice };