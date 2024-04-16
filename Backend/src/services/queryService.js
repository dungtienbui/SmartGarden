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

const saveNewestValue = async (timestamp, SensorId, value, isOutThreshold) => {
    try {
        await db.MeasuredValue.create({ timestamp, SensorId, value, isOutThreshold }, { fields: ['timestamp', 'SensorId', 'value', 'isOutThreshold'] });
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getSensorById, getLastValueWithSensor, checkThreshold, saveNewestValue };