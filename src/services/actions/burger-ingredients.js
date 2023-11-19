
import { getIngredientsRequest } from "../../utils/api";
import { actionCreator, requestErrorActionCreator } from ".";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const RESET_CURRENT_INGREDIENT = "RESET_CURRENT_INGREDIENT";


//action creators
export const getIngredientsSuccessActionCreator = ({ data }) => ({ ...actionCreator(GET_INGREDIENTS_SUCCESS), data });
export const getIngredientsRequestActionCreator = () => actionCreator(GET_INGREDIENTS_REQUEST);
export const setCurrentIngredientActionCreator = (item) => ({ ...actionCreator(SET_CURRENT_INGREDIENT), item });
export const resetCurrentIngredientActionCreator = () => actionCreator(RESET_CURRENT_INGREDIENT);


//ingredients load promise with dispatch
export const getIngredients = () => (dispatch) => {
    const dispatchError = (err) =>
        dispatch(requestErrorActionCreator(GET_INGREDIENTS_FAILED, err))

    const dispatchSuccess = res => dispatch(getIngredientsSuccessActionCreator(res))
    dispatch(getIngredientsRequestActionCreator());
    getIngredientsRequest()
        .then(dispatchSuccess)
        .catch(dispatchError);

    ;
};


