import { TOrder, TOrderStorage } from '../../types/order-types';
import { MAKE_ORDER_FAILED, MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, TMakeOrderActions } from '../actions/order';

const defaultOrder : TOrder ={
    number:0,
    _id:'',
    name:'',
    ingredients:[],
    status:'',
    updatedAt:'',
    createdAt:''
}


const orderInititialState: TOrderStorage = {
    order: defaultOrder,
    isFailed: false,
    isLoading: false,
    errorMessage: ''
}

export const orderReducer = (state = orderInititialState, action: TMakeOrderActions) => {
    switch (action.type) {
        case MAKE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isFailed: false,
                errorMessage: '',
                order: action.order
            };
        case MAKE_ORDER_FAILED:
            return {
                ...state,
                order: orderInititialState.order,
                isLoading: false,
                isFailed: true,
                errorMessage: action.err.message
            };
        case MAKE_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailed: false,
                order: orderInititialState.order,
            };
        default:
            return state;
    }
}