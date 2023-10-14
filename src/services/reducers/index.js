import { combineReducers } from "redux";

const emptyReducer = (state = '', action) => {
    return state;
}


export const rootReducer = combineReducers({
    empty: emptyReducer,
});