import db from '../models';

const getSensorById = async (SensorId) => {
    try {
        const sensor = await db.Sensor.findOne({
            where: { SensorId },
            raw: true,
        });
        return sensor;
    } catch (err) {
        console.log(err);
    }
};

const getLastValueWithSensor = async (SensorId) => {
    try {
        const lastValue = await db.MeasuredValue.findOne({
            attributes: { exclude: ['id'] },
            order: [['timestamp', 'DESC']],
            include: {
                model: db.Sensor,
                where: { id: SensorId },
            },
            raw: true,
            nest: true
        });
        return lastValue;
    } catch (err) {
        console.log(err);
        return
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
        return lastValue;
    } catch (err) {
        console.log(err);
        return
    }
};

const getLastDeviceValue = async (DeviceId) => {
    try {
        const lastValue = await db.OperationLog.findOne({
            attributes: { exclude: ['id'] },
            where: { DeviceId },
            order: [['timestamp', 'DESC']],
            raw: true,
        });
        return lastValue;
    } catch (err) {
        console.log(err);
        return serviceErr
    }
};

const checkThreshold = async (SensorId, value) => {
    try {
        const threshold = await db.Threshold.findOne({
            attributes: { exclude: ['id'] },
            where: { SensorId },
            raw: true
        });
        return threshold.lowerBound ? value > threshold.lowerBound : false
    } catch (err) {
        console.log(err);
    }
}

const saveNewestSensorValue = async (timestamp, SensorId, value, isOutThreshold) => {
    try {
        await db.MeasuredValue.create({ timestamp, SensorId, value, isOutThreshold }, { fields: ['timestamp', 'SensorId', 'value', 'isOutThreshold'] });
    } catch (err) {
        console.log(err);
    }
}

const saveNewestDeviceValue = async (timestamp, DeviceId, state, operatedBy) => {
    try {
        await db.OperationLog.create({ timestamp, DeviceId, state, operatedBy }, { fields: ['timestamp', 'DeviceId', 'state', 'operatedBy'] });
    } catch (err) {
        console.log(err);
    }
}

const getCurrentUser = async () => {
    try {
        const currUser = await db.User.findOne({ where: {isOnline: true}, raw: true });
        return currUser ? currUser.username : "admin"
    } catch (err) {
        console.log(err);
    }
}

module.exports = { 
    getSensorById, getLastValueWithSensor, getLastSensorValue, getLastDeviceValue, checkThreshold,
    saveNewestSensorValue, saveNewestDeviceValue, getCurrentUser 
};