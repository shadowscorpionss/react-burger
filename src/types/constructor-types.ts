import { IStorage } from "./common-types";
import { IIngredient, IIngredientsListObject } from "./ingredient-types";

interface IBurgerConstructorStorage extends IStorage, IIngredientsListObject{    
    bun: IIngredient;
}

interface ITheIngredient extends IIngredient{
    uniqueId: string;
}

export type {IBurgerConstructorStorage, ITheIngredient};