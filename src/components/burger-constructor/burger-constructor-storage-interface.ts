import { IIngredient, IIngredientsListObject } from "../burger-ingredients/ingredient-interface";
interface IBurgerConstructorStorage extends IIngredientsListObject{    
    bun: IIngredient;
}
export type {IBurgerConstructorStorage};