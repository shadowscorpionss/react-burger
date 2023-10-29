import { useDispatch, useSelector } from "react-redux";
import { getProfileData } from "../../services/actions/profile/get-profile-data";
import { Navigate, useLocation } from "react-router-dom"
import PropTypes from "prop-types";

import { useEffect } from "react";
import { HOME_PATH } from "../../pages";


export const ProtectedUserRoute = ({ children }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { isLoading, user } = useSelector(store => store.profile);


    if (isLoading)
        return (<h1>Пожайлуста, подождите ...</h1>);

    if (user.email) {
        console.log(user.email, ' redirected.. ', location.state?.path);
        return (<Navigate to={location.state?.path || HOME_PATH} replace />);
    }
    return children;
}

ProtectedUserRoute.propTypes = {
    children: PropTypes.node.isRequired
};