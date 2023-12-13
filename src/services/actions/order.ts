import { IOrder, TOrder } from '../../types/order-types';

import { IAction, IErrorAction, IRequestError, actionCreator, errorActionCreator, requestErrorActionCreator } from '../../types/action-types';
import { IResSuccess, postOrderRequest } from '../../utils/api';
import { clearConstructorDataAction } from './burger-constructor';
import { AppDispatch, AppThunk } from '../../types/app-redux-thunk';

export const MAKE_ORDER_REQUEST: 'MAKE_ORDER_REQUEST' = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_FAILED: 'MAKE_ORDER_FAILED' = 'MAKE_ORDER_FAILED';
export const MAKE_ORDER_SUCCESS: 'MAKE_ORDER_SUCCESS' = 'MAKE_ORDER_SUCCESS';

export interface IMakeOrderAction extends IAction<typeof MAKE_ORDER_REQUEST> { }
export interface IMakeOrderFailedAction extends IErrorAction<typeof MAKE_ORDER_FAILED> { }
export interface IMakeOrderSuccessAction extends IAction<typeof MAKE_ORDER_SUCCESS> {    
    readonly order: TOrder;
}

export type TMakeOrderActions = IMakeOrderAction | IMakeOrderFailedAction | IMakeOrderSuccessAction;

export const makeOrderAction = (): IMakeOrderAction => (actionCreator(MAKE_ORDER_REQUEST));
export const makeOrderFailedAction = (err: IRequestError): IMakeOrderFailedAction => (requestErrorActionCreator(MAKE_ORDER_FAILED, err));
export const makeOrderSuccessAction = (order: TOrder) => ({ ...actionCreator(MAKE_ORDER_SUCCESS), order });

interface IOrderResponse extends IOrder, IResSuccess { }
export const makeOrderThunk = (ingredientsIds: Array<string>): AppThunk => (dispatch: AppDispatch) => {
    dispatch(makeOrderAction());
    postOrderRequest<IOrderResponse>(ingredientsIds)
        .then(res => {
            dispatch(makeOrderSuccessAction(res.order));
            dispatch(clearConstructorDataAction());
        })
        .catch(err => dispatch(makeOrderFailedAction(err)));
}