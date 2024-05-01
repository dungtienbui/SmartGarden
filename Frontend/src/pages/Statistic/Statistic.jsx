import { useLocation, NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faDroplet, faLeaf, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import bulb from '../../assets/bulb.png';
import pump from '../../assets/pump.png';
import './Statistic.scss';

function Statistic() {
    const location = useLocation();
    const path = location.pathname + '/';

    const envData = [
        { id: 'anhsang', title: 'Cường độ ánh sáng', icon: faLightbulb, color: '#FCBB30' },
        { id: 'doamdat', title: 'Độ ẩm đất', icon: faDroplet, color: '#44C7FF' },
        { id: 'doamkk', title: 'Độ ẩm không khí', icon: faLeaf, color: '#1D9E67' },
        { id: 'nhietdo', title: 'Nhiệt độ', icon: faTemperatureHigh, color: '#F25550' },
    ];
    const dvData = [
        { id: 'den', name: 'Đèn', icon: bulb, color: '#FCA833' },
        { id: 'maybom', name: 'Máy bơm', icon: pump, color: '#44C7FF' },
    ];

    return (
        <div className="statistic-page px-5 pb-4 h-100 bg-white rounded-4">
            <h3 className="title text-center py-3">Thống kê</h3>
            <div className="content row gap-5 p-4 mx-3">
                <div className="col threshold-history border rounded-4 p-0">
                    <h4 className="text-center fw-normal pt-3">Lịch sử vượt ngưỡng</h4>
                    <hr />
                    <div className="buttons text-center mt-4 py-2">
                        {envData.map((data, index) => (
                            <NavLink
                                key={index}
                                className="btn d-block m-auto mb-3"
                                style={{ color: data.color }}
                                to={path + data.id + '?gardenId=1'}
                            >
                                <FontAwesomeIcon color={data.color} icon={data.icon} />
                                &nbsp;
                                {data.title}
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="col operation-history border rounded-4 p-0">
                    <h4 className="text-center fw-normal pt-3">Lịch sử hoạt động</h4>
                    <hr />
                    <div className="buttons text-center mt-4 py-2">
                        {dvData.map((data, index) => (
                            <NavLink
                                key={index}
                                className="btn px-3 py-2 mx-3"
                                style={{ color: data.color }}
                                to={path + data.id + '?gardenId=1'}
                            >
                                <img src={data.icon} /> <br />
                                {data.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistic;
