import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types';
import { LOGIN_PATH } from '../../pages';

export const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { isLoading, hasError, user } = useSelector(store => store.profile);

    if (isLoading && !user.email)
        return (<h1>Пожайлуста, подождите ...</h1>);

    if (hasError || !user.email)
        return (<Navigate to={LOGIN_PATH} state={{ path: location }} replace />);

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};