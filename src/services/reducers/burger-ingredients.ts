import { TStorage } from "../../types/common-types";
import { IIngredient } from "../../types/ingredient-types";
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    SET_CURRENT_INGREDIENT,
    RESET_CURRENT_INGREDIENT,
    TIngredientsActions
} from "../actions/burger-ingredients";

//type
export type TIngredientsStorage = {
    ingredients: Array<IIngredient>
    currentIngredient: IIngredient | null
} & TStorage;

//
const ingredientsInititialState: TIngredientsStorage = {
    ingredients: [],
    isLoading: false,
    isFailed: false,
    errorMessage: '',
    currentIngredient: null
}

export const burgerIngredientsReducer = (state = ingredientsInititialState, action:TIngredientsActions) => {
    switch (action.type) {

        case GET_INGREDIENTS_REQUEST:
            return { ...state, isLoading: true };
        case GET_INGREDIENTS_SUCCESS:
            return { ...state, isLoading: false, isFailed: false, ingredients: action.ingredients };
        case GET_INGREDIENTS_FAILED:
            return { ...state, isLoading: false, isFailed: true, ingredients: ingredientsInititialState.ingredients, errorMessage: action.err.message };
        case SET_CURRENT_INGREDIENT:
            return { ...state, currentIngredient: action.currentIngredient };
        case RESET_CURRENT_INGREDIENT:
            return { ...state, currentIngredient: null };
        default:
            return state;


    }

}