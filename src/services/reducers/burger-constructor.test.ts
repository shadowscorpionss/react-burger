import { IOrderStorage, TOrder, TOrderStorage, defaultOrder } from '../../types/order-types';
import { GET_CURRENT_ORDER_FAILED, GET_CURRENT_ORDER_REQUEST, GET_CURRENT_ORDER_SUCCESS, TGetCurrentOrderActions } from '../actions/current-order';
import { MAKE_ORDER_FAILED, MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, TMakeOrderActions } from '../actions/order';
import { currentOrderReducer } from './current-order';
import { orderReducer } from './order';

const order: TOrder =
{
    _id: '657af14d7fd657001ba0916b',
    ingredients: ['643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093d'],
    status: 'done',
    name: 'Антарианский люминесцентный флюоресцентный бургер',
    createdAt: '2023-12-14T12:13:01.548Z',
    updatedAt: '2023-12-14T12:13:01.968Z',
    number: 29175,

};

const initialState: IOrderStorage = {
    order: defaultOrder,
    isLoading: false,
    isFailed: false,
    errorMessage: ''
}

describe('test currentOrderReducer', () => {
    it('should return the initial state', () => {
        expect(currentOrderReducer(undefined, {} as TGetCurrentOrderActions)).toEqual(initialState)
    });

    it('should return loading state on request', () => {
        const expected = {
            ...initialState,
            isLoading: true,
            isFailed: false
        };
        const received = currentOrderReducer(initialState, {
            type: GET_CURRENT_ORDER_REQUEST
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
        const received = currentOrderReducer(initialState, {
            type: GET_CURRENT_ORDER_SUCCESS,
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
        const received = currentOrderReducer(initialState, {
            type: GET_CURRENT_ORDER_FAILED,
            err: { message: 'failed', status: 0, additional: '' }
        });
        expect(received).toEqual(expected)
    });

});