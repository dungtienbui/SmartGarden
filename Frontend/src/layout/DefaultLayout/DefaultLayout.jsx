import { NavLink } from 'react-router-dom';
import { privateRoutes } from '../../routes/routes.jsx';

import background from '../../assets/background.jpg';
import './DefaultLayout.scss';

function DefaultLayout({ children }) {
    return (
        <div className="default-layout" style={{ backgroundImage: `url(${background})` }}>
            <div className="header d-flex mb-3">
                <div className="pages m-auto  d-flex">
                    {privateRoutes.map(
                        (route, index) =>
                            route.title && (
                                <NavLink
                                    to={route.path}
                                    key={index}
                                    className={({ isActive }) =>
                                        isActive ? 'link d-block text-white px-5 active' : 'link d-block px-4 inactive'
                                    }
                                >
                                    {route.title}
                                </NavLink>
                            ),
                    )}
                </div>
            </div>
            <div className="container content">{children}</div>
        </div>
    );
}

export default DefaultLayout;
