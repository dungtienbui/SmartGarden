import adafruitService from './adafruitService';
import db from '../models';
import bcrypt from 'bcryptjs';
const User = db.User;
const salt = bcrypt.genSaltSync(10);
require('dotenv').config()

const serviceErr = { 
    EM: 'Error from service',
    EC: -2,
    DT: ''
}

const hashPassword = (password) =>{
    return bcrypt.hashSync(password, salt);
};

const login = async (username, userpass) => {
    try {
        const userinfo = await User.findOne({ where: {username} });
        if (userinfo) {
            const check = bcrypt.compareSync(userpass, userinfo.password);
            if (check) {
                return {
                    EM: 'Login succeed',
                    EC: 0,
                    DT: ''
                }
            }
        }
        return {
            EM: 'Wrong username or password !',
            EC: -1,
            DT: ''
        }
    } catch (err){
        console.log(err);
        return serviceErr
    }
};

module.exports = { hashPassword, login };