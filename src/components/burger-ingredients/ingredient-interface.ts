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

interface IIngredientsListObject{
    ingredients:Array<IIngredient>;
}

interface IIngredientsStorage extends IIngredientsListObject {
    currentTab: string;
}

export type {IIngredient, IIngredientsListObject, IIngredientsStorage};