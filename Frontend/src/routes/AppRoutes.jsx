import { Navigate } from 'react-router-dom';

import WrapPrivate from './WrapPrivate';
import DefaultLayout from '../layout/DefaultLayout';
import Data from '../pages/Data/Data';
import Control from '../pages/Control/Control';
import Statistic from '../pages/Statistic/Statistic';
import Setting from '../pages/Setting/Setting';
import ThresholdSetting from '../pages/Setting/ThresholdSetting/ThresholdSetting';
import SetGardenThreshold from '../pages/Setting/ThresholdSetting/SetGardenThreshold';
import Login from '../pages/LoginRegister/Login';
import Register from '../pages/LoginRegister/Register';
import GardenNav from '../layout/GardenNav/GardenNav';

const privateRoutes = [
    { path: '/', component: () => <Navigate to="/login" />, layout: DefaultLayout },
    {
        path: '/data',
        component: () => <Navigate to="/data/1" />,
        layout: DefaultLayout,
        title: 'GIÁM SÁT MÔI TRƯỜNG',
    },
    {
        path: '/data/:gardenId',
        component: () => <WrapPrivate children={<GardenNav children={<Data />} />} />,
        layout: DefaultLayout,
    },
    {
        path: '/control',
        component: () => <Navigate to="/control/1" />,
        layout: DefaultLayout,
        title: 'ĐIỀU KHIỂN THIẾT BỊ',
    },
    {
        path: '/control/:gardenId',
        component: () => <WrapPrivate children={<GardenNav children={<Control />} />} />,
        layout: DefaultLayout,
    },
    {
        path: '/statistic',
        component: () => <Navigate to="/statistic/1" />,
        layout: DefaultLayout,
        title: 'THỐNG KÊ',
    },
    {
        path: '/statistic/:gardenId',
        component: () => <WrapPrivate children={<GardenNav children={<Statistic />} />} />,
        layout: DefaultLayout,
    },
    {
        path: '/setting',
        component: () => <WrapPrivate children={<Setting />} />,
        layout: DefaultLayout,
        title: 'CÀI ĐẶT',
    },
    {
        path: 'setting/threshold-setting',
        component: () => <WrapPrivate children={<ThresholdSetting />} />,
        layout: DefaultLayout,
    },
    {
        path: 'setting/threshold-setting/:gardenId',
        component: () => <WrapPrivate children={<SetGardenThreshold />} />,
        layout: DefaultLayout,
    },
];

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

export { privateRoutes, publicRoutes };
