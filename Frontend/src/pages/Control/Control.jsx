import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { BsToggleOff } from 'react-icons/bs';
import { BsToggleOn } from 'react-icons/bs';

import bulb from '../../assets/bulb.svg';
import pump from '../../assets/pump.png';
import './Control.scss';

function Control() {
    const [envData, setEnvData] = useState([]);
    const [searchParams] = useSearchParams();
    const gardenId = searchParams.get('gardenId');
    useEffect(() => {
        const res1 = [
            {
                condition1: false,
                threshold1: false,
                value1: '3',
                total1: '3',

                condition2: true,
                threshold2: true,
                value2: '2',
                total2: '3',
            },
        ];
        if (gardenId == 'g1') {
            setEnvData(res1);
        } else {
            setEnvData(res1);
        }
    }, [gardenId]);

    const handleClick1 = (index) => {
        const updatedEnvData = [...envData];
        updatedEnvData[index].condition1 = !updatedEnvData[index].condition1;
        setEnvData(updatedEnvData);
    };

    const handleClick2 = (index) => {
        const updatedEnvData = [...envData];
        updatedEnvData[index].threshold1 = !updatedEnvData[index].threshold1;
        setEnvData(updatedEnvData);
    };

    const handleClick3 = (index) => {
        const updatedEnvData = [...envData];
        updatedEnvData[index].condition2 = !updatedEnvData[index].condition2;
        setEnvData(updatedEnvData);
    };

    const handleClick4 = (index) => {
        const updatedEnvData = [...envData];
        updatedEnvData[index].threshold2 = !updatedEnvData[index].threshold2;
        setEnvData(updatedEnvData);
    };

    return (
        <div className="control-page h-100 px-3 position-relative">
            <h3 className="title fw-normal text-center py-3">Cài đặt lịch trình</h3>
            <div className="env-control px-3">
                {envData.map((data, index) => (
                    <div key={index}>
                        <div className="control-bulb-card d-flex my-2 justify-content-between rounded-4">
                            <div className="bulb p-2">
                                <div className="icon p-2 rounded-4">
                                    <div className="default-layout" style={{ backgroundImage: `url(${bulb})` }}></div>
                                    <h4 className="title">đèn</h4>
                                </div>
                                <div className="bulb-set">
                                    <h5 className="title mt-1 mb-1">Cài đặt đèn</h5>
                                </div>
                            </div>

                            <div className="data ps-3">
                                <div className="title line-bt1">
                                    <div className="s">Trạng thái: {data.condition1 ? 'đang bật' : 'đang tắt'}</div>
                                    <div key={index} className="o" onClick={() => handleClick1(index)}>
                                        {data.condition1 ? (
                                            <BsToggleOn className="toggle" color="green" />
                                        ) : (
                                            <BsToggleOff className="toggle" color="red" />
                                        )}
                                    </div>
                                </div>
                                <div className="title line-bt1">
                                    <div className="s">Tự động bật đèn khi ánh sáng dưới: </div>
                                    <div key={index} className="o" onClick={() => handleClick2(index)}>
                                        {data.threshold1 ? (
                                            <BsToggleOn className="toggle" color="green" />
                                        ) : (
                                            <BsToggleOff className="toggle" color="red" />
                                        )}
                                    </div>
                                </div>
                                <div className="title">
                                    <div className="s">
                                        Lịch trình: {data.value1}/{data.total1}
                                    </div>
                                    <div className="t m-md-3 d-flex align-items-center justify-content-center">
                                        Thiết lập
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="control-bulb-card d-flex my-2 justify-content-between rounded-4" key={index}>
                            <div className="bulb p-2">
                                <div className="icon p-2 rounded-4">
                                    <div className="default-layout" style={{ backgroundImage: `url(${pump})` }}></div>
                                    <h4 className="title">máy bơm</h4>
                                </div>
                            </div>

                            <div className="data ps-3">
                                <div className="title line-bt1">
                                    <div className="s">Trạng thái: {data.condition2 ? 'đang bật' : 'đang tắt'}</div>
                                    <div key={index} className="o" onClick={() => handleClick3(index)}>
                                        {data.condition2 ? (
                                            <BsToggleOn className="toggle" color="green" />
                                        ) : (
                                            <BsToggleOff className="toggle" color="red" />
                                        )}
                                    </div>
                                </div>
                                <div className="title line-bt1">
                                    <div className="s">Tự động bật đèn khi ánh sáng dưới: </div>
                                    <div key={index} className="o" onClick={() => handleClick4(index)}>
                                        {data.threshold2 ? (
                                            <BsToggleOn className="toggle" color="green" />
                                        ) : (
                                            <BsToggleOff className="toggle" color="red" />
                                        )}
                                    </div>
                                </div>
                                <div className="title">
                                    <div className="s">
                                        Lịch trình: {data.value1}/{data.total1}
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
