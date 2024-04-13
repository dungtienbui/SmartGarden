import thesholdService from '../services/thesholdService';


const serverErr = {
    EM: 'error from server',
    EC: -1,
    DT: ''
}

class thresholdController {

    test() {

    }

    //[Get] /value/:gardenId
    async getThresholdValueByGardenId(req, res) {

        const gardenId = parseInt(req.params.gardenId);

        if (!Number.isInteger(gardenId)) {
            return res.status(400).json({ error: 'Invalid gardenId' });
        }

        try {
            const data = await thesholdService.getThresholdValueByGardenId(gardenId);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } catch (error) {
            return res.status(500).json(serverErr)
        }
    }


    //[post] /update/:sensorType/:sensorType/:gardenId . post a object {upperValue, lowerValue}
    async updateThresholdOfGarden(req, res) {

        const gardenId = parseInt(req.params.gardenId);

        const sensorType = req.params.sensorType;

        const existSensorType = ['nhietdo', 'doamdat', 'doamkk', 'anhsang']

        if (!existSensorType.includes(sensorType)) {
            return res.status(444).json({ message: `Can't update because sensorTypeError` });
        }

        if (!Number.isInteger(gardenId)) {
            return res.status(400).json({ error: 'Invalid gardenId' });
        }

        const newUpper = typeof req.body.newUpper !== 'undefined' ? req.body.newUpper : null;
        const newLower = typeof req.body.newLower !== 'undefined' ? req.body.newLower : null;

        if (newUpper == null && newLower == null) {
            return res.status(444).json({ message: `Can't update because newUpper and newLower is null` });
        }

        try {
            const reponse = await thesholdService.updateThresholdOfGarden(gardenId, sensorType, newUpper, newLower);

            if (reponse.EC == 0) {
                if (reponse.DT != 0) {
                    return res.status(200).json({ message: `Threshold updated successfully: ${reponse.EM}` });
                } else {
                    return res.status(200).json({ message: "No have record to update" });
                }
            } else {
                return res.status(444).json({ message: `Has some error. ${reponse.EM}` });
            }

        } catch (error) {
            return res.status(500).json(serverErr);
        }
    }


};

export default new thresholdController();
