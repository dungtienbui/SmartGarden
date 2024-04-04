import { useNavigate } from 'react-router-dom';
import { checkUser } from '../services/userService';

function WrapPrivate({ children }) {
    const navigate = useNavigate();
    const checkUserLogin = async () => {
        const session = sessionStorage.getItem('loginValue');
        if (session) {
            const loginValue = JSON.parse(session);
            if (loginValue.username && loginValue.password) {
                const res = await checkUser(loginValue.username, loginValue.password);
                if (res && +res.EC === 0) {
                    return;
                }
            }
            sessionStorage.removeItem('loginValue');
        }
        navigate('/login');
    };
    checkUserLogin();

    return children;
}

export default WrapPrivate;
