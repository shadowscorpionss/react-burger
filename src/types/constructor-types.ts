import { IStorage } from "./common-types";
import { IIngredient } from "./ingredient-types";

interface IBurgerConstructorStorage extends IStorage {    
    bun: ITheIngredient;
    ingredients: Array<ITheIngredient>;
}

interface ITheIngredient extends IIngredient{
    uniqueId: string;
}

export type {IBurgerConstructorStorage, ITheIngredient};