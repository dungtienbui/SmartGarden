import adafruitService from '../services/adafruitService';
import queryService from '../services/queryService';
import webService from '../services/webService';
require('dotenv').config()

const serverErr = {
    EM: 'error from server',
    EC: -1,
    DT: ''
}

const serverErr1 = {
    EM: 'error from server1',
    EC: -1,
    DT: ''
}

class deviceController {

    async getDeviceCondition(req, res) {
        try {
           const ddata = await webService.getLastDeviceCondition(req.query.device);
            if (ddata) {
                return res.status(200).json({
                    EM: ddata.EM,
                    EC: ddata.EC,
                    DT: ddata.DT
                });
            }
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }

    async postDeviceCondition(req, res) {
        try {
            const x = await adafruitService.postDeviceCondition(req.body.device,req.body.value );
            if (x) {
                return res.status(200).json({
                    EM: 'Post success',
                    EC: 0,
                    DT: x
                });
            }
        } catch (err) {
            return res.status(500).json(serverErr1);
        }
    }
    async getDeviceAppliedTh(req, res) {
        try {      
            let ddata = 0
            ddata = await queryService.getDeviceAppliedTh(req.query.device);
            return res.status(200).json({
                EM: 'Get success',
                EC: 0,
                DT: ddata
            });
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }

    async postDeviceAppliedTh(req, res) {
        try {
            await queryService.saveDeviceAppliedTh(req.body.device, req.body.value);
            return res.status(200).json({
                EM: 'Post success',
                EC: 0,
                DT: 1
            });
        } catch (err) {
            return res.status(500).json(serverErr1);
        }
    }

    async getPageOperationData(req, res) {
        try {
            const deviceId = req.params.deviceId;
            const { page, limit, start, end, operator, sortNew, state } = req.query;
            let from = start !== '' ? new Date(new Date(start).toLocaleString("en-US", {timeZone: "GMT"})) : null;
            let to = end !== '' ? new Date(new Date(end).toLocaleString("en-US", {timeZone: "GMT"})) : null;
            if (from && to) {
                if (start >= end) {
                    return res.json({
                        EM: "Ngày bắt đầu phải trước ngày kết thúc !",
                        EC: -1,
                        DT: [] 
                    });
                }
            }
            const pageData = await webService.getPageOperationData(deviceId, +page, +limit, from, to, operator, sortNew, state);
            if (pageData) {
                return res.status(200).json({
                    EM: pageData.EM,
                    EC: pageData.EC,
                    DT: pageData.DT 
                });
            }
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }

};

export default new deviceController();