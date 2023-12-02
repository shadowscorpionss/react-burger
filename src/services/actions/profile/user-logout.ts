import { IAction, IErrorAction, IRequestError, actionCreator, requestErrorActionCreator } from '../../../types/action-types';
import { logoutRequest } from '../../../utils/api';

export const USER_LOGOUT_REQUEST: 'USER_LOGOUT_REQUEST' = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS' = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED: 'USER_LOGOUT_FAILED' = 'USER_LOGOUT_FAILED';

export interface IUserLogoutAction extends IAction<typeof USER_LOGOUT_REQUEST> { }
export interface IUserLogoutFailedAction extends IErrorAction<typeof USER_LOGOUT_FAILED> { }
export interface IUserLogoutSuccessAction extends IAction<typeof USER_LOGOUT_SUCCESS> { }

export type TUserLogoutActions = IUserLogoutAction | IUserLogoutFailedAction | IUserLogoutSuccessAction;

const userLogoutAction = (): IUserLogoutAction => actionCreator(USER_LOGOUT_REQUEST);
const userLogoutFailedAction = (err: IRequestError): IUserLogoutFailedAction => requestErrorActionCreator(USER_LOGOUT_FAILED, err);
const userLogoutSuccessAction = (): IUserLogoutSuccessAction => actionCreator(USER_LOGOUT_SUCCESS);

export const userLogoutThunk = (): any => (dispatch: any) => {
    const dispatchError = (err: IRequestError) => dispatch(userLogoutFailedAction(err));
    const dispatchSuccess = () => dispatch(userLogoutSuccessAction());
    dispatch(userLogoutAction());

    logoutRequest()
        .then(dispatchSuccess)
        .catch(dispatchError);
}