//react, redux, router
import { Navigate, useLocation } from 'react-router-dom'
import { FC, PropsWithChildren } from 'react';
//constants
import { HOME_PATH } from '../../pages';
//types
import { useAppSelector } from '../../types/app-redux-thunk';

export const ProtectedUserRoute : FC<PropsWithChildren>  = ({ children }) => {
    const location = useLocation();

    const { isLoading, user } = useAppSelector(store => store.profile);

    if (user.email)         
        return (<Navigate to={location.state?.path || HOME_PATH} state={{background: location.state?.back}} replace />);

    if (isLoading)
        return (<h1>Пожайлуста, подождите ...</h1>);    
    
    return (<>{children}</>);
}

export default ProtectedUserRoute;