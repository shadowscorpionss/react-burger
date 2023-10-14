import { ORDER_FAILED, ORDER_REQUEST, ORDER_SUCCESS } from "../actions/order";

const inititialState ={
    order: {},
    isFailed: false,
    isLoading: false,
    errorMessage:''
}

export const orderReducer = (state = inititialState, action ) => {
    switch (action.type){
        case ORDER_SUCCESS:
            return {...state, isLoading:false, isFailed:false, errorMessage: '', order: action.data};
        case ORDER_FAILED:
            return {...state, order:{}, isLoading: false, isFailed:true, errorMessage: action.errorMessage};
        case ORDER_REQUEST:
            return {...state, isLoading: true};
        default:
            return state;
    }
}