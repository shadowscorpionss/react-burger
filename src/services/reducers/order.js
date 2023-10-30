import { MAKE_ORDER_FAILED, MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS } from "../actions/order";

const inititialState ={
    order: {
        number: undefined
    },
    isFailed: false,
    isLoading: false,
    errorMessage:""
}

export const orderReducer = (state = inititialState, action ) => {
    switch (action.type){
        case MAKE_ORDER_SUCCESS:
            return {...state, isLoading:false, isFailed:false, errorMessage: "", order: action.order};
        case MAKE_ORDER_FAILED:
            return {...state, order:inititialState.order, isLoading: false, isFailed:true, errorMessage: action.errorMessage};
        case MAKE_ORDER_REQUEST:
            return {...state, order: inititialState.order, isLoading: true};
        default:
            return state;
    }
}