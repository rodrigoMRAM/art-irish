import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';


const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    return logout;
};

export default useLogout;