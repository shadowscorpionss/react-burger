import { IIngredient, IIngredientsListObject } from "./ingredient-types";

interface IBurgerConstructorStorage extends IIngredientsListObject{    
    bun: IIngredient;
}

interface ITheIngredient extends IIngredient{
    uniqueId: string;
}

export type {IBurgerConstructorStorage, ITheIngredient};