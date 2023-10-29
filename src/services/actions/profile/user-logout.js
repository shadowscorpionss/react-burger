import { useSelector } from "react-redux";
import { actionCreator, requestErrorActionCreator } from "..";
import { logoutRequest } from "../../../utils/api";
import { ACCESS_TOKEN_PATH, REFRESH_TOKEN_PATH, deleteCookie } from "../../../utils/cookies";


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

    const {refreshToken} = useSelector(store=>store.tokens);
    logoutRequest(refreshToken)
        .then(dispatchSuccess)
        .catch(dispatchError)
        .finally(() => {
            deleteCookie(ACCESS_TOKEN_PATH);
            localStorage.removeItem(REFRESH_TOKEN_PATH);
        });
}