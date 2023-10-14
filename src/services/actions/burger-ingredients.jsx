
import { getIngredientsRequest } from "../../utils/api";
import { errorActionCreator, actionCreator } from ".";
import { generateConstructorDataAction } from "./burger-constructor";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const RESET_CURRENT_INGREDIENT = "RESET_CURRENT_INGREDIENT";


export const getIngredientsSuccessAction = (data) => {
    return { ...actionCreator(GET_INGREDIENTS_SUCCESS), data };
}

export const getIngredientsRequestAction = ()=>{
    return actionCreator(GET_INGREDIENTS_REQUEST);
}

export const setCurrentIngredientAction=(item)=>{
    return {...actionCreator(SET_CURRENT_INGREDIENT), item};
}

export const resetCurrentIngredientAction=()=>{
    return actionCreator(RESET_CURRENT_INGREDIENT);
}

export const getIngredients = () => (dispatch) => {
    const dispatchError = (errorMessage) => {
        dispatch(errorActionCreator(GET_INGREDIENTS_FAILED, errorMessage));
    }
    dispatch(getIngredientsRequestAction());
    getIngredientsRequest().then(res => {
        if (res && res.success) {
            dispatch(getIngredientsSuccessAction(res.data));       
            dispatch(generateConstructorDataAction(res.data));     
        } else {
            const { message } = res;
            dispatchError(message);
        }
    }).catch(err => dispatchError(err));

    ;
};


