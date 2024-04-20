import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getThresholdByGardenId } from '../../../services/thesholdService';
import ModalEditThreshold from './ModalEditThreshold';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faDroplet, faLeaf, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

import './SetGardenThreshold.scss';

function SetGardenThreshold() {
    const params = useParams();
    // console.log(params.gardenId)

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
        const fetchData = async () => {
            const typeSensor = {
                anhsang: 0,
                doamdat: 1,
                doamkk: 2,
                nhietdo: 3,
            };

            const typeValue = ['lowerValue', 'upperValue'];

            try {
                const response = await getThresholdByGardenId(params.gardenId);

                let raws = response.DT;

                let data = [...sampleData];

                // console.log(data[0])

                for (const raw of raws) {
                    data[typeSensor[raw.SensorId]][typeValue[raw.isUpperBound]] = raw.value;
                    data[typeSensor[raw.SensorId]]['unit'] = raw.unit;
                }

                // console.log(raws)
                // console.log(data)

                setThresholdData(data);
            } catch (error) {
                console.error('Error fetching garden:', error);
            }
        };
        fetchData();
    }, [toggleEditValue]);

    const navigate = useNavigate();

    const gobackSetting = () => {
        navigate('/setting/threshold-setting'); // "go-back"
    };

    return (
        <div className="set-garden-threshold-page h-100 px-5 bg-white rounded-4">
            <div className="title p-3 w-100 position-relative">
                <button className="btn btn-primary position-absolute" onClick={gobackSetting}>
                    Go Back
                </button>
                <h3 className="w-100 text-center">Ngưỡng giá trị môi trường</h3>
                <h4 className="text-center position-absolute end-0 top-50">Garden: {params.gardenId}</h4>
            </div>
            <div className="env-data px-3 mt-2 d-flex flex-column justify-content-around">
                {thresholdData.map((data, index) => (
                    <div className="data-card d-flex p-2 my-2 justify-content-between rounded-4" key={index}>
                        <div className="data-info d-flex gap-4 flex-fill">
                            <div className="icon p-2 me-2 rounded-4">{data.icon}</div>
                            <div className="data flex-fill">
                                <h4 className="title mt-2 mb-3">{data.title}</h4>
                                {/* <p className="time d-inline fs-5">{data.time}</p> */}
                                <p className="value d-inline fs-4 text-danger">
                                    Cận trên: {data.upperValue} {data.unit}
                                </p>
                                <p className="value d-inline ms-3 fs-4 text-danger">
                                    Cận dưới: {data.lowerValue} {data.unit}
                                </p>
                            </div>
                        </div>
                        <div className="align-self-center ms-3 me-3">
                            <ModalEditThreshold
                                objectSetting={{
                                    gardenId: params.gardenId,
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
