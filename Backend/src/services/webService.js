import { where } from 'sequelize';
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
            };
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
            };
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
            };
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
            };
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
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr;
    }
};

const getLastSensorValue = async (SensorId) => {
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
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr;
    }
};

const getThresholdValueBySensorId = async (SensorId) => {
    try {
        const thresholdValue = await db.Threshold.findOne({
            attributes: { exclude: ['id'] },
            where: { SensorId: SensorId },
            raw: true,

        });
        if (thresholdValue) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: thresholdValue
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr;
    }
};

const updateThresholdOfSensor = async (SensorId, newUpper, newLower) => {
    const existSensorId = ['nhietdo', 'doamdat', 'doamkk', 'anhsang']
    if (!existSensorId.includes(SensorId)){
        return {
            EM: 'Error: not find SensorIdId',
            EC: -2,
            DT: ''
        };
    }
    try {
        let updatedUpper = null;
        let updatedLower = null;
        if (newUpper != null){
            updatedUpper = await db.Threshold.update({ upperBound: newUpper }, { where: { SensorId: SensorId}});
        }
        if (newLower != null){
            updatedLower = await db.Threshold.update({ lowerBound: newLower }, { where: { SensorId: SensorId}});
        }
        if (updatedUpper == null && updatedLower == null) {
            return {
                EM: 'don\'t have updated: both newUpper is null and newLower is null',
                EC: -2,
                DT: 0
            };
        } else if (updatedLower == null) {
            return {
                EM: 'Upperbound has been Updated. newLower is null',
                EC: 0,
                DT: updatedUpper[0]
            };
        } else if (updatedUpper == null) {
            return {
                EM: 'Lowerbound has been Updated. newUpper is null',
                EC: 0,
                DT: updatedLower[0]
            };
        } else {
            return {
                EM: 'update succeed: both Lowerbound and Upperbound has been Updated',
                EC: 0,
                DT: updatedUpper[0] + updatedLower[0]
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr;
    }
}

const getLastOutThreshold = async (sensorId, deviceId) => {
    try {
        const deviceData = await queryService.geDeviceById(deviceId);
        if (deviceData && !deviceData?.isAppliedThreshold) {
            const rawLastValue = await getLastValueWithSensor(sensorId);
            if (rawLastValue && rawLastValue.EC === 0) {
                if (rawLastValue.DT.isBelowLowerBound || rawLastValue.DT.isAboveUpperBound) {
                    return { 
                        EM: "Last value is out threshold", 
                        EC: 0, 
                        DT: {
                            timestamp: rawLastValue.DT.timestamp,
                            value: rawLastValue.DT.value,
                            isBelowLowerBound: rawLastValue.DT.isBelowLowerBound,
                            isAboveUpperBound: rawLastValue.DT.isAboveUpperBound,
                            unit: rawLastValue.DT.Sensor.unit
                        }
                    };
                }
            }
        }
        return { EM: "Last value not out threshold", EC: 1, DT: { isBelowLowerBound: false, isAboveUpperBound: false }};
    } catch (err) {
        return serviceErr;
    }
};

const getLastDeviceCondition = async (DeviceId) => {
    try {
        const lastValue = await db.OperationLog.findOne({
            attributes: { exclude: ['id'] },
            where: { DeviceId },
            order: [['timestamp', 'DESC']],
            raw: true,
        });
        if (lastValue) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: lastValue
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr;
    }
};

const getPageSensorData = async (SensorId, page, limit, start, end) => {
    try {
        let timeFilter = {};
        if (start && end) timeFilter = { timestamp: { [Op.between]: [start, end] }};
        else if (start) timeFilter = { timestamp: { [Op.gte]: start }};
        else if (end) timeFilter = { timestamp: { [Op.lt]: end }};
        
        const whereCondition = { SensorId, ...timeFilter };
    
        const offset = (page - 1)*limit;
        let { count, rows } = await db.MeasuredValue.findAndCountAll({
            attributes: { exclude: ['id'] },
            order: [['timestamp', 'DESC']],
            where: whereCondition,
            offset, limit, 
            raw: true
        });
        if (rows) {
            const data = rows.map((row) => ({time: row.timestamp.toLocaleString(), value: row.value }));
            const pageData = { numRow: count, numPage: Math.ceil(count/limit), data };
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: pageData
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr;
    }
};

const getPageOperationData = async (DeviceId, page, limit, start, end, operator, sortNew, state) => {
    try {
        let filter;
        if (operator == '-1') filter = {};
        else if (operator == '0') filter = { isAppliedSchedule : 1 };
        else if (operator == '1') filter = { isAppliedThreshold : 1 };
        else filter = { operatedBy : operator, isAppliedSchedule : 0, isAppliedThreshold : 0 };

        if (state != '-1') filter.state = +state;

        let timeFilter = {};
        if (start && end) timeFilter = { timestamp: { [Op.between]: [start, end] }};
        else if (start) timeFilter = { timestamp: { [Op.gte]: start }};
        else if (end) timeFilter = { timestamp: { [Op.lt]: end }};
        
        const whereCondition = { DeviceId, ...timeFilter, ...filter };

        const offset = (page - 1)*limit;
        const { count, rows } = await db.OperationLog.findAndCountAll({
            attributes: { exclude: ['id'] },
            order: [['timestamp', sortNew == 'true' ? 'DESC' : 'ASC']],
            where: whereCondition,
            offset, limit, 
            raw: true
        });
        if (rows) {
            const data = rows.map((row) => ({ ...row, timestamp: row.timestamp.toLocaleString() }));
            const pageData = { numRow: count, numPage: Math.ceil(count/limit), data };
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: pageData
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr;
    }
};

const getPageOutThresholdData = async (SensorId, page, limit, start, end, sortNew, outBound) => {
    try {
        let filter;
        if (outBound == '0') filter = { isBelowLowerBound : 1 };
        else if (outBound == '1') filter = { isAboveUpperBound : 1 };
        else filter = {[Op.or]: [{ isBelowLowerBound : 1 }, { isAboveUpperBound : 1 }] }

        let timeFilter = {};
        if (start && end) timeFilter = { timestamp: { [Op.between]: [start, end] }};
        else if (start) timeFilter = { timestamp: { [Op.gte]: start }};
        else if (end) timeFilter = { timestamp: { [Op.lt]: end }};
        
        const whereCondition = { SensorId, ...timeFilter, ...filter };
        
        const offset = (page - 1)*limit;
        const { count, rows } = await db.MeasuredValue.findAndCountAll({
            attributes: { exclude: ['id'] },
            order: [['timestamp', sortNew === 'true' ? 'DESC' : 'ASC']],
            where: whereCondition,
            offset, limit, 
            raw: true
        });
        if (rows) {
            const data = rows.map((row) => ({ ...row, timestamp: row.timestamp.toLocaleString() }));
            const pageData = { numRow: count, numPage: Math.ceil(count/limit), data };
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: pageData
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr;
    }    
};

const getBulbSetting = async () => {
    try {
        const bulb = await db.Lighting.findOne({ attributes: { exclude: ['id'] }, raw: true });
        if (bulb) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: bulb
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr
    }
};

const setBulbSetting = async (color, intensity) => {
    try {
        await db.Lighting.update({ color, intensity }, { where: { DeviceId: 'den' } });
        return {
            EM: 'Update succeed',
            EC: 0,
            DT: ''
        };
    } catch (err) {
        console.log(err);
        return serviceErr
    }
};

module.exports = { 
    getAllGarden, getLastValueWithSensor, getAllSensor, 
    getSensorInfo, getDataChart, getLastSensorValue,
    getThresholdValueBySensorId, updateThresholdOfSensor,  
    getLastOutThreshold, getLastDeviceCondition, 
    getPageSensorData, getPageOperationData, getPageOutThresholdData,
    getBulbSetting, setBulbSetting
};

