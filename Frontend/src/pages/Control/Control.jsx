import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    getdvcondition,
    changedevice,
    changeappliedThreshold,
    getdvappliedThreshold,
} from '../../services/deviceService';

import { BsToggleOff, BsToggleOn } from 'react-icons/bs';

import bulb from '../../assets/bulb.svg';
import pump from '../../assets/pump.png';
import './Control.scss';

function Control() {
    const [searchParams] = useSearchParams();
    const gardenId = searchParams.get('gardenId');

    const [appliedThreshold, setAppliedThreshold] = useState({ den: 0, maybom: 0 });
    const [deviceState, setDeviceState] = useState({ den: 0, maybom: 0 });
    const [skip, setSkip] = useState(false);
    const dvData = [
        {
            dvId: 'den',
            title: 'đèn',
            condition: deviceState.den,
            threshold: appliedThreshold.den,
            icon: bulb,
            color: '#FCA833',
            value: '0',
            total: '3',
        },
        {
            dvId: 'maybom',
            title: 'máy bơm',
            condition: deviceState.maybom,
            threshold: appliedThreshold.maybom,
            icon: pump,
            color: '#44C7FF',
            value: '0',
            total: '3',
        },
    ];

    useEffect(() => {
        const dv = ['den', 'maybom'];
        const getIsAppliedThreshold = async () => {
            let data = { ...appliedThreshold };
            for (let i = 0; i < dv.length; i++) {
                const raw = await getdvappliedThreshold(gardenId, dv[i]);
                data[dv[i]] = raw;
            }
            setAppliedThreshold(data);
        };
        getIsAppliedThreshold();
    }, [gardenId]);

    useEffect(() => {
        const dv = ['den', 'maybom'];
        let stopGetting = false;
        const getData = async () => {
            let data = { ...deviceState };
            for (let i = 0; i < dv.length; i++) {
                const raw = await getdvcondition(gardenId, dv[i]);
                data[dv[i]] = raw.state;
            }
            if (!stopGetting && skip) {
                setDeviceState(data);
            }
        };
        getData();
        const intervalId = setInterval(() => getData(), 2000);
        return () => {
            clearInterval(intervalId);
            setDeviceState({ den: 0, maybom: 0 });
            stopGetting = true;
        };
    }, [gardenId]);

    const handleClick1 = async (dvId) => {
        const updatedCondition = { ...deviceState };
        updatedCondition[dvId] = 1 - updatedCondition[dvId];
        setSkip(true);
        setDeviceState(updatedCondition);
        setSkip(false);
        await changedevice(dvId, updatedCondition[dvId]);
    };

    const handleClick2 = async (dvId) => {
        const updatedThreshold = { ...appliedThreshold };
        updatedThreshold[dvId] = 1 - updatedThreshold[dvId];
        setAppliedThreshold(updatedThreshold);
        await changeappliedThreshold(dvId, updatedThreshold[dvId]);
    };

    return (
        <div className="control-page h-100 px-4 position-relative">
            <h3 className="title text-center py-3">Điều khiển thiết bị</h3>
            <div className="env-control px-3">
                {dvData.map((data, index) => (
                    <div key={index}>
                        <div className="control-bulb-card d-flex p-2 pe-0 my-3 justify-content-between rounded-4">
                            <div className="bulb p-2">
                                <div className="icon p-2 rounded-4">
                                    <img className="default-layout" src={data.icon} alt={data.title} />
                                    <h4 className="title" style={{ color: data.color }}>
                                        {data.title}
                                    </h4>
                                </div>
                                {data.dvId === 'den' && (
                                    <div className="bulb-set">
                                        <h5 className="title mt-1 mb-1 fw-normal">Cài đặt {data.title}</h5>
                                    </div>
                                )}
                            </div>
                            <div className="data ps-3">
                                <div className="title py-1 line-bt1">
                                    <div className="s">
                                        Trạng thái: {data.condition === 1 ? 'đang bật' : 'đang tắt'}
                                    </div>
                                    <div className="form-check form-switch me-3">
                                        <input
                                            className="form-check-input fs-3"
                                            type="checkbox"
                                            role="switch"
                                            checked={data.condition}
                                            onChange={() => handleClick1(data.dvId)}
                                        />
                                    </div>
                                </div>
                                <div className="title py-1 line-bt1">
                                    <div className="s">
                                        Tự động bật/tắt {data.title} khi vượt ngưỡng:
                                        {data.threshold === 1 ? ' bật' : ' tắt'}
                                    </div>
                                    <div className="form-check form-switch me-3">
                                        <input
                                            className="form-check-input fs-3"
                                            type="checkbox"
                                            role="switch"
                                            checked={data.threshold}
                                            onChange={() => handleClick2(data.dvId)}
                                        />
                                    </div>
                                </div>
                                <div className="title py-1">
                                    <div className="s">
                                        Lịch trình: {data.value}/{data.total}
                                    </div>
                                    <div className="t m-md-3 d-flex align-items-center justify-content-center">
                                        Thiết lập
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Control;
