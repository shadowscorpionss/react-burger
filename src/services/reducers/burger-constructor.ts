import emptybun from "../../images/emptybun.png";
import { TBurgerConstructorStorage } from "../../types/constructor-types";
import { IIngredient } from "../../types/ingredient-types";
import {
    ADD_CONSTRUCTOR_INGREDIENT,
    CLEAR_CONSTRUCTOR_DATA,
    REMOVE_CONSTRUCTOR_INGREDIENT,
    SORT_CONSTRUCTOR_DATA,
    SET_CONSTRUCTOR_BUN,
    TBurgerConstructorActions,
    addUniqueId
} from "../actions/burger-constructor";

const defaultBun: IIngredient = {
    _id: "",
    price: 0,
    name: "",
    image: emptybun,
    image_mobile: emptybun,
    image_large: emptybun,
    type: "bun",
    __v: 0
};

const burgerConstructorInititialState: TBurgerConstructorStorage = {
    bun: addUniqueId(defaultBun),
    ingredients: []
}

export const burgerConstructorReducer = (state = burgerConstructorInititialState, action: TBurgerConstructorActions) => {
    switch (action.type) {
        case REMOVE_CONSTRUCTOR_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter(el => el.uniqueId !== action.uniqueId)
            };
        case ADD_CONSTRUCTOR_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient]
            };
        case SET_CONSTRUCTOR_BUN:
            return {
                ...state,
                bun: action.bun
            };
        case CLEAR_CONSTRUCTOR_DATA:
            return burgerConstructorInititialState;
        case SORT_CONSTRUCTOR_DATA:
            return {
                ...state,
                ingredients: action.ingredients
            };
        default:
            return state;


    }

}