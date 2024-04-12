import webService from '../services/webService';

const serverErr = {
    EM: 'error from server',
    EC: -1,
    DT: ''
}

class thresholdController {


    // async getAllSensor(req, res) {
    //     try {
    //         const data = await webService.getAllSensor(req.query.gardenId);
    //         return res.status(200).json({
    //             EM: data.EM,
    //             EC: data.EC,
    //             DT: data.DT
    //         })
    //     } catch (err) {
    //         return res.status(500).json(serverErr);
    //     }
    // }

    test() {

    }

    async getThresholdValueByGardenId(req, res) {
        try {
            const data = await webService.getThresholdValueByGardenId(req.query.gardenId);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } catch (error) {
            return res.status(500).json(serverErr)
        }
    }


    // async updateLightIntensiveThresholdOfGarden(req, res) {
    //     try {
    //         const data = await webService.updateLightIntensiveThresholdOfGarden(req.query.gardenId);
    //         return res.status(200).json({
    //             EM: data.EM,
    //             EC: data.EC,
    //             DT: data.DT
    //         })
    //     } catch (error) {
    //         return res.status(500).json(serverErr)
    //     }
    // }


};

export default new thresholdController();
