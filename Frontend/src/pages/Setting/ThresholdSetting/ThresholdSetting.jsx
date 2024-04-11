import './ThresholdSetting.scss';
import { useNavigate } from 'react-router-dom';
import { getAllGarden } from '../../../services/webService';
import React, { useEffect, useState } from 'react';
import LiveClock from '../../../components/LiveClock';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';

function ThresholdSetting() {
    const [gardenData, setGardenData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllGarden();
                setGardenData(response.DT); // Cập nhật giá trị của gardenData với dữ liệu từ response
            } catch (error) {
                console.error('Error fetching garden:', error);
            }
        };
        fetchData();
    }, []);

    const navigate = useNavigate();

    const gobackSetting = () => {
        navigate('/setting'); // "go-back"
    };

    const goThresholdSettingPacticularGarden = (id) => {
        navigate('/setting/threshold-setting/' + id.toString()); // "go-back"
    };

    console.log(gardenData);
    return (
        <div className="setting-page h-100 px-5 bg-white rounded-4 position-relative">
            <div className="title p-3 w-100 position-relative">
                <button className="btn btn-primary position-absolute" onClick={gobackSetting}>
                    Go Back
                </button>
                <h3 className="w-100 text-center">Cài đặt giá trị ngưỡng</h3>
            </div>
            {/* Main content */}
            <div className="main-content">
                <div className="">
                    <h5 className="text-center">Vui lòng chọn khu vườn cần cài đặt giá trị ngưỡng!</h5>
                </div>
                <div className="list-garden d-flex flex-row">
                    {gardenData.map((garden, index) => (
                        <div
                            key={index}
                            className="garden-item"
                            onClick={() => goThresholdSettingPacticularGarden(garden.id)}
                        >
                            <div className="garden-selection">
                                <div className="garden-icon p-2 m-2 rounded-4">
                                    <FontAwesomeIcon className="actualIcon" icon={faSeedling} />
                                </div>
                                <h6 className="text-center garden-name">{garden.name}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='position-absolute bottom-0 end-0 m-4'>
                <LiveClock className={'fs-4 text-secondary text-end mt-3 me-2'}/>
            </div>
        </div>
    );
}

export default ThresholdSetting;
