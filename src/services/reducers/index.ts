import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { burgerConstructorReducer } from "./burger-constructor";
import { orderReducer } from "./order";
import { profileReducer } from "./profile";
import { feedReducer } from './feed'
import { currentOrderReducer } from "./current-order";
import { userOrdersReducer } from "./user-orders";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    profile: profileReducer,
    feed: feedReducer,
    currentOrder: currentOrderReducer,
    userOrders: userOrdersReducer
});