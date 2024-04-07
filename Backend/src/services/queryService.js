import db from '../models';

const getSensorById = async (sensorId) => {
    try {
        const sensor = await db.Sensor.findOne({
            where: { sensorId },
            raw: true,
        });
        return sensor;
    } catch (err) {
        console.log(err);
    }
};

const getLastSavedValue = async (sensorId) => {
    try {
        const lastValue = await db.MeasuredValue.findOne({
            attributes: { exclude: ['id'] },
            order: [['timestamp', 'DESC']],
            include: {
                model: db.Sensor,
                where: { id: sensorId },
            },
            raw: true,
            nest: true
        });
        return lastValue;
    } catch (err) {
        console.log(err);
    }
};

const saveNewestValue = async (timestamp, sensorId, value, isOutThreshold) => {
    try {
        await db.MeasuredValue.create({ timestamp, sensorId, value, isOutThreshold }, { fields: ['timestamp', 'sensorId', 'value', 'isOutThreshold'] });
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getSensorById, getLastSavedValue, saveNewestValue };