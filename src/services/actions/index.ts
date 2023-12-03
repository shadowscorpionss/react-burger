import { TBurgerConstructorActions } from './burger-constructor';
import { TIngredientsActions } from './burger-ingredients';
import { TGetAllOrdersActions } from './feed';
import { TMakeOrderActions } from './order';
import { TProfileActions } from './profile';

export type TApplicationActions =
    | TBurgerConstructorActions
    | TIngredientsActions
    | TMakeOrderActions
    | TGetAllOrdersActions
    | TProfileActions;
    