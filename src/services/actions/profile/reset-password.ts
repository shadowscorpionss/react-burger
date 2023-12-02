import { IAction, IErrorAction, IRequestError, actionCreator, requestErrorActionCreator } from '../../../types/action-types';
import { ResetPasswordFunction } from '../../../types/profile-types';
import { passwordRecoveryRequest } from '../../../utils/api';

//consts
export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

//interfaces
export interface IResetPasswordAction extends IAction<typeof RESET_PASSWORD_REQUEST> { }
export interface IResetPasswordFailedAction extends IErrorAction<typeof RESET_PASSWORD_FAILED> { }
export interface IResetPasswordSuccessAction extends IAction<typeof RESET_PASSWORD_SUCCESS> { }

export type TResetPasswordActions = IResetPasswordAction | IResetPasswordFailedAction | IResetPasswordSuccessAction;

//actions
const resetPasswordAction = (): IResetPasswordAction => actionCreator(RESET_PASSWORD_REQUEST);
const resetPasswordFailedAction = (err: IRequestError): IResetPasswordFailedAction => requestErrorActionCreator(RESET_PASSWORD_FAILED, err);
const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => actionCreator(RESET_PASSWORD_SUCCESS);


export const resetPasswordThunk: ResetPasswordFunction = (password, token) => (dispatch: any) => {
    const dispatchError = (err: IRequestError) => dispatch(resetPasswordFailedAction(err));
    const dispatchSuccess = () => dispatch(resetPasswordSuccessAction());
    dispatch(resetPasswordAction());
    passwordRecoveryRequest(password, token)
        .then(dispatchSuccess)
        .catch(dispatchError);
}