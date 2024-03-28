import Layout from '../layout/Layout';
import Home from '../pages/Home/Home';
import Control from '../pages/Control/Control';
import Statistic from '../pages/Statistic/Statistic';
import Setting from '../pages/Setting/Setting';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';

const privateRoutes = [
    { path: '/', component: Home, layout: Layout, title: 'GIÁM SÁT MÔI TRƯỜNG' },
    { path: '/control', component: Control, layout: Layout, title: 'ĐIỀU KHIỂN THIẾT BỊ' },
    { path: '/statistic', component: Statistic, layout: Layout, title: 'THỐNG KÊ' },
    { path: '/setting', component: Setting, layout: Layout, title: 'CÀI ĐẶT' },
    { path: '*', component: NotFound, layout: Layout },
];

const publicRoutes = [{ path: '/login', component: Login }];

export { privateRoutes, publicRoutes };
