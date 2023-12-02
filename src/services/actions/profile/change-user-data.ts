import { IAction, IErrorAction, IReqError, actionCreator, requestErrorActionCreator } from '..';
import { TUser } from '../../../types/profile-types';
import { IResSuccess, updateUserRequest } from '../../../utils/api';

export const UPDATE_USER_DATA_REQUEST: 'UPDATE_USER_DATA_REQUEST' = 'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA_SUCCESS: 'UPDATE_USER_DATA_SUCCESS' = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILED: 'UPDATE_USER_DATA_FAILED' = 'UPDATE_USER_DATA_FAILED';

export interface IUpdateUserDataAction extends IAction<typeof UPDATE_USER_DATA_REQUEST> { }
export interface IUpdateUserDataFailedAction extends IErrorAction<typeof UPDATE_USER_DATA_FAILED> { }
export interface IUpdateUserDataSuccessAction extends IAction<typeof UPDATE_USER_DATA_SUCCESS> {
    user: TUser;
}

export type TUpdateUserDataActions = IUpdateUserDataAction | IUpdateUserDataFailedAction | IUpdateUserDataSuccessAction;

const updateUserDataRequestAction = (): IUpdateUserDataAction => actionCreator(UPDATE_USER_DATA_REQUEST);
const updateUserDataFailedAction = (err: IReqError): IUpdateUserDataFailedAction => requestErrorActionCreator(UPDATE_USER_DATA_FAILED, err);
const updateUserDataSuccessAction = (user: TUser): IUpdateUserDataSuccessAction => ({ ...actionCreator(UPDATE_USER_DATA_SUCCESS), user });

interface IUpdateUserDataResponse extends IResSuccess{
    user: TUser;
}

export const changeUserDataThunk = (name:string, email:string, password: string):any => (dispatch:any) => {
    const dispatchError = (err:IReqError) => dispatch(updateUserDataFailedAction(err));
    const dispatchSuccess = (res:IUpdateUserDataResponse) => dispatch(updateUserDataSuccessAction(res.user));
    dispatch(updateUserDataRequestAction());

    updateUserRequest<IUpdateUserDataResponse>(name, email, password)
        .then(dispatchSuccess)
        .catch(dispatchError);

}