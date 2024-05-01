import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { getThresholdBySensorId } from '../../../services/thesholdService';
import { getAllSensor } from '../../../services/webService';
import ModalEditThreshold from './ModalEditThreshold';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faLightbulb, faDroplet, faLeaf, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

import './SetGardenThreshold.scss';

function SetGardenThreshold() {
    const [searchParams] = useSearchParams();
    const gardenId = searchParams.get('gardenId');

    // [1 : anhsang] [2: doamdat] [3: doamkk] [4: nhietdo]
    const sampleData = [
        {
            id: 'anhsang',
            title: 'Cường độ ánh sáng',
            upperValue: '0',
            lowerValue: '0',
            unit: 'Lux',
            max: 9999,
            min: 0,
            icon: <FontAwesomeIcon color="#FFF732" icon={faLightbulb} />,
        },
        {
            id: 'doamdat',
            title: 'Độ ẩm đất',
            upperValue: '0',
            lowerValue: '0',
            unit: '%',
            max: 100,
            min: 0,
            icon: <FontAwesomeIcon color="#44C7FF" icon={faDroplet} />,
        },
        {
            id: 'doamkk',
            title: 'Độ ẩm không khí',
            upperValue: '0',
            lowerValue: '0',
            unit: '%',
            max: 100,
            min: 0,
            icon: <FontAwesomeIcon color="#009957" icon={faLeaf} />,
        },
        {
            id: 'nhietdo',
            title: 'Nhiệt độ',
            upperValue: '0',
            lowerValue: '0',
            unit: '°C',
            max: 100,
            min: -273,
            icon: <FontAwesomeIcon color="#F32E28" icon={faTemperatureHigh} />,
        },
    ];

    const [thresholdData, setThresholdData] = useState([]);
    const [toggleEditValue, setToggleEditValue] = useState(false);

    useEffect(() => {
        const fetchSensorInfoOfAGardan = async () => {
            const response = await getAllSensor(gardenId);
            setSensorList(response.DT);
            console.log(response);
        };
        fetchSensorInfoOfAGardan();
    }, []);

    const sensor_id_list = ['anhsang', 'doamdat', 'doamkk', 'nhietdo'];

    useEffect(() => {
        const fetchDataOfAthreshold = async () => {
            const typeSensor = {
                anhsang: 0,
                doamdat: 1,
                doamkk: 2,
                nhietdo: 3,
            };
            let data = [...sampleData];
            try {
                for (const sensor_id of sensor_id_list) {
                    const response = await getThresholdBySensorId(sensor_id);
                    const thresholdOfASensor = response.DT;

                    data[typeSensor[thresholdOfASensor.SensorId]]['upperValue'] = thresholdOfASensor.upperBound;
                    data[typeSensor[thresholdOfASensor.SensorId]]['lowerValue'] = thresholdOfASensor.lowerBound;
                }
                setThresholdData(data);
            } catch (error) {
                console.error('Error fetching threshold of a function: ', error);
            }
        };

        fetchDataOfAthreshold();
    }, [toggleEditValue]);

    const navigate = useNavigate();
    const gobackSetting = () => {
        navigate('/setting');
    };

    return (
        <div className="set-garden-threshold-page h-100 px-4 bg-white rounded-4">
            <div className="title py-3 pb-2 w-100 position-relative">
                <button className="btn btn-secondary position-absolute" onClick={gobackSetting}>
                    <FontAwesomeIcon icon={faAngleLeft} /> Trở về
                </button>
                <h3 className="w-100 text-center">Ngưỡng giá trị môi trường</h3>
            </div>
            <div className="env-data px-3 mt-2 d-flex flex-column justify-content-around">
                {thresholdData.map((data, index) => (
                    <div className="data-card d-flex p-3 justify-content-between rounded-4" key={index}>
                        <div className="data-info d-flex gap-4 flex-fill">
                            <div className="icon p-2 me-2 rounded-4">{data.icon}</div>
                            <div className="data flex-fill">
                                <h4 className="title mt-2 mb-3">{data.title}</h4>
                                <div className="d-flex gap-3 pt-1">
                                    <p className="upper p-1 m-0 fs-5 text-danger text-center border">
                                        Cận trên: {data.upperValue} {data.unit}
                                    </p>
                                    <p className="lower p-1 m-0 fs-5 text-danger text-center border">
                                        Cận dưới: {data.lowerValue} {data.unit}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="align-self-center ms-3 me-5">
                            <ModalEditThreshold
                                objectSetting={{
                                    sensorId: data.id,
                                    currUpper: data.upperValue,
                                    currLower: data.lowerValue,
                                    max: data.max,
                                    min: data.min,
                                }}
                                setToggleEditValue={setToggleEditValue}
                                toggleEditValue={toggleEditValue}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SetGardenThreshold;
