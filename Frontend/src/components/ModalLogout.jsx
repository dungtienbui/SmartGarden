import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalLogout({ show, handleClose }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('loginValue');
        navigate('/login');
    };
    return (
        <Modal show={show} onHide={handleClose} centered size="sm" className="pb-5">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Đăng xuất</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có muốn đăng xuất không ?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Không
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                    Đăng xuất
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalLogout;
