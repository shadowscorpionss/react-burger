import { actionCreator, requestErrorActionCreator } from "../../../types/action-types";
import { logoutRequest } from "../../../utils/api";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILED = "USER_LOGOUT_FAILED";


const userLogoutRequestActionCreator = () => actionCreator(USER_LOGOUT_REQUEST);
const userLogoutFailedActionCreator = (err) => requestErrorActionCreator(USER_LOGOUT_FAILED, err);
const userLogoutSuccessActionCreator = () => actionCreator(USER_LOGOUT_SUCCESS);


export const userLogout = () => (dispatch) => {
    const dispatchError = (err) => dispatch(userLogoutFailedActionCreator(err));
    const dispatchSuccess = () => dispatch(userLogoutSuccessActionCreator());
    dispatch(userLogoutRequestActionCreator());

    logoutRequest()
        .then(dispatchSuccess)
        .catch(dispatchError);
}