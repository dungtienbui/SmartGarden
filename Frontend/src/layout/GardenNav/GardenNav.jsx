import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getAllGarden } from '../../services/webService';

import './GardenNav.scss';

function GardenNav({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [gardenRoutes, setGardenRoutes] = useState([]);
    useEffect(() => {
        const path = location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1);
        const getGardens = async () => {
            let res = await getAllGarden();
            console.log(res)
            let gardens;
            if (res && res.EC === 0) {
                gardens = res.DT.map((garden) => {
                    return { path: path + garden.id.toString(), title: garden.name };
                });
            } else {
                gardens = [
                    { path: path + '/1', title: 'VƯỜN 1' },
                    { path: path + '/2', title: 'VUỜN 2' },
                    { path: path + '/3', title: 'VUỜN 3' },
                ];
            }
            setGardenRoutes(gardens);
            navigate(gardens[0].path);
        };
        getGardens();
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
