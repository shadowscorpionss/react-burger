import { IAction, actionCreator } from '../../../types/action-types';
import { IEventAction, IOrdersMessageAction, IStringAction } from '../../../types/orders-ws-types';
import { userOrdersUrl } from '../../../utils/api';
export const USER_ORDERS_START: 'USER_ORDERS_START' = 'USER_ORDERS_START';
export const USER_ORDERS_STOP: 'USER_ORDERS_STOP' = 'USER_ORDERS_STOP';

export const USER_ORDERS_OPEN: 'USER_ORDERS_OPEN' = 'USER_ORDERS_OPEN';
export const USER_ORDERS_ERROR: 'USER_ORDERS_ERROR' = 'USER_ORDERS_ERROR';
export const USER_ORDERS_CLOSE: 'USER_ORDERS_CLOSE' = 'USER_ORDERS_CLOSE';
export const USER_ORDERS_MESSAGE: 'USER_ORDERS_MESSAGE' = 'USER_ORDERS_MESSAGE';

export interface IUserOrdersStartAction extends IAction<typeof USER_ORDERS_START>, IStringAction { }
export interface IUserOrdersStopAction extends IAction<typeof USER_ORDERS_STOP> { }

export interface IUserOrdersOpenAction extends IAction<typeof USER_ORDERS_OPEN>, IEventAction { }
export interface IUserOrdersErrorAction extends IAction<typeof USER_ORDERS_ERROR>, IEventAction { }
export interface IUserOrdersCloseAction extends IAction<typeof USER_ORDERS_CLOSE>, IEventAction { }
export interface IUserOrdersMessageAction extends IAction<typeof USER_ORDERS_MESSAGE>, IOrdersMessageAction { }

export type TUserOrdersActions =
    | IUserOrdersStartAction
    | IUserOrdersStopAction
    | IUserOrdersOpenAction
    | IUserOrdersErrorAction
    | IUserOrdersCloseAction
    | IUserOrdersMessageAction

export const userOrdersStartAction =
    (): IUserOrdersStartAction => ({
        ...actionCreator(USER_ORDERS_START),
        payload: userOrdersUrl(),
    })

export const userOrdersOpenAction =
    (event: Event): IUserOrdersOpenAction => ({
        ...actionCreator(USER_ORDERS_OPEN),
        payload: event,
    })

export const userOrdersErrorAction =
    (event: Event): IUserOrdersErrorAction => ({
        ...actionCreator(USER_ORDERS_ERROR),
        payload: event
    })

export const userOrdersCloseAction =
    (event: Event): IUserOrdersCloseAction => ({
        ...actionCreator(USER_ORDERS_CLOSE),
        payload: event,
    })

export const userOrdersStopAction = (): IUserOrdersStopAction => actionCreator(USER_ORDERS_STOP);

export const userOrdersMessageAction = (event: MessageEvent): IUserOrdersMessageAction => {
    const data = JSON.parse(event.data);

    return {
        ...actionCreator(USER_ORDERS_MESSAGE),
        payload: {
            orders: data.orders,
            total: data.total,
            totalToday: data.totalToday,
        }
    }
}