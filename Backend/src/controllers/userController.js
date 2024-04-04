import userService from '../services/userService';

class userController {

    async checkUser(req, res) {
        try {
            const data = await userService.checkUser(req.body.username, req.body.password);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } catch (err) {
            return res.status(500).json({
                EM: 'error from server',
                EC: -1,
                DT: ''
            })
        }
    };
    
    async login(req, res) {
        try {
            const data = await userService.login(req.body.username, req.body.password);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } catch (err) {
            return res.status(500).json({
                EM: 'error from server',
                EC: -1,
                DT: ''
            })
        }
    };

    logout(req, res) {
        userService.logout();
        return res.status(200).json({
            EM: "Logout succeed",
            EC: 0,
            DT: ''
        })
    }
};

export default new userController();