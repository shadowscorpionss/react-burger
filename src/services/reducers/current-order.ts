import { IOrderStorage, defaultOrder } from "../../types/order-types";
import { GET_CURRENT_ORDER_FAILED, GET_CURRENT_ORDER_REQUEST, GET_CURRENT_ORDER_SUCCESS, TGetCurrentOrderActions } from "../actions/current-order";


const currentOrderInitialState: IOrderStorage = {
    order: defaultOrder,
    isLoading: false,
    isFailed: false,
    errorMessage: ''
}

export const currentOrderReducer = (state = currentOrderInitialState, action: TGetCurrentOrderActions): IOrderStorage => {
    switch (action.type) {
        case GET_CURRENT_ORDER_REQUEST:
            return { ...state, isLoading: true, errorMessage: '', isFailed: false };

        case GET_CURRENT_ORDER_FAILED:
            return { ...state, isLoading: false, errorMessage: action.err.message, isFailed: true };

        case GET_CURRENT_ORDER_SUCCESS:
            return { ...state, isLoading: false, isFailed: false, errorMessage: '', order: action.order };
        default:
            return state;
    }
};