import webService from '../services/webService';

const serverErr = {
    EM: 'error from server',
    EC: -1,
    DT: ''
}

class sensorController {
    
    async getLastSavedValue(req, res) {
        try {
            const data = await webService.getLastSavedValue(req.params.sensorId);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            });
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }

    async getAllSensor(req, res) {
        try {
            const data = await webService.getAllSensor(req.query.gardenId);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }

    async getSensorInfo(req, res) {
        try {
            const data = await webService.getSensorInfo(req.params.sensorId);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }
};

export default new sensorController();