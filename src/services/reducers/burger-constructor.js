import { v4 as uuid4 } from "uuid";
import emptybun from "../../images/emptybun.png";
import {
    GET_CONSTRUCTOR_DATA_FAILED,
    GET_CONSTRUCTOR_DATA_REQUEST,
    GET_CONSTRUCTOR_DATA_SUCCESS,
    GENERATE_CONSTRUCTOR_DATA,
    ADD_CONSTRUCTOR_INGREDIENT,
    CLEAR_CONSTRUCTOR_DATA,
    REMOVE_CONSTRUCTOR_INGREDIENT,
    SORT_CONSTRUCTOR_DATA
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

function addUniqueId(item) {
    return { ...item, uniqueId: uuid4() };
}

export const burgerConstructorReducer = (state = inititialState, action) => {
    switch (action.type) {
        case GET_CONSTRUCTOR_DATA_REQUEST:
            return { ...state, isLoading: true };
        case GET_CONSTRUCTOR_DATA_SUCCESS:
            const mappedData = action.data.map(item => addUniqueId(item));
            return { ...state, isLoading: false, isFailed: false, ingredients: mappedData.filter(el => el.type !== "bun"), bun: mappedData.find(el => el.type === "bun") };
        case GET_CONSTRUCTOR_DATA_FAILED:
            return { ...state, isLoading: false, isFailed: true, ingredients: [] };

        case GENERATE_CONSTRUCTOR_DATA:
            const { data } = action;
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

            return { ...state, bun: randomBun, ingredients: choosen };

        case REMOVE_CONSTRUCTOR_INGREDIENT:
            return { ...state, ingredients: state.ingredients.filter(el => el.uniqueId !== action.uniqueId) };

        case ADD_CONSTRUCTOR_INGREDIENT:
            const newItem = addUniqueId(action.item);

            if (newItem.type === "bun")
                return { ...state, bun: newItem };

            return { ...state, ingredients: [...state.ingredients, newItem] };

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