import { IIngredient } from "../burger-ingredients/ingredient-interface";
interface IBurgerConstructorStorage {
    ingredients: Array<IIngredient>;
    bun: IIngredient;
}
export type {IBurgerConstructorStorage};