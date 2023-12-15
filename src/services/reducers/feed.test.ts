import { TOrder } from "../../types/order-types";
import { IOrdersMessage, IOrdersWSStorage } from "../../types/orders-ws-types";
import { FEED_CLOSE, FEED_ERROR, FEED_MESSAGE, FEED_OPEN, TFeedActions } from "../actions/feed";
import { feedReducer } from "./feed";

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

describe('test feedReducer', () => {
    it('should return the initial state', () => {
        const result = feedReducer(undefined, {} as TFeedActions)
        expect(result).toEqual(initialState)
    });


    it('should change connected state on open', () => {
        const result = feedReducer(initialState, { type: FEED_OPEN, payload: {} as Event });
        expect(result.wsConnected).toEqual(true)
    });

    it('should change connected state on error', () => {
        const result = feedReducer(initialState, { type: FEED_ERROR,payload: {} as Event });
        expect(result.wsConnected).toEqual(false)
    });

    it('should change connected state on close', () => {
        const result = feedReducer(initialState, { type: FEED_CLOSE,payload: {} as Event });
        expect(result.wsConnected).toEqual(false)
    });

    it('should change properties on message', () => {
        const message: IOrdersMessage = {
            orders: [order],
            total: 1,
            totalToday: 1

        };
        const result = feedReducer(initialState, { type: FEED_MESSAGE,payload: message  });
        expect(result.orders).toEqual(message.orders)
        expect(result.total).toEqual(message.total)
        expect(result.totalToday).toEqual(message.totalToday)
    });

});