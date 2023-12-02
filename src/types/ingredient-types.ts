import { TStorage } from "./common-types";

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

export type TIngredientsStorage = {
    ingredients: Array<IIngredient>
    currentIngredient: IIngredient | null
} & TStorage;


interface IIngredientsStorage extends TIngredientsStorage { }

export type { IIngredient, IIngredientsStorage };