//react
import { Navigate, useLocation } from 'react-router-dom'
import { FC, PropsWithChildren } from 'react';
//constants
import { LOGIN_PATH } from '../../pages';
//types
import { useAppSelector } from '../../types/app-redux-thunk';

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation();

    const { isLoading, isFailed, user } = useAppSelector(store => store.profile);

    if (isLoading && !user.email)
        return (<h1>Пожайлуста, подождите ...</h1>);

    if (isFailed || !user.email)
        return (<Navigate to={LOGIN_PATH} state={{ path: location }} replace />);

    return (<>{children}</>);
}

export default ProtectedRoute;