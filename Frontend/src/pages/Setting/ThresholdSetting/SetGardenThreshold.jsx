import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getAllSensor } from '../../../services/webService';
import LiveClock from '../../../components/LiveClock';
import ModalEditThreshold from './ModalEditThreshold';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faDroplet, faLeaf, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

import './SetGardenThreshold.scss';

function SetGardenThreshold() {
    const params = useParams();
    const sampleData = [
        {
            title: 'Cường độ ánh sáng',
            time: 'loading...',
            value: '400',
            unit: '',
            icon: <FontAwesomeIcon color="#FFF732" icon={faLightbulb} />,
        },
        {
            title: 'Độ ẩm đất',
            time: 'loading...',
            value: '',
            unit: '',
            icon: <FontAwesomeIcon color="#44C7FF" icon={faDroplet} />,
        },
        {
            title: 'Độ ẩm không khí',
            time: 'loading...',
            value: '',
            unit: '',
            icon: <FontAwesomeIcon color="#009957" icon={faLeaf} />,
        },
        {
            title: 'Nhiệt độ',
            time: 'loading...',
            value: '',
            unit: '',
            icon: <FontAwesomeIcon color="#F32E28" icon={faTemperatureHigh} />,
        },
    ];
    const [envData, setEnvData] = useState(sampleData);
    useEffect(() => {
        let stopGetting = false;
        const getUnit = async () => {
            const sensorIds = ['anhsang', 'doamdat', 'doamkk', 'nhietdo'];
            const raw = await getAllSensor(1);
            let data = [...sampleData];
            for (let i = 0; i < sensorIds.length; i++) {
                data[i].unit = raw.DT[i].unit;
            }
        };
        const getData = async () => {
            const raw = await getNewestData(params.gardenId);
            let data = [...sampleData];
            for (let i = 0; i < raw.length; i++) {
                data[i] = { ...data[i], time: raw[i].time, value: raw[i].value };
            }
            if (!stopGetting) {
                setEnvData(data);
            }
        };
        getUnit();
        getData();
        const intervalId = setInterval(() => getData(), 2000);
        return () => {
            clearInterval(intervalId);
            setEnvData(sampleData);
            stopGetting = true;
        };
    }, [params.gardenId]);

    const navigate = useNavigate();

    const gobackSetting = () => {
        navigate('/setting/threshold-setting'); // "go-back"
    };

    return (
        <div className="setting-page position-relative h-100 px-5 bg-white rounded-4">
            <div className="title p-3 w-100 position-relative">
                <button className="btn btn-primary position-absolute" onClick={gobackSetting}>
                    Go Back
                </button>
                <h3 className="w-100 text-center">Ngưỡng giá trị môi trường</h3>
            </div>
            <div className="env-data px-3 mt-2 d-flex flex-column justify-content-around">
                {envData.map((data, index) => (
                    <div className="data-card d-flex p-2 my-2 justify-content-between rounded-4" key={index}>
                        <div className="data-info d-flex gap-4 flex-fill">
                            <div className="icon p-2 me-2 rounded-4">{data.icon}</div>
                            <div className="data flex-fill">
                                <h4 className="title mt-2 mb-3">{data.title}</h4>
                                {/* <p className="time d-inline fs-5">{data.time}</p> */}
                                <p className="value d-inline ms-3 fs-4 text-danger">
                                    Cận trên: {data.value} {data.unit}
                                </p>
                                <p className="value d-inline ms-3 fs-4 text-danger">
                                    Cận dưới: {data.value} {data.unit}
                                </p>
                            </div>
                        </div>
                        <div className="align-self-center ms-3 me-3">
                            <ModalEditThreshold objectSetting={{ name: data.title }} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="position-absolute bottom-0 end-0 m-4">
                <LiveClock className={'fs-4 text-secondary text-end mt-3 me-2'}/>
            </div>
        </div>
    );
}

export default SetGardenThreshold;
