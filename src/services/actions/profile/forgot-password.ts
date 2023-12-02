import { IAction, IErrorAction, IRequestError, actionCreator, requestErrorActionCreator } from '../../../types/action-types';
import { ForgotPasswordFunction } from '../../../types/profile-types';
import { passwordResetRequest } from '../../../utils/api';

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export interface IForgotPasswordAction extends IAction<typeof FORGOT_PASSWORD_REQUEST> { }
export interface IForgotPasswordFailedAction extends IErrorAction<typeof FORGOT_PASSWORD_FAILED> { }
export interface IForgotPasswordSuccessAction extends IAction<typeof FORGOT_PASSWORD_SUCCESS> { }

export type TForgotPasswordActions = IForgotPasswordAction | IForgotPasswordFailedAction | IForgotPasswordSuccessAction;

const forgotPasswordFailedAction = (err: IRequestError): IForgotPasswordFailedAction => requestErrorActionCreator(FORGOT_PASSWORD_FAILED, err);
const forgotPasswordSuccessAction = (): IForgotPasswordSuccessAction => actionCreator(FORGOT_PASSWORD_SUCCESS);
const forgotPasswordAction = (): IForgotPasswordAction => actionCreator(FORGOT_PASSWORD_REQUEST);

export const forgotPasswordThunk: ForgotPasswordFunction = (email) => (dispatch: any) => {
    const dispatchError = (err: IRequestError) => dispatch(forgotPasswordFailedAction(err));
    const dispatchSuccess = () => dispatch(forgotPasswordSuccessAction());

    dispatch(forgotPasswordAction());
    passwordResetRequest(email)
        .then(dispatchSuccess)
        .catch(dispatchError);
}
