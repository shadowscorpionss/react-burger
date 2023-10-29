import { actionCreator, requestErrorActionCreator } from "..";
import { passwordReset } from "../../../utils/api";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

const forgotFailedActionCreator = (err)=>requestErrorActionCreator(FORGOT_PASSWORD_FAILED, err);
const forgotSuccessActionCreator = ()=> actionCreator(FORGOT_PASSWORD_SUCCESS);
const forgotRequestActionCreator = ()=> actionCreator(FORGOT_PASSWORD_REQUEST);


export const forgotPassword = (email) => (dispatch) => {
    const dispatchError = (err) => dispatch(forgotFailedActionCreator(err));
    const dispatchSuccess = () => dispatch(forgotSuccessActionCreator());

    dispatch(forgotRequestActionCreator());        
    
    passwordReset(email).then(dispatchSuccess).catch(dispatchError);
}
