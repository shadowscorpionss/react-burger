
import { ITheIngredient, TBurgerConstructorStorage } from '../../types/constructor-types';
import { ADD_CONSTRUCTOR_INGREDIENT, CLEAR_CONSTRUCTOR_DATA, REMOVE_CONSTRUCTOR_INGREDIENT, SET_CONSTRUCTOR_BUN, SORT_CONSTRUCTOR_DATA, TBurgerConstructorActions } from '../actions/burger-constructor';
import { burgerConstructorReducer } from './burger-constructor';

const defaultBun: ITheIngredient = {
    uniqueId: '22',
    _id: '',
    price: 0,
    name: 'default',
    image: '',
    image_mobile: '',
    image_large: '',
    type: 'bun',
    __v: 0
};

const newBun: ITheIngredient = {
    uniqueId: '33',
    _id: '',
    price: 1,
    name: 'newBun',
    image: '',
    image_mobile: '',
    image_large: '',
    type: 'bun',
    __v: 0

}



const newMain: ITheIngredient = {
    _id: '',
    price: 0,
    name: 'testMain',
    image: '',
    image_mobile: '',
    image_large: '',
    type: 'main',
    __v: 0,
    uniqueId: '1'
}

const newSauce: ITheIngredient = {
    _id: '',
    price: 0,
    name: 'testSauce',
    image: '',
    image_mobile: '',
    image_large: '',
    type: 'sauce',
    __v: 0,
    uniqueId: '1'
}

const unsorted = [newMain, newSauce];
const sorted = [newSauce,newMain]


const initialState: TBurgerConstructorStorage = {
    bun: defaultBun,
    ingredients: []
}
const addedState: TBurgerConstructorStorage = {
    bun: defaultBun,
    ingredients: [newMain]
}

describe('test currentOrderReducer', () => {
    it('should return the initial state', () => {
        const result = burgerConstructorReducer(undefined, {} as TBurgerConstructorActions)
        expect(result.bun).not.toBeUndefined()
        expect(result.bun.type).toEqual('bun')
        expect(result.ingredients).not.toBeNull()
        expect(result.ingredients.length).toEqual(0)
    });

    it('should add constructor ingredient', () => {
        const result = burgerConstructorReducer(initialState, {
            type: ADD_CONSTRUCTOR_INGREDIENT,
            ingredient: newMain
        });
        expect(result.ingredients.length).toBe(1)
    });

    it('should remove constructor ingredient', () => {
        let result = burgerConstructorReducer(addedState, {} as TBurgerConstructorActions);
        expect(result.ingredients.length).toEqual(1)
        result = burgerConstructorReducer(result, {
            type: REMOVE_CONSTRUCTOR_INGREDIENT,
            uniqueId: '1'
        });
        expect(result.ingredients.length).toEqual(0)
    });

    it('should return the initial state after clear', () => {
        const result = burgerConstructorReducer(addedState, { type: CLEAR_CONSTRUCTOR_DATA })
        expect(result.bun).not.toBeUndefined()
        expect(result.bun.type).toEqual('bun')
        expect(result.ingredients).not.toBeNull()
        expect(result.ingredients.length).toEqual(0)
    });

    it('should set new bun', () => {
        const result = burgerConstructorReducer(initialState, {type:SET_CONSTRUCTOR_BUN, bun: newBun});        
        expect(result.bun.type).toEqual('bun')
        expect(result.bun).not.toEqual(defaultBun)
        expect(result.bun).toEqual(newBun)
    });

    it('should ingredients be sorted', ()=> {
        let result = burgerConstructorReducer(initialState,{}as TBurgerConstructorActions);
        unsorted.forEach(v=> result=burgerConstructorReducer(result, {type: ADD_CONSTRUCTOR_INGREDIENT, ingredient: v}));
        expect(result.ingredients).toEqual(unsorted)
        expect(result.ingredients).not.toEqual(sorted)
        result=burgerConstructorReducer(result, {type: SORT_CONSTRUCTOR_DATA, ingredients: sorted});
        expect(result.ingredients).toEqual(sorted)
        expect(result.ingredients).not.toEqual(unsorted)        
    })

});