import { actionCreator } from ".";
import { v4 as uuid4 } from "uuid";

export const GENERATE_CONSTRUCTOR_DATA = "GENERATE_CONSTRUCTOR_DATA";
export const ADD_CONSTRUCTOR_INGREDIENT = "ADD_CONSTRUCTOR_INGREDIENT";
export const SET_CONSTRUCTOR_BUN = "SET_CONSTRUCTOR_BUN";
export const REMOVE_CONSTRUCTOR_INGREDIENT = "REMOVE_CONSTRUCTOR_INGREDIENT";
export const CLEAR_CONSTRUCTOR_DATA = "CLEAR_CONSTRUCTOR_DATA";

// export const GET_CONSTRUCTOR_DATA_REQUEST = "GET_CONSTRUCTOR_DATA_REQUEST";
// export const GET_CONSTRUCTOR_DATA_FAILED = "GET_CONSTRUCTOR_DATA_FAILED";
// export const GET_CONSTRUCTOR_DATA_SUCCESS = "GET_CONSTRUCTOR_DATA_SUCCESS";

export const SORT_CONSTRUCTOR_DATA = "SORT_CONSTRUCTOR_DATA";

function addUniqueId(item) {
    return { ...item, uniqueId: uuid4() };
}

export const sortConstructorDataAction = (ingredients) => ({ ...actionCreator(SORT_CONSTRUCTOR_DATA), ingredients });
// export const generateConstructorDataAction = (data) => ({ ...actionCreator(GENERATE_CONSTRUCTOR_DATA), data });
export const addConstructorIngredientAction = (item) => ({ ...actionCreator(ADD_CONSTRUCTOR_INGREDIENT), item: addUniqueId(item) });
export const removeConstructorIngredientAction = (uniqueId) => ({ ...actionCreator(REMOVE_CONSTRUCTOR_INGREDIENT), uniqueId });
export const clearConstructorDataAction = () => actionCreator(CLEAR_CONSTRUCTOR_DATA);
export const setConstructorBunAction = (bun) => ({ ...actionCreator(SET_CONSTRUCTOR_BUN), bun: addUniqueId(bun) });