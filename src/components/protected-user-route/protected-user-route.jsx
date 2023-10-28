import { useDispatch, useSelector } from "react-redux";
import { getProfileData } from "../../services/actions/profile/get-profile-data";
import { Navigate, useLocation } from "react-router-dom"
import PropTypes from "prop-types";

import { useEffect } from "react";


export const ProtectedUserRoute = ({ children }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { isLoading, user: { isLogedIn } } = useSelector(state => state.profile);


    useEffect(() => {
        dispatch(getProfileData())
    }, []);


    if (isLoading) 
        return (<h1>Пожайлуста, подождите ...</h1>);
    if (isLogedIn) 
        return (<Navigate to={location.state?.path || "/"} replace />);

    return children;
}

ProtectedUserRoute.propTypes = {
    children: PropTypes.node.isRequired
};