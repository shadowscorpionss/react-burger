import { IAction, IErrorAction, IRequestError, actionCreator, requestErrorActionCreator } from '../../../types/action-types';
import { IUserResponse, TUser } from '../../../types/profile-types';
import { loginRequest } from '../../../utils/api';

export const USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST' = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS' = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED: 'USER_LOGIN_FAILED' = 'USER_LOGIN_FAILED';

export interface IUserLoginAction extends IAction<typeof USER_LOGIN_REQUEST> { }
export interface IUserLoginFailedAction extends IErrorAction<typeof USER_LOGIN_FAILED> { }
export interface IUserLoginSuccesAction extends IAction<typeof USER_LOGIN_SUCCESS>, IUserResponse { }

export type TUserLoginActions = IUserLoginAction | IUserLoginFailedAction | IUserLoginSuccesAction;

const userLoginAction = (): IUserLoginAction => actionCreator(USER_LOGIN_REQUEST);
const userLoginFailedAction = (err: IRequestError): IUserLoginFailedAction => requestErrorActionCreator(USER_LOGIN_FAILED, err);
const userLoginSuccessAction = (user: TUser): IUserLoginSuccesAction => ({ ...actionCreator(USER_LOGIN_SUCCESS), user });

export const userLoginThunk = (email: string, password: string): any => (dispatch: any) => {
    const dispatchError = (err: IRequestError) => dispatch(userLoginFailedAction(err));
    const dispatchSuccess = (res: IUserResponse) => dispatch(userLoginSuccessAction(res.user));
    dispatch(userLoginAction());
    loginRequest<IUserResponse>(email, password)
        .then(dispatchSuccess)
        .catch(dispatchError);

}