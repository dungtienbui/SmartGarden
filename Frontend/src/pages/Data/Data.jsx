import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewestData } from '../../services/adafruitService';
import LiveClock from '../../components/LiveClock';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faDroplet, faLeaf, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import './Data.scss';

function Data() {
    const params = useParams();
    const sampleData = [
        {
            title: 'Cường độ ánh sáng',
            time: '',
            value: '',
            icon: <FontAwesomeIcon color="#FFF732" icon={faLightbulb} />,
        },
        {
            title: 'Độ ẩm đất',
            time: '',
            value: '',
            icon: <FontAwesomeIcon color="#44C7FF" icon={faDroplet} />,
        },
        {
            title: 'Độ ẩm không khí',
            time: '',
            value: '',
            icon: <FontAwesomeIcon color="#009957" icon={faLeaf} />,
        },
        {
            title: 'Nhiệt độ',
            time: '',
            value: '',
            icon: <FontAwesomeIcon color="#F32E28" icon={faTemperatureHigh} />,
        },
    ];
    const [envData, setEnvData] = useState(sampleData);
    useEffect(() => {
        const getData = async () => {
            const raw = await getNewestData(params.gardenId);
            let data = [...sampleData];
            data[0] = { ...sampleData[0], time: raw.brightness.time, value: raw.brightness.value };
            data[1] = { ...sampleData[1], time: raw.humidity1.time, value: raw.humidity1.value };
            data[2] = { ...sampleData[2], time: raw.humidity2.time, value: raw.humidity2.value };
            data[3] = { ...sampleData[3], time: raw.temperature.time, value: raw.temperature.value };
            setEnvData(data);
        };
        getData();
        const intervalId = setInterval(() => getData(), 5000);
        return () => clearInterval(intervalId);
    }, [params.gardenId]);

    return (
        <div className="data-page h-100 px-3 position-relative">
            <h3 className="title text-center py-3">Dữ liệu môi trường</h3>
            <div className="env-data px-3">
                {envData.map((data, index) => (
                    <div className="data-card d-flex p-3 my-2 justify-content-between rounded-4" key={index}>
                        <div className="data-info d-flex gap-4">
                            <div className="icon p-2 me-2 rounded-4">{data.icon}</div>
                            <div className="data">
                                <h4 className="title mt-2 mb-4">{data.title}</h4>
                                <p className="time d-inline fs-5">{data.time}</p>
                                <p className="value d-inline ms-5 fs-2 text-danger">{data.value}</p>
                            </div>
                        </div>
                        <div className="align-self-center me-5">
                            <button type="button" className="btn btn-outline-secondary fs-5">
                                Chi tiết
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <LiveClock className={'fs-4 text-secondary text-end mt-3 me-2'} />
        </div>
    );
}

export default Data;
