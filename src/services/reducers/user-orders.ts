import {
    USER_ORDERS_OPEN,
    USER_ORDERS_ERROR,
    USER_ORDERS_CLOSE,
    USER_ORDERS_MESSAGE
} from '../actions/profile/orders';

import { TUserOrdersActions } from '../actions/profile/orders';
import { IOrdersWSStorage } from '../../types/orders-ws-types';


const initialState: IOrdersWSStorage = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
};

export const userOrdersReducer = (state = initialState, action: TUserOrdersActions): IOrdersWSStorage => {
    switch (action.type) {
        case USER_ORDERS_OPEN:
            return {
                ...state,
                wsConnected: true
            };

        case USER_ORDERS_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case USER_ORDERS_CLOSE:
            return {
                ...state,
                wsConnected: false
            };

        case USER_ORDERS_MESSAGE:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            };

        default:
            return state;
    }
};