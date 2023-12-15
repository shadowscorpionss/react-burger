import { IIngredient, TIngredientsStorage } from "../../types/ingredient-types";
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    RESET_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT, TIngredientsActions
} from "../actions/burger-ingredients";
import { burgerIngredientsReducer } from "./burger-ingredients";

const initialState: TIngredientsStorage = {
    ingredients: [],
    isLoading: false,
    isFailed: false,
    errorMessage: '',
    currentIngredient: null
}

const newIngredient: IIngredient =
{
    '_id': '60666c42cc7b410027a1a9b2',
    'name': 'Флюоресцентная булка R2-D3',
    'type': 'bun',
    'proteins': 44,
    'fat': 26,
    'carbohydrates': 85,
    'calories': 643,
    'price': 988,
    'image': 'https://code.s3.yandex.net/react/code/bun-01.png',
    'image_mobile': 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    'image_large': 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    '__v': 0
}

describe('test burgerIngredientsReducer', () => {
    it('should return the initial state', () => {
        const result = burgerIngredientsReducer(undefined, {} as TIngredientsActions)
        expect(result).toEqual(initialState)
    });

    it('should return loading state on request', () => {
        const result = burgerIngredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST });
        expect(result.isFailed).toEqual(false)
        expect(result.isLoading).toEqual(true)
        expect(result.errorMessage).toEqual('')
    });

    it('should return error message on failed', () => {
        const result = burgerIngredientsReducer(initialState, { type: GET_INGREDIENTS_FAILED, err: { status: 0, additional: '', message: 'error' } });
        expect(result.isFailed).toEqual(true)
        expect(result.isLoading).toEqual(false)
        expect(result.errorMessage).toEqual('error')
    });

    it('should return ingredient array on success', () => {
        const result = burgerIngredientsReducer(initialState, { type: GET_INGREDIENTS_SUCCESS, ingredients: [newIngredient] });
        expect(result.isFailed).toEqual(false)
        expect(result.isLoading).toEqual(false)
        expect(result.errorMessage).toEqual('')
        expect(result.ingredients.length).toEqual(1)
        expect(result.ingredients[0]).toEqual(newIngredient)
    });

    it('should set current ingredient', () => {
        const result = burgerIngredientsReducer(initialState, { type: SET_CURRENT_INGREDIENT, currentIngredient: newIngredient });
        expect(result.currentIngredient).toEqual(newIngredient)
    });

    it('should reset current ingredient', () => {
        let result = burgerIngredientsReducer(initialState, { type: SET_CURRENT_INGREDIENT, currentIngredient: newIngredient });
        expect(result.currentIngredient).not.toBeNull()
        expect(result.currentIngredient).toEqual(newIngredient)
        result = burgerIngredientsReducer(result, { type: RESET_CURRENT_INGREDIENT })
        expect(result.currentIngredient).toBeNull()
    });

});