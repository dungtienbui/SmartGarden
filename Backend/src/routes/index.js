import userRouter from './user';
import gardenRouter from './garden';
import sensorRouter from './sensor';

const routes = (app) => {
    app.use('/user', userRouter);
    app.use('/garden', gardenRouter);
    app.use('/sensor', sensorRouter);
}

export default routes;