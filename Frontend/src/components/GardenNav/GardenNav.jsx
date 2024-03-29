import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import './GardenNav.scss';

function GardenNav({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [gardenRoutes, setGardenRoutes] = useState([]);
    useEffect(() => {
        const path = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
        const res = [
            { path: path + '/g1', title: 'VƯỜN 1' },
            { path: path + '/g2', title: 'VUỜN 2' },
            { path: path + '/g3', title: 'VUỜN 3' },
        ];
        setGardenRoutes(res);
        navigate(res[0].path);
    }, []);
    return (
        <div className="row garden-nav-container">
            <div className="col-2 nav mt-5 me-3 d-flex flex-column align-items-end gap-4">
                {gardenRoutes.map((route, index) => (
                    <NavLink
                        to={route.path}
                        key={index}
                        className={({ isActive }) =>
                            isActive
                                ? 'link d-block fs-5 text-center text-white p-3 ps-4 active'
                                : 'link d-block bg-white bg-opacity-75 rounded-4 py-3 inactive'
                        }
                    >
                        {route.title}
                    </NavLink>
                ))}
            </div>
            <div className="col content h-100 bg-white rounded-4">{children}</div>
        </div>
    );
}

export default GardenNav;
