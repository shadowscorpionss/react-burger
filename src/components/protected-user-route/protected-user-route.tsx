//react, redux, router
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"
import { FC, PropsWithChildren } from "react";
//constants
import { HOME_PATH } from "../../pages";
//types
import { IProfileStorage } from "../../types/profile-types";

export const ProtectedUserRoute : FC<PropsWithChildren>  = ({ children }) => {
    const location = useLocation();

    const { isLoading, user } = useSelector<any,IProfileStorage>(store => store.profile);

    if (user.email)         
        return (<Navigate to={location.state?.path || HOME_PATH} replace />);

    if (isLoading)
        return (<h1>Пожайлуста, подождите ...</h1>);    
    
    return (<>{children}</>);
}

export default ProtectedUserRoute;