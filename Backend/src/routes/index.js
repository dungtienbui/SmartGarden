import homeRouter from './home';

const routes = (app) => {
    return app.use('/', homeRouter);
}

module.exports = routes;