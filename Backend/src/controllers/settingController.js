import webService from '../services/webService';

const serverErr = {
    EM: 'error from server',
    EC: -1,
    DT: ''
}

class settingController {
    async sendNotification(req, res) {
        try {
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            });
            const data = {
                EM: '',
                EC: 0,
                DT: 'hello'
            }

            res.write(`data: ${JSON.stringify(data)}\n\n`);
            const timerId = setInterval(() => {
                res.write(`data: ${JSON.stringify(data)}\n\n`);
            }, 5000);

            req.on('close', () => clearInterval(timerId));
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }
};

export default new settingController();