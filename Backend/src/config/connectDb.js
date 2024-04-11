import Sequelize from 'sequelize';

const sequelize = new Sequelize('SmartGarden', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
})

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connect database succeed');
    } catch (err) {
        console.error('Connect database failed', err)
    }
}

export default connectDb;