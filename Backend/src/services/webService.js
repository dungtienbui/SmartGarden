import { where } from 'sequelize';
import db from '../models';
import adafruitService from './adafruitService';
import queryService from './queryService';


const serviceErr = { 
    EM: 'Error from service',
    EC: -2,
    DT: ''
}

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
}

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
}

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
}


// Threshold value
const getThresholdValueByGardenId = async (GardenId) => {
    try {
        const thresholdValue = await db.Threshold.findAll({where: {GardenId}, raw: true});
        if (thresholdValue) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: thresholdValue
            }
        }
    } catch (err) {
        console.log(err);
        return serviceErr
    }
}


const updateLightIntensiveThresholdOfGarden = async (GardenId) => {
    // try {
    //     await db.MeasuredValue.create({ timestamp, sensorId, value, isOutThreshold }, { fields: ['timestamp', 'sensorId', 'value', 'isOutThreshold'] });
    // } catch (err) {
    //     console.log(err);
    // }

    try {
        await db.Threshold.update(
            {},
            {
                where: {
                    
                }
            }
        )
    } catch (error) {
        
    }
}


module.exports = { getAllGarden, getLastSavedValue, getAllSensor, getSensorInfo, getThresholdValueByGardenId, updateLightIntensiveThresholdOfGarden };