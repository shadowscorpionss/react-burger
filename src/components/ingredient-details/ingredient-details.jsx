import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getIngredients, setCurrentIngredientActionCreator } from "../../services/actions/burger-ingredients";
import { IngredientCard } from "../ingredient-card/ingredient-card";

function IngredientDetails() {

  const dispatch = useDispatch();
  const { id } = useParams();

  const { ingredients, isLoading, currentIngredient } = useSelector(store => store.burgerIngredients);
  const current = useMemo(() => ingredients.find((ingredient) => ingredient._id === id), [id, ingredients]);

  useEffect(() => {
    if (!ingredients || !ingredients.length)
      dispatch(getIngredients());
  }
    , [dispatch, ingredients])


  useEffect(() => {
    if (current) {
      dispatch(setCurrentIngredientActionCreator(current))
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