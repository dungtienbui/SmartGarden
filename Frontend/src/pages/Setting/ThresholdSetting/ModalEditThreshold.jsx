// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// function modalEditThreshold(prop) {
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     return (
//         <>
//             <Button variant="primary" onClick={handleShow}>
//                 Chỉnh sửa
//             </Button>

//             <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Chỉnh sửa ngưỡng: {prop.objectSetting.name}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>

//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Huỷ
//                     </Button>
//                     <Button variant="primary">Lưu</Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

// export default modalEditThreshold;

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalEditThreshold(prop) {
    const [show, setShow] = useState(false);
    const [upperBound, setUpperBound] = useState(0);
    const [lowerBound, setLowerBound] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = () => {
        // Xử lý khi người dùng lưu dữ liệu

        if (parseInt(upperBound) > parseInt(lowerBound)) {
            // Xử lý khi người dùng lưu dữ liệu
            console.log('Giá trị cận trên:', upperBound);
            console.log('Giá trị cận dưới:', lowerBound);
            handleClose();
        } else {
            // Hiển thị thông báo lỗi nếu giá trị cận trên không lớn hơn giá trị cận dưới
            alert('Giá trị cận trên phải lớn hơn giá trị cận dưới!');
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Chỉnh sửa
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa ngưỡng: {prop.objectSetting.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Ô nhập số liệu */}
                    <div className="form-edit d-flex flex-row justify-content-center align-items-center">
                        <div className="label-part d-flex flex-column justify-content-center align-items-center">
                            <label for="upper-bound" className="m-2 fs-4">
                                Cận trên:
                            </label>
                            <label for="lower-bound" className="m-2 fs-4">
                                Cận dưới:
                            </label>
                        </div>
                        <div className="input-part d-flex flex-column fs-4 justify-content-center align-items-center">
                            <input
                                className="border m-2"
                                id="upper-bound"
                                type="number"
                                value={upperBound}
                                onChange={(e) => {setUpperBound(e.target.value)}}
                                placeholder="123"
                            />
                            <input
                                className="border m-2"
                                id="lower-bound"
                                type="number"
                                value={lowerBound}
                                onChange={(e) => {setLowerBound(e.target.value)}}
                                placeholder="123"
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Huỷ
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditThreshold;
