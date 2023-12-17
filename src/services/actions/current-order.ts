import { IAction, IErrorAction, IRequestError, actionCreator, requestErrorActionCreator } from '../../types/action-types';
import { AppDispatch, AppThunk } from '../../types/app-redux-thunk';
import { IOrder, TOrder } from '../../types/order-types';
import { IResSuccess, getCurrentOrderRequest } from '../../utils/api';

export const GET_CURRENT_ORDER_REQUEST: 'GET_CURRENT_ORDER_REQUEST' = 'GET_CURRENT_ORDER_REQUEST';
export const GET_CURRENT_ORDER_SUCCESS: 'GET_CURRENT_ORDER_SUCCESS' = 'GET_CURRENT_ORDER_SUCCESS';
export const GET_CURRENT_ORDER_FAILED: 'GET_CURRENT_ORDER_FAILED' = 'GET_CURRENT_ORDER_FAILED';

export interface IGetCurrentOrderAction extends IAction<typeof GET_CURRENT_ORDER_REQUEST> { }
export interface IGetCurrentOrderFailedAction extends IErrorAction<typeof GET_CURRENT_ORDER_FAILED> { }
export interface IGetCurrentOrderSuccessAction extends IAction<typeof GET_CURRENT_ORDER_SUCCESS>, IOrder { }

export type TGetCurrentOrderActions = IGetCurrentOrderAction | IGetCurrentOrderFailedAction | IGetCurrentOrderSuccessAction;

const getCurrentOrderAction = (): IGetCurrentOrderAction => actionCreator(GET_CURRENT_ORDER_REQUEST);
const getCurrentOrderFailedAction = (err: IRequestError): IGetCurrentOrderFailedAction => requestErrorActionCreator(GET_CURRENT_ORDER_FAILED, err);
const getCurrentOrderSuccessAction = (order: TOrder): IGetCurrentOrderSuccessAction => ({ ...actionCreator(GET_CURRENT_ORDER_SUCCESS), order: order });

interface ICurrentOrderResponse extends IResSuccess {
    orders: Array<TOrder>
}

export const getCurrentOrderThunk = (orderNumber: string): AppThunk => (dispatch: AppDispatch) => {
    const dispatchError = (err: IRequestError) => dispatch(getCurrentOrderFailedAction(err));
    const dispatchSuccess = (res: ICurrentOrderResponse) => dispatch(getCurrentOrderSuccessAction(res.orders[0]));

    dispatch(getCurrentOrderAction());
    getCurrentOrderRequest<ICurrentOrderResponse>(orderNumber)
        .then(dispatchSuccess)
        .catch(dispatchError);
}