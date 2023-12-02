import { IStorage } from "./common-types";

interface IIngredient {
    _id: string;
    type: "bun" | "main" | "sauce";
    name: string;
    proteins?: number;
    fat?: number;
    carbohydrates?: number;
    calories?: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

interface IIngredientsStorage extends IStorage {
    ingredients: Array<IIngredient>;
    currentIngredient: IIngredient;
}

export type { IIngredient, IIngredientsStorage };