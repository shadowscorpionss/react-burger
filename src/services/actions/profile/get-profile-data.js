import { actionCreator, requestErrorActionCreator } from "..";
import { getUserRequest, refreshTokensRequest } from "../../../utils/api";
import { getCookie, setCookie, ACCESS_TOKEN_PATH, REFRESH_TOKEN_PATH } from "../../../utils/cookies";

export const GET_PROFILE_DATA_REQUEST = "GET_PROFILE_DATA_REQUEST";
export const GET_PROFILE_DATA_SUCCESS = "GET_PROFILE_DATA_SUCCESS";
export const GET_PROFILE_DATA_FAILED = "GET_PROFILE_DATA_FAILED";

const profileDataRequestActionCreator = () => actionCreator(GET_PROFILE_DATA_REQUEST);
const profileDataSuccessActionCreator = res => ({
    ...actionCreator(GET_PROFILE_DATA_SUCCESS),
    user: {
        email: res?.user.email,
        name: res?.user.name
    }
});
const profileDataFailedActionCreator = err => requestErrorActionCreator(GET_PROFILE_DATA_FAILED, err);


export const getProfileData = () => (dispatch) => {
    const dispatchError = (err) => dispatch(profileDataFailedActionCreator(err));
    const dispatchSuccess = (res) => dispatch(profileDataSuccessActionCreator(res));
    dispatch(profileDataRequestActionCreator());

    getUserRequest()
        .then(dispatchSuccess)
        .catch(dispatchError);

}