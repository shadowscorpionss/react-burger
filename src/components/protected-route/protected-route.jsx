import { useDispatch, useSelector } from 'react-redux';
import { getProfileData } from '../../services/actions/profile/get-profile-data';
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { LOGIN_PATH } from '../../pages';


export const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { isLoading, hasError, user: { isLogedIn } } = useSelector(store => store.profile);

    useEffect(() => {
        dispatch(getProfileData())
    }, [dispatch]);

    if (isLoading)
        return (<h1>Пожайлуста, подождите ...</h1>);

    if (hasError || !isLogedIn)
        return (<Navigate to={LOGIN_PATH} state={{ path: location }} replace />);

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};