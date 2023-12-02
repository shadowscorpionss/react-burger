import { IAction, actionCreator } from '.';
import { v4 as uuid4 } from 'uuid';
import { IIngredient } from '../../types/ingredient-types';
import { ITheIngredient } from '../../types/constructor-types';

export const ADD_CONSTRUCTOR_INGREDIENT: 'ADD_CONSTRUCTOR_INGREDIENT' = 'ADD_CONSTRUCTOR_INGREDIENT';
export const SET_CONSTRUCTOR_BUN: 'SET_CONSTRUCTOR_BUN' = 'SET_CONSTRUCTOR_BUN';
export const REMOVE_CONSTRUCTOR_INGREDIENT: 'REMOVE_CONSTRUCTOR_INGREDIENT' = 'REMOVE_CONSTRUCTOR_INGREDIENT';
export const CLEAR_CONSTRUCTOR_DATA: 'CLEAR_CONSTRUCTOR_DATA' = 'CLEAR_CONSTRUCTOR_DATA';
export const SORT_CONSTRUCTOR_DATA: 'SORT_CONSTRUCTOR_DATA' = 'SORT_CONSTRUCTOR_DATA';

export interface IAddConstructorIngredientAction extends IAction<typeof ADD_CONSTRUCTOR_INGREDIENT> {
    ingredient: ITheIngredient;
}
export interface ISetConstructorBunAction extends IAction<typeof SET_CONSTRUCTOR_BUN> {
    bun: ITheIngredient;
}
export interface IRemoveConstructorIngredientAction extends IAction<typeof REMOVE_CONSTRUCTOR_INGREDIENT> {
    uniqueId: string;
}

export interface IClearConstructorDataAction extends IAction<typeof CLEAR_CONSTRUCTOR_DATA> { }

export interface ISortConstructorDataAction extends IAction<typeof SORT_CONSTRUCTOR_DATA> {
    ingredients: Array<ITheIngredient>;
}

export type TBurgerConstructorActions =
    | IAddConstructorIngredientAction
    | ISetConstructorBunAction
    | IRemoveConstructorIngredientAction
    | IClearConstructorDataAction
    | ISortConstructorDataAction;


//helper
export const addUniqueId = (item: IIngredient): ITheIngredient => {
    return { ...item, uniqueId: uuid4() };
}

//actions
export const sortConstructorDataAction = (ingredients: Array<ITheIngredient>): ISortConstructorDataAction => ({ ...actionCreator(SORT_CONSTRUCTOR_DATA), ingredients });
export const addConstructorIngredientAction = (ingredient: IIngredient): IAddConstructorIngredientAction => ({ ...actionCreator(ADD_CONSTRUCTOR_INGREDIENT), ingredient: addUniqueId(ingredient) });
export const removeConstructorIngredientAction = (uniqueId: string): IRemoveConstructorIngredientAction => ({ ...actionCreator(REMOVE_CONSTRUCTOR_INGREDIENT), uniqueId });
export const clearConstructorDataAction = (): IClearConstructorDataAction => actionCreator(CLEAR_CONSTRUCTOR_DATA);
export const setConstructorBunAction = (bun: IIngredient): ISetConstructorBunAction => ({ ...actionCreator(SET_CONSTRUCTOR_BUN), bun: addUniqueId(bun) });