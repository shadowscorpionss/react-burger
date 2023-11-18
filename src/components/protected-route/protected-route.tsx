//react
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom'
import { FC, PropsWithChildren } from 'react';
//constants
import { LOGIN_PATH } from '../../pages';
//types
import { IProfileStorage } from '../../types/profile-types';

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation();

    const { isLoading, hasError, user } = useSelector<any, IProfileStorage>(store => store.profile);

    if (isLoading && !user.email)
        return (<h1>Пожайлуста, подождите ...</h1>);

    if (hasError || !user.email)
        return (<Navigate to={LOGIN_PATH} state={{ path: location }} replace />);

    return (<>{children}</>);
}

export default ProtectedRoute;