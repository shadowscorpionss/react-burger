import { actionCreator, requestErrorActionCreator } from "..";
import { updateUserRequest } from "../../../utils/api";

export const UPDATE_USER_DATA_REQUEST = "UPDATE_USER_DATA_REQUEST";
export const UPDATE_USER_DATA_SUCCESS = "UPDATE_USER_DATA_SUCCESS";
export const UPDATE_USER_DATA_FAILED = "UPDATE_USER_DATA_FAILED";

const updateUserDataRequestActionCreator = () => actionCreator(UPDATE_USER_DATA_REQUEST);
const updateUserDataFailedActionCreator = (err) => requestErrorActionCreator(UPDATE_USER_DATA_FAILED, err);
const updateUserDataSuccessActionCreator = ({ user }) => ({ ...actionCreator(UPDATE_USER_DATA_SUCCESS), user: { email: user.email, name: user.name } });


export const changeUserData = (name, email, password) => (dispatch) => {
    const dispatchError = (err) => dispatch(updateUserDataFailedActionCreator(err));
    const dispatchSuccess = (res) => dispatch(updateUserDataSuccessActionCreator(res));
    dispatch(updateUserDataRequestActionCreator());

    updateUserRequest(name, email, password)
        .then(dispatchSuccess)
        .catch(dispatchError);

}