import './Setting.scss';
import { useNavigate } from 'react-router-dom';
import { getAllGarden } from '../../services/webService';
import React, { useEffect, useState } from 'react';
import LiveClock from '../../components/LiveClock';


function Setting() {
    const navigate = useNavigate();

    const handleThresholdValuesClick = () => {
        navigate('/setting/threshold-setting'); // "threshold-values"
    };

    const handleAccountSettingsClick = () => {
        navigate('/setting/account-settings'); // "account-settings"
    };


    return (
        <div className="setting-page position-relative h-100 px-5 bg-white rounded-4">
            <h3 className="title text-center py-3">Cài đặt</h3>
            {/* Main content */}
            <div className="w-100 h-75 d-flex flex-column justify-content-center align-items-center">
                
                {/* threshold */}
                <button className="FeatureBox" onClick={() => handleThresholdValuesClick()}>
                    Cài đặt giá trị ngưỡng
                </button>

                {/* account */}
                <button className="FeatureBox" onClick={() => handleAccountSettingsClick()}>
                    Cài đặt tài khoản
                </button>
            </div>

            <div className='position-absolute bottom-0 end-0 m-4'>
                <LiveClock className={'fs-4 text-secondary text-end mt-3 me-2'}/>
            </div>
        </div>
    );
}

export default Setting;
