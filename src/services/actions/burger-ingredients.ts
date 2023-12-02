
import { IResSuccess, getIngredientsRequest } from '../../utils/api';
import { IAction, IErrorAction, IRequestError, actionCreator, requestErrorActionCreator } from '../../types/action-types';
import { IIngredient } from '../../types/ingredient-types';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const SET_CURRENT_INGREDIENT: 'SET_CURRENT_INGREDIENT' = 'SET_CURRENT_INGREDIENT';
export const RESET_CURRENT_INGREDIENT: 'RESET_CURRENT_INGREDIENT' = 'RESET_CURRENT_INGREDIENT';



//action interfaces
export interface IGetIngredientsAction extends IAction<typeof GET_INGREDIENTS_REQUEST> { }
export interface IGetIngredientsFailedAction extends IErrorAction<typeof GET_INGREDIENTS_FAILED> { }
export interface IGetIngredientsSuccessAction extends IAction<typeof GET_INGREDIENTS_SUCCESS> {
    ingredients: Array<IIngredient>;
}
export interface ISetCurrentIngredientAction extends IAction<typeof SET_CURRENT_INGREDIENT> {
    currentIngredient: IIngredient;
}
export interface IResetCurrentIngredientAction extends IAction<typeof RESET_CURRENT_INGREDIENT> { }

//
export type TIngredientsActions = IGetIngredientsAction | IGetIngredientsFailedAction | IGetIngredientsSuccessAction | ISetCurrentIngredientAction | IResetCurrentIngredientAction;

//action creators
const getIngredientsAction = (): IGetIngredientsAction => actionCreator(GET_INGREDIENTS_REQUEST);
const getIngredientsFailedAction = (err: IRequestError): IGetIngredientsFailedAction => requestErrorActionCreator(GET_INGREDIENTS_FAILED, err);
const getIngredientsSuccessAction = (ingredients: Array<IIngredient>): IGetIngredientsSuccessAction => ({ ...actionCreator(GET_INGREDIENTS_SUCCESS), ingredients });
//public actions
export const setCurrentIngredientAction = (currentIngredient: IIngredient): ISetCurrentIngredientAction => ({ ...actionCreator(SET_CURRENT_INGREDIENT), currentIngredient });
export const resetCurrentIngredientAction = (): IResetCurrentIngredientAction => actionCreator(RESET_CURRENT_INGREDIENT);

interface IIngredientsResponse extends IResSuccess {
    data: Array<IIngredient>;
}

//ingredients load promise with dispatch
export const getIngredientsThunk = (): any => (dispatch: any) => {
    const dispatchError = (err: IRequestError) => dispatch(getIngredientsFailedAction(err));
    const dispatchSuccess = (res: IIngredientsResponse) => dispatch(getIngredientsSuccessAction(res.data));

    dispatch(getIngredientsAction());
    getIngredientsRequest<IIngredientsResponse>()
        .then(dispatchSuccess)
        .catch(dispatchError);
};


