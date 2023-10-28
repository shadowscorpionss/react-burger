import { actionCreator, requestErrorActionCreator } from "..";
import { registrationRequest } from "../../../utils/api";
import { ACCESS_TOKEN_PATH, REFRESH_TOKEN_PATH, setCookie } from "../../../utils/cookies";

export const USER_REGISTRATION_REQUEST = "USER_REGISTRATION_REQUEST";
export const USER_REGISTRATION_SUCCESS = "USER_REGISTRATION_SUCCESS";
export const USER_REGISTRATION_FAILED = "USER_REGISTRATION_FAILED";


const userRegistrationRequestActionCreator = ()=>actionCreator(USER_REGISTRATION_REQUEST);
const userRegistrationFailedActionCreator = (err) => requestErrorActionCreator(USER_REGISTRATION_FAILED, err);
const userRegistrationSucessActionCreator = (user) => ({ ...actionCreator(USER_REGISTRATION_SUCCESS), user: { email: user.email, name: user.name } });


export const userRegistration = (email, password, name) => (dispatch) => {
    const dispatchError = (err) => dispatch(userRegistrationFailedActionCreator(err));

    dispatch(userRegistrationRequestActionCreator());

    registrationRequest(email, password, name).then(res => {

        let accessToken = res.accessToken.split("Bearer ")[1];
        let refreshToken = res.refreshToken;

        setCookie(ACCESS_TOKEN_PATH, accessToken)
        localStorage.setItem(REFRESH_TOKEN_PATH, refreshToken);

        dispatch(userRegistrationSucessActionCreator(res.user));

    }).catch(dispatchError);

}