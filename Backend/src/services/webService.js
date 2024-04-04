import db from '../models';
import adafruitService from './adafruitService';

const getAllGarden = async () => {
    try {
        const allGarden = await db.Garden.findAll();
        if (allGarden) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: allGarden
            }
        }
    } catch (err) {
        console.log(err);
        return {
            EM: 'Error from service',
            EC: -2,
            DT: ''
        }
    }
}

module.exports = { getAllGarden };