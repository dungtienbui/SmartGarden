import userService from '../services/userService';

class homeController {
    async getAllValue(req, res) {
        await userService.getAllValue('a', 'b', 'c')
        res.send("hello")
    }
}

module.exports = new homeController();