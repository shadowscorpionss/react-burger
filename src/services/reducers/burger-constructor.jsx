import { v4 as uuid4 } from "uuid";
import {
    GET_CONSTRUCTOR_DATA_FAILED,
    GET_CONSTRUCTOR_DATA_REQUEST, 
    GET_CONSTRUCTOR_DATA_SUCCESS,
    GENERATE_CONSTRUCTOR_DATA,
    ADD_CONSTRUCTOR_INGREDIENT,
    CLEAR_CONSTRUCTOR_DATA,
    REMOVE_CONSTRUCTOR_INGREDIENT
} from "../actions/burger-constructor";


const inititialState = {
    isLoading: false,
    isFailed: false,
    constructorData: [],
}

function addUniqueId(item) {
    return { ...item, uniqueId: uuid4() };
}

export const burgerConstructorReducer = (state = inititialState, action) => {
    switch (action.type) {
        case GET_CONSTRUCTOR_DATA_REQUEST:
            return { ...state, isLoading: true };
        case GET_CONSTRUCTOR_DATA_SUCCESS:
            return { ...state, isLoading: false, isFailed: false, ingredients: action.data.map(item => addUniqueId(item)) };
        case GET_CONSTRUCTOR_DATA_FAILED:
            return { ...state, isLoading: false, isFailed: true, ingredients: [] };
        case GENERATE_CONSTRUCTOR_DATA:
            const {data} = action;
            if (!data || !data.length)
                return state;
            //random random elements (not bun)  
            const randomShuffledIngredients = [...data.filter(el => el.type !== "bun")].sort(() => 0.5 - Math.random())
            const minCount = 1;
            const randomIngredientsLength = Math.floor((randomShuffledIngredients.length - minCount) * Math.random()) + minCount;
            const choosen = randomShuffledIngredients.slice(0, randomIngredientsLength).map(el => addUniqueId(el));

            //buns
            const bunsArr = data.filter(el => el.type === "bun");

            //random bun
            const randomBun = addUniqueId(bunsArr[Math.floor(bunsArr.length * Math.random())]);
            
            return { ...state, constructorData: [randomBun, ...choosen, randomBun] };

        case REMOVE_CONSTRUCTOR_INGREDIENT:
            return { ...state, constructorData: state.constructorData.filter(el => el.uniqueId !== action.uniqueId) };

        case ADD_CONSTRUCTOR_INGREDIENT:
            const item = addUniqueId(action.item);
            let exIngredients = state.constructorData.filter(el => el.type !== "bun");
            let exBun = state.constructorData.find(el => el.type === "bun");
            if (item.type === "bun") {
                exBun = item;
            } else {
                exIngredients.push(item);
            }
            return { ...state, constructorData: [exBun, ...exIngredients, exBun] };
        case CLEAR_CONSTRUCTOR_DATA:
            return inititialState;
        default:
            return state;


    }

}