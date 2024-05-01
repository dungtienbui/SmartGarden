import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import OperationTable from './OperationTable/OperationTable';
import OutThresholdTable from './OutThresholdTable/OutThresholdTable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faLightbulb, faDroplet, faLeaf, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import bulb from '../../../assets/bulb.png';
import pump from '../../../assets/pump.png';
import './History.scss';

function History() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const [searchParams] = useSearchParams();
    const gardenId = searchParams.get('gardenId');

    const data = {
        anhsang: { title: 'Cường độ ánh sáng', icon: faLightbulb, color: '#FCBB30' },
        doamdat: { title: 'Độ ẩm đất', icon: faDroplet, color: '#44C7FF' },
        doamkk: { title: 'Độ ẩm không khí', icon: faLeaf, color: '#1D9E67' },
        nhietdo: { title: 'Nhiệt độ', icon: faTemperatureHigh, color: '#F25550' },
        den: { title: 'Đèn', icon: bulb, color: '#FCA833' },
        maybom: { title: 'Máy bơm', icon: pump, color: '#44C7FF' },
    };

    return (
        <div className="history-page h-100 px-4">
            <div className="title py-3 pb-2 w-100 position-relative">
                <button className="btn btn-secondary position-absolute" onClick={() => navigate('/statistic')}>
                    <FontAwesomeIcon icon={faAngleLeft} /> Trở về
                </button>
                <h3 className="w-100 text-center">
                    Lịch sử {['den', 'maybom'].includes(id) ? 'hoạt động' : 'vượt ngưỡng'}
                </h3>
            </div>
            <div className="content position-relative pe-3 pt-4">
                {['den', 'maybom'].includes(id) ? (
                    <>
                        <div className="col-4 position-absolute bottom-0 text-center mb-5 pe-3">
                            <div className="device p-3 rounded m-auto">
                                <img src={data[id].icon} /> <br />
                                <h4 className="m-0" style={{ color: data[id].color }}>
                                    {data[id].title}
                                </h4>
                            </div>
                        </div>
                        <OperationTable gardenId={gardenId} deviceId={id} color={data[id].color} />
                    </>
                ) : (
                    <>
                        <div className="col-4 position-absolute bottom-0 mb-5 pe-3">
                            <div className="icon p-2 rounded-4 m-auto">
                                <FontAwesomeIcon color={data[id].color} icon={data[id].icon} />
                            </div>
                            <h4 className="title mt-2 text-center">{data[id].title}</h4>
                        </div>
                        <OutThresholdTable gardenId={gardenId} sensorId={id} color={data[id].color} />
                    </>
                )}
            </div>
        </div>
    );
}

export default History;
