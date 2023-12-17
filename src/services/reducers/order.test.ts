import { TOrder, TOrderStorage, defaultOrder } from "../../types/order-types";
import { MAKE_ORDER_FAILED, MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, TMakeOrderActions } from "../actions/order";
import { orderReducer } from "./order";

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
const initialState: TOrderStorage = {
    order: defaultOrder,
    isFailed: false,
    isLoading: false,
    errorMessage: ''
}

describe('test orderReducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {} as TMakeOrderActions)).toEqual(initialState)
    });

    it('should return loading state on request', () => {
        const expected = {
            ...initialState,
            isLoading: true,
            isFailed: false
        };
        const received = orderReducer(initialState, {
            type: MAKE_ORDER_REQUEST
        });
        expect(received).toEqual(expected)
    });

    it('should return order if success', () => {
        const expected = {
            ...initialState,
            isLoading: false,
            isFailed: false,
            order: order
        };
        const received = orderReducer(initialState, {
            type: MAKE_ORDER_SUCCESS,
            order: order
        });
        expect(received).toEqual(expected)
    });

    it('should return error message if failed', () => {
        const expected = {
            ...initialState,
            isFailed: true,
            isLoading: false,
            errorMessage: 'failed'
        };
        const received = orderReducer(initialState, {
            type: MAKE_ORDER_FAILED,
            err: { message: 'failed', status: 0, additional: '' }
        });
        expect(received).toEqual(expected)
    });


});