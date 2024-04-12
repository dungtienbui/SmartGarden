import userService from '../services/userService';

const serverErr = {
    EM: 'error from server',
    EC: -1,
    DT: ''
};

class userController {
    
    async login(req, res) {
        try {
            const data = await userService.login(req.body.username, req.body.password);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            });
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    };

    logout(req, res) {
        try {
            userService.logout();
            return res.status(200).json({
                EM: "Logout succeed",
                EC: 0,
                DT: ''
            });
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }
};

export default new userController();