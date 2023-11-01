import { actionCreator, requestErrorActionCreator } from "..";
import { getUserRequest } from "../../../utils/api";

export const GET_PROFILE_DATA_REQUEST = "GET_PROFILE_DATA_REQUEST";
export const GET_PROFILE_DATA_SUCCESS = "GET_PROFILE_DATA_SUCCESS";
export const GET_PROFILE_DATA_FAILED = "GET_PROFILE_DATA_FAILED";

const profileDataRequestActionCreator = () => actionCreator(GET_PROFILE_DATA_REQUEST);
const profileDataSuccessActionCreator = ({user}) => ({
    ...actionCreator(GET_PROFILE_DATA_SUCCESS),
    user
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