import { actionCreator, requestErrorActionCreator } from "..";
import { getProfileDataRequest, refreshTokens } from "../../../utils/api";
import { getCookie, setCookie, ACCESS_TOKEN_PATH, REFRESH_TOKEN_PATH } from "../../../utils/cookies";

export const GET_PROFILE_DATA_REQUEST = "GET_PROFILE_DATA_REQUEST";
export const GET_PROFILE_DATA_SUCCESS = "GET_PROFILE_DATA_SUCCESS";
export const GET_PROFILE_DATA_FAILED = "GET_PROFILE_DATA_FAILED";

const profileDataRequestActionCreator = () => actionCreator(GET_PROFILE_DATA_REQUEST);
const profileDataSuccessActionCreator = (user) => ({ ...actionCreator(GET_PROFILE_DATA_SUCCESS), user: { email: user.email, name: user.name } });
const profileDataFailedActionCreator = (err) => requestErrorActionCreator(GET_PROFILE_DATA_FAILED, err);


export const getProfileData = () => (dispatch) => {
    const dispatchError = (err) => dispatch(profileDataFailedActionCreator(err));
    dispatch(profileDataRequestActionCreator());

    
    getProfileDataRequest().then(res => {
        dispatch(profileDataSuccessActionCreator(res.user));
        

    }).catch(err => {
        if (err.message === "jwt expired") {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN_PATH);
            refreshTokens(refreshToken)
                .then(() => dispatch(getProfileData()));
        } else {
            dispatchError(err);
        }
    })

}