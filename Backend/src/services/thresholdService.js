import db from '../models';

const serviceErr = {
    EM: 'Error from service',
    EC: -2,
    DT: ''
}


// Threshold value
// return: {message, code, data: thresholdData}
const getThresholdValueByGardenId = async (GardenId) => {
    try {
        const thresholdValue = await db.Threshold.findAll({ where: { GardenId }, raw: true });
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

// in: GardenId, SensorId, upperValue, lowerValue
// update threshold value with SensorIdId
// return: {message, code, data: rowAffected}
// SensorId: nhietdo, doamdat, doamkk, anhsang
const updateThresholdOfGarden = async (GardenId, SensorId, newUpper, newLower) => {
    const existSensorId = ['nhietdo', 'doamdat', 'doamkk', 'anhsang']
    if (!existSensorId.includes(SensorId)){
        console.log('not find SensorIdId');
        return {
            EM: 'Error: not find SensorIdId',
            EC: -2,
            DT: ''
        }
    }

    try {

        let updatedUpper = null
        let updatedLower = null

        if (newUpper != null){
            updatedUpper = await db.Threshold.update({ value: newUpper }, { where: { GardenId: GardenId, SensorId: SensorId, isUpperBound: true } });
        }

        if (newLower != null){
            updatedLower = await db.Threshold.update({ value: newLower }, { where: { GardenId: GardenId, SensorId: SensorId, isUpperBound: false } });
        }

        // console.log(updatedLower)
        // console.log(updatedUpper)

        if (updatedUpper == null && updatedLower == null){
            return {
                EM: 'don\'t have updated: both newUpper is null and newLower is null',
                EC: -2,
                DT: 0
            }
        } else if (updatedLower == null){
            return {
                EM: 'Upperbound has been Updated. newLower is null',
                EC: 0,
                DT: updatedUpper[0]
            }
        } else if (updatedUpper == null){
            return {
                EM: 'Lowerbound has been Updated. newUpper is null',
                EC: 0,
                DT: updatedLower[0]
            }
        }else{
            return {
                EM: 'update succeed: both Lowerbound and Upperbound has been Updated',
                EC: 0,
                DT: updatedUpper[0] + updatedLower[0]
            }
        }

    } catch (err) {
        console.log(err);
        return serviceErr
    }

}


module.exports = { getThresholdValueByGardenId, updateThresholdOfGarden };