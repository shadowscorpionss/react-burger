import { v4 as uuid4 } from "uuid";
import {
    GET_CONSTRUCTOR_FAILED,
    GET_CONSTRUCTOR_REQUEST, 
    GET_CONSTRUCTOR_SUCCESS,
    GENERATE_CONSTRUCTOR_DATA,
    ADD_CONSTRUCTOR_INGREDIENT,
    CLEAR_CONSTRUCTOR_DATA,
    REMOVE_CONSTRUCTOR_INGREDIENT
} from "../actions/burger-constructor";


const inititialState = {
    isLoading: false,
    isFailed: false,
    ingredients: [],
}

function addUniqueId(item) {
    return { ...item, uniqueId: uuid4() };
}

export const burgerConstructorReducer = (state = inititialState, action) => {
    switch (action.type) {
        case GET_CONSTRUCTOR_REQUEST:
            return { ...state, isLoading: true };
        case GET_CONSTRUCTOR_SUCCESS:
            return { ...state, isLoading: false, isFailed: false, ingredients: action.data.map(item => addUniqueId(item)) };
        case GET_CONSTRUCTOR_FAILED:
            return { ...state, isLoading: false, isFailed: true, ingredients: [] };

        case GENERATE_CONSTRUCTOR_DATA:
            const data = action.data;
            //random random elements (not bun)  
            const randomShuffledIngredients = [...data.filter(el => el.type !== "bun")].sort(() => 0.5 - Math.random())
            const minCount = 1;
            const randomIngredientsLength = Math.floor((randomShuffledIngredients.length - minCount) * Math.random()) + minCount;
            const ingredients = randomShuffledIngredients.slice(0, randomIngredientsLength).map(el => addUniqueId(el));

            //buns
            const bunsArr = data.filter(el => el.type === "bun");

            //random bun
            const randomBun = bunsArr[Math.floor(bunsArr.length * Math.random())];
            randomBun.uniqueId = uuid4();
            return { ...state, ingredients: [randomBun, ...ingredients, randomBun] };

        case REMOVE_CONSTRUCTOR_INGREDIENT:
            return { ...state, ingredients: state.ingredients.filter(el => el.uniqueId !== action.uniqueId) };

        case ADD_CONSTRUCTOR_INGREDIENT:
            const item = addUniqueId(action.item);
            let exIngredients = state.data.filter(el => el.type !== "bun");
            let exBun = state.data.find(el => el.type === "bun");
            if (item.type === "bun") {
                exBun = item;
            } else {
                exIngredients.push(item);
            }
            return { ...state, ingredients: [exBun, ...exIngredients, exBun] };
        case CLEAR_CONSTRUCTOR_DATA:
            return inititialState;
        default:
            return state;


    }

}