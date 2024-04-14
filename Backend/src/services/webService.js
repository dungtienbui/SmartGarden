import { where } from 'sequelize';
import db from '../models';
import adafruitService from './adafruitService';
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

const getLastSavedValue = async (sensorId) => {
    try {
        const lastValue = await queryService.getLastSavedValue(sensorId);
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
        const allSensor = await db.Sensor.findAll({where: {GardenId}, raw: true});
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
        const sensor = await db.Sensor.findOne({where: { id: sensorId }, raw: true});
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

module.exports = { getAllGarden, getLastSavedValue, getAllSensor, getSensorInfo, getDataChart, getLastValue };