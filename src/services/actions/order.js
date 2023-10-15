import { actionCreator, errorActionCreator } from ".";
import { postOrderRequest } from "../../utils/api";
import { clearConstructorDataAction } from "./burger-constructor";

export const MAKE_ORDER_REQUEST = "MAKE_ORDER_REQUEST";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS";


export const makeOrderSuccessAction = (order)=> ({...actionCreator(MAKE_ORDER_SUCCESS), order});
export const makeOrderRequestAction=()=> actionCreator(MAKE_ORDER_REQUEST);



export const makeOrder = (ingredientsIds) => (dispatch) => {
    const dispatchError = (errorMessage) => dispatch(errorActionCreator(MAKE_ORDER_FAILED, errorMessage));
    dispatch(makeOrderRequestAction())
    postOrderRequest(ingredientsIds)
        .then(res => {            
            if (res && res.success) {
                const {order}= res;
                dispatch( makeOrderSuccessAction(order));
                dispatch(clearConstructorDataAction());
            }else{
                const {message} = res;
                dispatchError(message);
            }
            
        })
        .catch(err => {
            const { message } = err;
            dispatchError(message);
        })

}