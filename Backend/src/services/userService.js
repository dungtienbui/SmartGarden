import db from '../models';
import adafruitService from './adafruitService';
import bcrypt from 'bcryptjs';
const User = db.User;
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) =>{
    return bcrypt.hashSync(password, salt);
};

const checkUser = async (username, userpass) => {
    try {
        const userinfo = await User.findOne({ where: {username : username} });
        if (userinfo) {
            const check = bcrypt.compareSync(userpass, userinfo.password);
            if (check) {
                return {
                    EM: 'User Checked',
                    EC: 0,
                    DT: ''
                }
            }
        }
        return {
            EM: 'Invalid user',
            EC: 1,
            DT: ''
        }
    } catch (err){
        console.log(err);
        return {
            EM: 'Error from service',
            EC: -2,
            DT: ''
        }
    }
};

let timerId;
const login = async (username, userpass) => {
    try {
        const userinfo = await User.findOne({ where: {username : username} });
        if (userinfo) {
            const check = bcrypt.compareSync(userpass, userinfo.password);
            if (check) {
                timerId = setInterval(async () => {await adafruitService.getNewestData()}, 2000)
                return {
                    EM: 'Login succeed',
                    EC: 0,
                    DT: ''
                }
            }
        }
        return {
            EM: 'Wrong username or password !',
            EC: 1,
            DT: ''
        }
    } catch (err){
        console.log(err);
        return {
            EM: 'Error from service',
            EC: -2,
            DT: ''
        }
    }
};

const logout = () => {
    clearInterval(timerId);
}

module.exports = { hashPassword, checkUser, login, logout };