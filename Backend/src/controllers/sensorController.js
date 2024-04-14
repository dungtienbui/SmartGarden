import webService from '../services/webService';
require('dotenv').config()

const serverErr = {
    EM: 'error from server',
    EC: -1,
    DT: ''
}

class sensorController {

    async getAllSensor(req, res) {
        try {
            const allSensor = await webService.getAllSensor(req.query.gardenId);
            return res.status(200).json({
                EM: allSensor.EM,
                EC: allSensor.EC,
                DT: allSensor.DT
            })
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }

    async getSensorInfo(req, res) {
        try {
            const sensor = await webService.getSensorInfo(req.params.sensorId);
            return res.status(200).json({
                EM: sensor.EM,
                EC: sensor.EC,
                DT: sensor.DT
            })
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }

    async sendLastValue(req, res) {
        try {
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            });
            
            const lastValue = await webService.getLastValue(req.params.sensorId);
            let prev;
            if (lastValue.EC === 0){
                res.write(`data: ${JSON.stringify(lastValue.DT)}\n\n`);
                prev = lastValue.DT.timestamp;
            }
            const timerId = setInterval(async () => {
                const lastValue = await webService.getLastValue(req.params.sensorId);
                if (lastValue.EC === 0) {
                    if (lastValue.DT.timestamp > prev) {
                        res.write(`data: ${JSON.stringify(lastValue.DT)}\n\n`);
                        prev = lastValue.DT.timestamp;
                    }
                }
            }, process.env.TIME_INTERVAL);

            req.on('close', () => clearInterval(timerId));
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }

    async sendDataChart(req, res) {
        try {
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            });
            
            const rawData = await webService.getDataChart(req.params.sensorId, +req.query.limit);
            let prev;
            if (rawData.EC === 0){
                res.write(`data: ${JSON.stringify(rawData.DT)}\n\n`);
                prev = rawData.DT.time.findLast((t) => t);
            }
            const timerId = setInterval(async () => {
                const lastValue = await webService.getLastValue(req.params.sensorId);
                if (lastValue.EC === 0) {
                    if (lastValue.DT.timestamp > prev) {
                        const rawData = await webService.getDataChart(req.params.sensorId, +req.query.limit);
                        if (rawData.EC === 0){
                            res.write(`data: ${JSON.stringify(rawData.DT)}\n\n`);
                            prev = rawData.DT.time.findLast((t) => t !== '');
                        }
                    }
                }
            }, process.env.TIME_INTERVAL);

            req.on('close', () => clearInterval(timerId));
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }
};

export default new sensorController();