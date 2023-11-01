import { actionCreator, requestErrorActionCreator } from ".";
import { postOrderRequest } from "../../utils/api";
import { clearConstructorDataAction } from "./burger-constructor";

export const MAKE_ORDER_REQUEST = "MAKE_ORDER_REQUEST";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS";


export const makeOrderSuccessAction = (order) => ({ ...actionCreator(MAKE_ORDER_SUCCESS), order });
export const makeOrderRequestAction = () => actionCreator(MAKE_ORDER_REQUEST);

export const makeOrder = (ingredientsIds) => (dispatch) => {
    const dispatchError = (err) => dispatch(requestErrorActionCreator(MAKE_ORDER_FAILED, err));
    dispatch(makeOrderRequestAction())
    postOrderRequest(ingredientsIds)
        .then(res => {
            const { order } = res;
            dispatch(makeOrderSuccessAction(order));
            dispatch(clearConstructorDataAction());
        })
        .catch(dispatchError)

}