import { IIngredient } from './ingredient-types';

type TBurgerConstructorStorage = {
    bun: ITheIngredient;
    ingredients: Array<ITheIngredient>;
};

interface IBurgerConstructorStorage extends TBurgerConstructorStorage {}
    
interface ITheIngredient extends IIngredient{
    uniqueId: string;
}

export type {IBurgerConstructorStorage, ITheIngredient, TBurgerConstructorStorage};