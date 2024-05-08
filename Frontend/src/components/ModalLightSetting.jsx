import { useEffect, useState } from 'react';
import { getSensorInfo, getBulbSetting, setBulbSetting } from '../services/webService';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalLightSetting({ show, handleClose }) {
    const [unit, setUnit] = useState('');
    const [settingValue, setSettingValue] = useState({ color: '', intensity: 0 });

    const colors = ['#ffffff', '#ff0000', '#00ff00', '#ffff00', '#0000ff'];
    const handleSubmit = async () => {
        if (settingValue.intensity > 2000) alert('Cường độ ánh sáng không được lớn hơn 2000 ' + unit);
        await setBulbSetting(settingValue.color, settingValue.intensity);
        handleClose(false);
    };

    useEffect(() => {
        const getUnit = async () => {
            const raw = await getSensorInfo('anhsang');
            if (raw.EC === 0) setUnit(raw.DT.unit);
        };
        const getSetting = async () => {
            const raw = await getBulbSetting();
            if (raw.EC === 0) setSettingValue(raw.DT);
        };
        getUnit();
        getSetting();
    }, [show]);

    return (
        <Modal show={show} onHide={handleClose} centered className="modal-light-setting pb-5">
            <Modal.Header style={{ backgroundColor: '#fdd71c' }}>
                <Modal.Title className="m-auto">Cài đặt đèn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container px-4 py-2 ms-2">
                    <div className="row align-items-center mt-2">
                        <h5 className="fw-normal col-5 p-0">Màu sắc ánh sáng:</h5>
                        <div className="col d-flex justify-content-between px-3">
                            {colors.map((color, index) => (
                                <div
                                    className={
                                        color === settingValue.color
                                            ? 'p-3 rounded border border-2 border-secondary'
                                            : 'p-3 rounded border border-2 border-white'
                                    }
                                    style={{
                                        backgroundColor: color === '#ffffff' ? '#f6f6f6' : color,
                                        cursor: 'pointer',
                                    }}
                                    key={index}
                                    onClick={() => setSettingValue({ ...settingValue, color: colors[index] })}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <div className="row align-items-center mt-4">
                        <label htmlFor="intensity" className="fs-5 col-6 m-0 p-0">
                            Độ sáng &#40;&#8804;2000 lux&#41;:
                        </label>
                        <div className="col row align-items-center ms-1">
                            <input
                                type="number"
                                id="intensity"
                                className="form-control col m-0 fs-5"
                                style={{ backgroundColor: '#e8f0fe' }}
                                value={settingValue.intensity}
                                onChange={(e) => setSettingValue({ ...settingValue, intensity: e.target.value })}
                            />
                            <p className="fs-5 col m-0">{unit}</p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="footer">
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="warning" onClick={handleSubmit}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalLightSetting;
