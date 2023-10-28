import { actionCreator, requestErrorActionCreator } from "..";
import { passwordRecovery } from "../../../utils/api";

export const RESET_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";


const resetPasswordRequestActionCreator = () => actionCreator(RESET_PASSWORD_REQUEST);
const resetPasswordFailedActionCreator = (err) => requestErrorActionCreator(RESET_PASSWORD_FAILED, err);
const resetPasswordSuccessActionCreator = () => actionCreator(RESET_PASSWORD_SUCCESS);


export const resetPassword = (password, token) => (dispatch) => {
    const dispatchError = (err) => dispatch(resetPasswordFailedActionCreator(err));
    const dispatchSuccess = () => dispatch(resetPasswordSuccessActionCreator());
    dispatch(resetPasswordRequestActionCreator());
    passwordRecovery(password, token).then(dispatchSuccess).catch(dispatchError);
}