import { actionCreator, requestErrorActionCreator } from "..";
import { loginRequest } from "../../../utils/api";
import { ACCESS_TOKEN_PATH, REFRESH_TOKEN_PATH, setCookie } from "../../../utils/cookies";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";

const userLoginRequestActionCreator = ()=>actionCreator(USER_LOGIN_REQUEST);
const userLoginFailedActionCreator = (err)=> requestErrorActionCreator(USER_LOGIN_FAILED, err);
const userLoginSuccessActionCreator = (user)=>({...actionCreator(USER_LOGIN_SUCCESS), user:{email: user.email, name: user.name}});

export const userLogin = (email, password) => (dispatch) => {
    const dispatchError = (err)=> dispatch(userLoginFailedActionCreator(err));
    dispatch(userLoginRequestActionCreator());
    loginRequest(email, password).then(res => {
        let accessToken = res.accessToken.split("Bearer ")[1];
        let refreshToken = res.refreshToken;

        setCookie(ACCESS_TOKEN_PATH, accessToken);
        localStorage.setItem(REFRESH_TOKEN_PATH, refreshToken);

        dispatch(userLoginSuccessActionCreator(res.user));           
        
    }).catch(dispatchError);

}