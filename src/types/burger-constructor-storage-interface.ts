import { IIngredient, IIngredientsListObject } from "./ingredient-interface";
interface IBurgerConstructorStorage extends IIngredientsListObject{    
    bun: IIngredient;
}

interface ITheIngredient extends IIngredient{
    uniqueId: string;
}

export type {IBurgerConstructorStorage, ITheIngredient};