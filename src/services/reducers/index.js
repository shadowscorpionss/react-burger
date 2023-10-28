import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { burgerConstructorReducer } from "./burger-constructor";
import { orderReducer } from "./order";
import { profileReducer } from "./profile";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    profile: profileReducer,
});