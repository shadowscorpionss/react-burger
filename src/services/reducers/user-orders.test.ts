import { TOrder } from "../../types/order-types";
import { IOrdersMessage, IOrdersWSStorage } from "../../types/orders-ws-types";
import { TUserOrdersActions, USER_ORDERS_CLOSE, USER_ORDERS_ERROR, USER_ORDERS_MESSAGE, USER_ORDERS_OPEN } from "../actions/profile/orders";
import { userOrdersReducer } from "./user-orders";

const initialState: IOrdersWSStorage = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
};
const order: TOrder =
{
    _id: "657af14d7fd657001ba0916b",
    ingredients: ["643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa093d"],
    status: "done",
    name: "Антарианский люминесцентный флюоресцентный бургер",
    createdAt: "2023-12-14T12:13:01.548Z",
    updatedAt: "2023-12-14T12:13:01.968Z",
    number: 29175,

};

describe('test userOrdersReducer', () => {
    it('should return the initial state', () => {
        const result = userOrdersReducer(undefined, {} as TUserOrdersActions)
        expect(result).toEqual(initialState)
    });


    it('should change connected state on open', () => {
        const result = userOrdersReducer(initialState, { type: USER_ORDERS_OPEN, payload: {} as Event });
        expect(result.wsConnected).toEqual(true)
    });

    it('should change connected state on error', () => {
        const result = userOrdersReducer(initialState, { type: USER_ORDERS_ERROR, payload: {} as Event });
        expect(result.wsConnected).toEqual(false)
    });

    it('should change connected state on close', () => {
        const result = userOrdersReducer(initialState, { type: USER_ORDERS_CLOSE, payload: {} as Event });
        expect(result.wsConnected).toEqual(false)
    });

    it('should change properties on message', () => {
        const message: IOrdersMessage = {
            orders: [order],
            total: 2,
            totalToday: 2

        };
        const result = userOrdersReducer(initialState, { type: USER_ORDERS_MESSAGE, payload: message });
        expect(result.orders).toEqual(message.orders)
        expect(result.total).toEqual(message.total)
        expect(result.totalToday).toEqual(message.totalToday)
    });

});