//react, redux, router
import { useParams } from "react-router-dom";
import { FC, useEffect, useMemo } from "react";
//components
import IngredientCard from "../ingredient-card/ingredient-card";
//actions
import { setCurrentIngredientAction } from "../../services/actions/burger-ingredients";
import { useAppDispatch, useAppSelector } from "../../types/app-redux-thunk";

const IngredientDetails: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { ingredients, isLoading, currentIngredient } = useAppSelector(store => store.burgerIngredients);
  const current = useMemo(() => ingredients.find((ingredient) => ingredient._id === id), [id, ingredients]);

  useEffect(() => {
    if (current) {
      dispatch(setCurrentIngredientAction(current))
    }
  }, [dispatch, current]);

  return (
    <>
      {(isLoading && currentIngredient === null) ?
        (<h1> Подождите, идет загрузка ...</h1 >) :
        currentIngredient && (<IngredientCard currentIngredient={currentIngredient} />)}
    </>
  );
}

export default IngredientDetails;