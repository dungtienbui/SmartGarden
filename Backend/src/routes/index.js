import userRouter from './user';
import gardenRouter from './garden';
import sensorRouter from './sensor';
import settingRouter from './setting';
import thresholdRouter from './threshold';

const routes = (app) => {
    app.use('/user', userRouter);
    app.use('/garden', gardenRouter);
    app.use('/sensor', sensorRouter);
    app.use('/setting', settingRouter);
    app.use('/threshold', thresholdRouter)
}

export default routes;