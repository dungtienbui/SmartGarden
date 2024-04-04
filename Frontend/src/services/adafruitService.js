import { adaAxios } from '../utils/axios';
import { getAllGarden } from './webService';

const getNewestData = async (gardenId) => {
    const key = import.meta.env.VITE_XAIO_KEY;
    const newestBrightness = await adaAxios.get('/anhsang/data/last', { params: { 'x-aio-key': key } });
    const newestHumidity1 = await adaAxios.get('/doamdat/data/last', { params: { 'x-aio-key': key } });
    const newestHumidity2 = await adaAxios.get('/nhietdo/data/last', { params: { 'x-aio-key': key } });
    const newestTemperature = await adaAxios.get('/nhietdo/data/last', { params: { 'x-aio-key': key } });
    const allGarden = await getAllGarden();
    let retData;
    if (gardenId == allGarden.DT[0].id && allGarden && allGarden.EC === 0) {
        retData = {
            brightness: {
                time: new Date(newestBrightness.created_at).toLocaleTimeString(),
                value: newestBrightness.value + ' lux',
            },
            humidity1: {
                time: new Date(newestHumidity1.created_at).toLocaleTimeString(),
                value: newestHumidity1.value + ' %',
            },
            humidity2: {
                time: new Date(newestHumidity2.created_at).toLocaleTimeString(),
                value: newestHumidity2.value + ' %',
            },
            temperature: {
                time: new Date(newestTemperature.created_at).toLocaleTimeString(),
                value: newestTemperature.value + ' °C',
            },
        };
    } else {
        retData = {
            brightness: { time: '10:30:30 AM', value: '30 lux' },
            humidity1: { time: '10:30:30 AM', value: '30 %' },
            humidity2: { time: '10:30:30 AM', value: '30 %' },
            temperature: { time: '10:30:30 AM', value: '30 °C' },
        };
    }
    return retData;
};

export { getNewestData };
