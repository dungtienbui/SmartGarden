import db from '../models';
const User = db.User;

const getNewestData = async () => {
    await User.findAll();
}

module.exports = { getNewestData };