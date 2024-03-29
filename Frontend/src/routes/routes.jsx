import { Navigate } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout/DefaultLayout';
import LoginLayout from '../layout/LoginLayout/LoginLayout';
import Data from '../pages/Data/Data';
import Control from '../pages/Control/Control';
import Statistic from '../pages/Statistic/Statistic';
import Setting from '../pages/Setting/Setting';
import Login from '../pages/LoginRegister/Login/Login';
import Register from '../pages/LoginRegister/Register/Register';
import NotFound from '../pages/NotFound/NotFound';
import GardenNav from '../components/GardenNav/GardenNav';

const privateRoutes = [
    { path: '/', component: () => <Navigate to="/data" />, layout: DefaultLayout },
    {
        path: '/data',
        component: () => <Navigate to="/data/g1" />,
        layout: DefaultLayout,
        title: 'GIÁM SÁT MÔI TRƯỜNG',
    },
    {
        path: '/data/:gardenId',
        component: () => <GardenNav children={<Data />} />,
        layout: DefaultLayout,
    },
    {
        path: '/control',
        component: () => <Navigate to="/control/g1" />,
        layout: DefaultLayout,
        title: 'ĐIỀU KHIỂN THIẾT BỊ',
    },
    {
        path: '/control/:gardenId',
        component: () => <GardenNav children={<Control />} />,
        layout: DefaultLayout,
    },
    {
        path: '/statistic',
        component: () => <Navigate to="/statistic/g1" />,
        layout: DefaultLayout,
        title: 'THỐNG KÊ',
    },
    {
        path: '/statistic/:gardenId',
        component: () => <GardenNav children={<Statistic />} />,
        layout: DefaultLayout,
    },
    { path: '/setting', component: Setting, layout: DefaultLayout, title: 'CÀI ĐẶT' },
    { path: '*', component: NotFound, layout: DefaultLayout },
];

const publicRoutes = [
    { path: '/login', component: Login, layout: LoginLayout },
    { path: '/register', component: Register, layout: LoginLayout },
];

export { privateRoutes, publicRoutes };
