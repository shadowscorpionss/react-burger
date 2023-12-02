//react, redux, router
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect, useMemo } from "react";
//components
import IngredientCard from "../ingredient-card/ingredient-card";
//types
import { IIngredientsStorage } from "../../types/ingredient-types";
//actions
import { setCurrentIngredientAction } from "../../services/actions/burger-ingredients";

const IngredientDetails: FC<{}> = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { ingredients, isLoading, currentIngredient } = useSelector<any, IIngredientsStorage>(store => store.burgerIngredients);
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