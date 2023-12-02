import { IAction, IErrorAction, IRequestError, actionCreator, requestErrorActionCreator } from '../../../types/action-types';
import { IUserResponse, RegUpdateProfileFunction, TUser } from '../../../types/profile-types';
import { registrationRequest } from '../../../utils/api';

export const USER_REGISTRATION_REQUEST: 'USER_REGISTRATION_REQUEST' = 'USER_REGISTRATION_REQUEST';
export const USER_REGISTRATION_SUCCESS: 'USER_REGISTRATION_SUCCESS' = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_FAILED: 'USER_REGISTRATION_FAILED' = 'USER_REGISTRATION_FAILED';

export interface IUserRegistrationAction extends IAction<typeof USER_REGISTRATION_REQUEST> { }
export interface IUserRegistrationFailedAction extends IErrorAction<typeof USER_REGISTRATION_FAILED> { }
export interface IUserRegistrationSuccessAction extends IAction<typeof USER_REGISTRATION_SUCCESS>, IUserResponse { }

export type TUserRegistrationActions = IUserRegistrationAction | IUserRegistrationFailedAction | IUserRegistrationSuccessAction;

const userRegistrationAction = (): IUserRegistrationAction => actionCreator(USER_REGISTRATION_REQUEST);
const userRegistrationFailedAction = (err: IRequestError): IUserRegistrationFailedAction => requestErrorActionCreator(USER_REGISTRATION_FAILED, err);
const userRegistrationSucessAction = (user: TUser): IUserRegistrationSuccessAction => ({ ...actionCreator(USER_REGISTRATION_SUCCESS), user });

export const userRegistrationThunk: RegUpdateProfileFunction = (email, password, name) => (dispatch: any) => {
    const dispatchError = (err: IRequestError) => dispatch(userRegistrationFailedAction(err));
    const dispatchSuccess = (res: IUserResponse) => dispatch(userRegistrationSucessAction(res.user))
    dispatch(userRegistrationAction());

    registrationRequest<IUserResponse>(email, password, name)
        .then(dispatchSuccess)
        .catch(dispatchError);

}