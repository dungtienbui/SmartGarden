import { adaAxios } from '../utils/axios';
import { getAllGarden } from './webService';

const key = import.meta.env.VITE_XAIO_KEY;

const getNewestData = async (gardenId) => {
    let retData = [];
    const allGarden = await getAllGarden();
    if (allGarden && allGarden.EC === 0 && gardenId == allGarden?.DT[0].id) {
        const sensorIds = ['anhsang', 'doamdat', 'doamkk', 'nhietdo'];
        for (let i = 0; i < sensorIds.length; i++) {
            const newestValue = await adaAxios.get(`/${sensorIds[i]}/data/last`, { params: { 'x-aio-key': key } });
            retData.push({
                time: new Date(newestValue.created_at).toLocaleString(),
                value: newestValue.value,
            });
        }
    } else {
        retData = [
            { time: '10:30:30 AM', value: '30' },
            { time: '10:30:30 AM', value: '30' },
            { time: '10:30:30 AM', value: '30' },
            { time: '10:30:30 AM', value: '30' },
        ];
    }
    return retData;
};

export { getNewestData };
