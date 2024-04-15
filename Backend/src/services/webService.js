import db from '../models';
const Op = db.Sequelize.Op;
import queryService from './queryService';


const serviceErr = {
    EM: 'Error from service',
    EC: -2,
    DT: ''
};

const getAllGarden = async () => {
    try {
        const allGarden = await db.Garden.findAll();
        if (allGarden) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: allGarden
            }
        }
    } catch (err) {
        console.log(err);
        return serviceErr
    }
};

const getLastValueWithSensor = async (sensorId) => {
    try {
        const lastValue = await queryService.getLastValueWithSensor(sensorId);
        if (lastValue) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: lastValue
            }
        }
    } catch (err) {
        console.log(err);
        return serviceErr
    }
};

const getAllSensor = async (GardenId) => {
    try {
        const allSensor = await db.Sensor.findAll({ where: { GardenId }, raw: true });
        if (allSensor) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: allSensor
            }
        }
    } catch (err) {
        console.log(err);
        return serviceErr
    }
};

const getSensorInfo = async (sensorId) => {
    try {
        const sensor = await db.Sensor.findOne({ where: { id: sensorId }, raw: true });
        if (sensor) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: sensor
            }
        }
    } catch (err) {
        console.log(err);
        return serviceErr
    }
};

const getDataChart = async (SensorId, limit) => {
    try {
        const data = await db.MeasuredValue.findAll({
            where: { SensorId },
            attributes: { exclude: ['id'] },
            order: [['timestamp', 'DESC']],
            limit: limit, raw: true
        });
        if (data) {
            let dataChart = {time: [], value: []};
            for (let i = 0; i < limit; i++) {
                let time = null;
                let value = null;
                if (i < data.length){
                    time = data[data.length - i - 1].timestamp;
                    value = data[data.length - i - 1].value;
                }
                dataChart.time.push(time);
                dataChart.value.push(value);
            }
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: dataChart
            }
        }
    } catch (err) {
        console.log(err);
        return serviceErr
    }
};

const getPageData = async (SensorId, page, limit, start, end) => {
    try {
        let whereCondition;
        if (start && end) whereCondition = { SensorId, timestamp: { [Op.between]: [start, end] }}
        else if (start) whereCondition = { SensorId, timestamp: { [Op.gte]: start }}
        else if (end) whereCondition = { SensorId, timestamp: { [Op.lt]: end }}
        else whereCondition = { SensorId }
    
        const offset = (page - 1)*limit;
        const { count, rows } = await db.MeasuredValue.findAndCountAll({
            attributes: { exclude: ['id'] },
            where: whereCondition,
            order: [['timestamp', 'DESC']],
            offset, limit, 
            raw: true
        });
        const data = rows.map((row) => ({time: row.timestamp.toLocaleString(), value: row.value }))
        const pageData = { numRow: count, numPage: Math.ceil(count/limit), data }
        if (pageData) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: pageData
            }
        }
    } catch (err) {
        console.log(err);
        return serviceErr
    }
};

const getLastValue = async (SensorId) => {
    try {
        const lastValue = await db.MeasuredValue.findOne({
            attributes: { exclude: ['id'] },
            where: { SensorId },
            order: [['timestamp', 'DESC']],
            raw: true,
        });
        if (lastValue) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: lastValue
            }
        }
    } catch (err) {
        console.log(err);
        return serviceErr
    }
};

module.exports = { 
    getAllGarden, getLastValueWithSensor, getAllSensor, 
    getSensorInfo, getDataChart, getPageData, getLastValue              
};

