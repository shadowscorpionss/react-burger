
import { IAction, IErrorAction, IRequestError, actionCreator, requestErrorActionCreator } from '../../../types/action-types';
import { IUserResponse, TUser } from '../../../types/profile-types';
import { updateUserRequest } from '../../../utils/api';

export const UPDATE_USER_DATA_REQUEST: 'UPDATE_USER_DATA_REQUEST' = 'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA_SUCCESS: 'UPDATE_USER_DATA_SUCCESS' = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILED: 'UPDATE_USER_DATA_FAILED' = 'UPDATE_USER_DATA_FAILED';

export interface IUpdateUserDataAction extends IAction<typeof UPDATE_USER_DATA_REQUEST> { }
export interface IUpdateUserDataFailedAction extends IErrorAction<typeof UPDATE_USER_DATA_FAILED> { }
export interface IUpdateUserDataSuccessAction extends IAction<typeof UPDATE_USER_DATA_SUCCESS>, IUserResponse {}

export type TUpdateUserDataActions = IUpdateUserDataAction | IUpdateUserDataFailedAction | IUpdateUserDataSuccessAction;

const updateUserDataRequestAction = (): IUpdateUserDataAction => actionCreator(UPDATE_USER_DATA_REQUEST);
const updateUserDataFailedAction = (err: IRequestError): IUpdateUserDataFailedAction => requestErrorActionCreator(UPDATE_USER_DATA_FAILED, err);
const updateUserDataSuccessAction = (user: TUser): IUpdateUserDataSuccessAction => ({ ...actionCreator(UPDATE_USER_DATA_SUCCESS), user });


export const changeUserDataThunk = (name:string, email:string, password: string):any => (dispatch:any) => {
    const dispatchError = (err:IRequestError) => dispatch(updateUserDataFailedAction(err));
    const dispatchSuccess = (res:IUserResponse) => dispatch(updateUserDataSuccessAction(res.user));
    dispatch(updateUserDataRequestAction());

    updateUserRequest<IUserResponse>(name, email, password)
        .then(dispatchSuccess)
        .catch(dispatchError);

}