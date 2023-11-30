import emptybun from "../../images/emptybun.png";
import {
    ADD_CONSTRUCTOR_INGREDIENT,
    CLEAR_CONSTRUCTOR_DATA,
    REMOVE_CONSTRUCTOR_INGREDIENT,
    SORT_CONSTRUCTOR_DATA,
    SET_CONSTRUCTOR_BUN
} from "../actions/burger-constructor";


const inititialState = {
    isLoading: false,
    isFailed: false,
    bun: {
        _id: "",
        price: 0,
        name: "", 
        image: emptybun, 
        type: "bun"
    },
    ingredients: [],
}


export const burgerConstructorReducer = (state = inititialState, action) => {
    switch (action.type) {

        case REMOVE_CONSTRUCTOR_INGREDIENT:
            return { ...state, ingredients: state.ingredients.filter(el => el.uniqueId !== action.uniqueId) };

        case ADD_CONSTRUCTOR_INGREDIENT:
            if (action.item.type === "bun")
                return state;
            const {item} = action;
            return { ...state, ingredients: [...state.ingredients, item] };

        case SET_CONSTRUCTOR_BUN:
            const {bun} =action;
            return {...state, bun: bun};

        case CLEAR_CONSTRUCTOR_DATA:
            return inititialState;

        case SORT_CONSTRUCTOR_DATA:
            const { ingredients } = action;
            if (!ingredients || !ingredients.length)
                return state;
            return { ...state, ingredients: ingredients };

        default:
            return state;


    }

}