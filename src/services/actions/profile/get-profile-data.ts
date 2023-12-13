import { IAction, IErrorAction, IRequestError, actionCreator, requestErrorActionCreator } from '../../../types/action-types';
import { AppDispatch, AppThunk } from '../../../types/app-redux-thunk';
import { IUserResponse, TUser } from '../../../types/profile-types';
import { getUserRequest } from '../../../utils/api';

export const GET_PROFILE_DATA_REQUEST: 'GET_PROFILE_DATA_REQUEST' = 'GET_PROFILE_DATA_REQUEST';
export const GET_PROFILE_DATA_SUCCESS: 'GET_PROFILE_DATA_SUCCESS' = 'GET_PROFILE_DATA_SUCCESS';
export const GET_PROFILE_DATA_FAILED: 'GET_PROFILE_DATA_FAILED' = 'GET_PROFILE_DATA_FAILED';

export interface IGetProfileDataAction extends IAction<typeof GET_PROFILE_DATA_REQUEST> { }
export interface IGetPfofileDataFailedAction extends IErrorAction<typeof GET_PROFILE_DATA_FAILED> { }
export interface IGetProfileDataSuccessAction extends IAction<typeof GET_PROFILE_DATA_SUCCESS>, IUserResponse {}

export type TGetProfileActions = IGetProfileDataAction | IGetPfofileDataFailedAction | IGetProfileDataSuccessAction;

const getProfileDataAction = (): IGetProfileDataAction => actionCreator(GET_PROFILE_DATA_REQUEST);
const getProfileDataSuccessAction = (user: TUser): IGetProfileDataSuccessAction => ({
    ...actionCreator(GET_PROFILE_DATA_SUCCESS),
    user
});
const getProfileDataFailedAction = (err: IRequestError): IGetPfofileDataFailedAction => requestErrorActionCreator(GET_PROFILE_DATA_FAILED, err);


export const getProfileDataThunk = (): AppThunk => (dispatch: AppDispatch) => {
    const dispatchError = (err: IRequestError) => dispatch(getProfileDataFailedAction(err));
    const dispatchSuccess = (res: IUserResponse) => dispatch(getProfileDataSuccessAction(res.user));
    dispatch(getProfileDataAction());

    getUserRequest<IUserResponse>()
        .then(dispatchSuccess)
        .catch(dispatchError);
}