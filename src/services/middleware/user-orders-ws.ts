import {
    USER_ORDERS_START, USER_ORDERS_STOP,
    userOrdersMessageAction, userOrdersCloseAction,
    userOrdersErrorAction, userOrdersOpenAction
} from '../actions/profile/orders';

export const userOrdersConfig = {
    wsStart: USER_ORDERS_START,
    wsStop: USER_ORDERS_STOP,

    onOpen: userOrdersOpenAction,
    onMessage: userOrdersMessageAction,
    onError: userOrdersErrorAction,
    onClose: userOrdersCloseAction,

}