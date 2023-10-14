import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    SET_CURRENT_INGREDIENT,
    RESET_CURRENT_INGREDIENT
} from "../actions/burger-ingredients";


const inititialState = {
    ingredients: [],
    isLoading: false,
    isFailed: false,
    currentIngredient: {}
}

export const burgerIngredientsReducer = (state = inititialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return { ...state, isLoading: true };
        case GET_INGREDIENTS_SUCCESS:
            return { ...state, isLoading: false, isFailed: false, ingredients: action.data };
        case GET_INGREDIENTS_FAILED:
            return { ...state, isLoading: false, isFailed: true, ingredients: [] };
        case SET_CURRENT_INGREDIENT:
            return { ...state, currentIngredient: action.item };
        case RESET_CURRENT_INGREDIENT:
            return { ...state, currentIngredient: {} };
        default:
            return state;


    }

}