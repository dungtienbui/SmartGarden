import { NavLink } from 'react-router-dom';
import { privateRoutes } from '../routes/routes';
import background from '../assets/background.jpg';
import './Layout.scss';

function Layout({ children }) {
    return (
        <div className="layout" style={{ backgroundImage: `url(${background})` }}>
            <div className="header d-flex">
                <div className="pages m-auto d-flex">
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

export default Layout;
