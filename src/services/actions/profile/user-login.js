import { actionCreator, requestErrorActionCreator } from "..";
import { loginRequest } from "../../../utils/api";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";

const userLoginRequestActionCreator = () => actionCreator(USER_LOGIN_REQUEST);
const userLoginFailedActionCreator = (err) => requestErrorActionCreator(USER_LOGIN_FAILED, err);
const userLoginSuccessActionCreator = ({user}) => ({ ...actionCreator(USER_LOGIN_SUCCESS), user: { email: user.email, name: user.name } });

export const userLogin = (email, password) => (dispatch) => {
    const dispatchError = (err) => dispatch(userLoginFailedActionCreator(err));
    const dispatchSuccess = (res) => dispatch(userLoginSuccessActionCreator(res));
    dispatch(userLoginRequestActionCreator());
    loginRequest(email, password)
        .then(dispatchSuccess)
        .catch(dispatchError);

}