import gardenRouter from './garden';
import userRouter from './user';

const routes = (app) => {
    app.use('/user', userRouter);
    app.use('/garden', gardenRouter);
}

export default routes;