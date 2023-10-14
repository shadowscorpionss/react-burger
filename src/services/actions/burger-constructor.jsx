import { actionCreator, errorActionCreator } from ".";
export const GENERATE_CONSTRUCTOR_DATA      ="GENERATE_CONSTRUCTOR_DATA";
export const ADD_CONSTRUCTOR_INGREDIENT     ="ADD_CONSTRUCTOR_INGREDIENT";
export const REMOVE_CONSTRUCTOR_INGREDIENT  ="REMOVE_CONSTRUCTOR_INGREDIENT";
export const CLEAR_CONSTRUCTOR_DATA         ="CLEAR_CONSTRUCTOR_DATA";

export const GET_CONSTRUCTOR_DATA_REQUEST = "GET_CONSTRUCTOR_DATA_REQUEST"; 
export const GET_CONSTRUCTOR_DATA_FAILED  = "GET_CONSTRUCTOR_DATA_FAILED";
export const GET_CONSTRUCTOR_DATA_SUCCESS = "GET_CONSTRUCTOR_DATA_SUCCESS";


export const generateConstructorDataAction=(data)=>{
    return {...actionCreator(GENERATE_CONSTRUCTOR_DATA), data};
}

export const addConstructorIngredientAction= (item)=>{
    return {...actionCreator(ADD_CONSTRUCTOR_INGREDIENT), item};
}

export const removeConstructorIngredientAction= (uniqueId)=>{
    return {...actionCreator(REMOVE_CONSTRUCTOR_INGREDIENT), uniqueId};
}

export const clearConstructorDataAction = () => {
    return actionCreator(CLEAR_CONSTRUCTOR_DATA);
}