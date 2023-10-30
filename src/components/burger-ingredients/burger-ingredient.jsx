import burgerIngredientStyles from "./burger-ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientPropType } from "../component-prop-types/ingredients-prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { resetCurrentIngredientActionCreator, setCurrentIngredientActionCreator } from "../../services/actions/burger-ingredients";
import { useMemo } from "react";
import { addConstructorIngredientAction, setConstructorBunAction } from "../../services/actions/burger-constructor";
import { useDrag } from "react-dnd";
import { INGREDIENTS_PATH } from "../../pages/pages-paths";
import { Link, useLocation } from "react-router-dom";

function BurgerIngredient({ ingredient }) {
  const location = useLocation();
  const dispatch = useDispatch();
  //store
  const { ingredients, bun } = useSelector(store => store.burgerConstructor);

  const [{ opacity }, drag] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  //counter
  const count = useMemo(() => {
    if (ingredient.type === "bun" && bun._id == ingredient._id) {
      return 2;
    }
    const g = ingredients.filter(el => el ? el._id === ingredient._id : null);
    return g && g.length ? g.length : 0
  }, [ingredients, bun]);

  //event handlers
  const handleIngredientClick = (e) => {
    if (e.shiftKey) {
      if (ingredient.type !== "bun")
        dispatch(addConstructorIngredientAction(ingredient));
      else
        dispatch(setConstructorBunAction(ingredient));
      return;
    }
    dispatch(setCurrentIngredientActionCreator(ingredient));
  }

  const handleClose = () => {
    dispatch(resetCurrentIngredientActionCreator());
  }

  return (

    <li className={`${burgerIngredientStyles.ingredient} mb-8 `}>
      <Link
        to={`${INGREDIENTS_PATH}/${ingredient._id}`}
        state={{ background: location }}
        className={burgerIngredientStyles.container}
      >
        <div style={{ opacity: { opacity } }} ref={drag} onClick={handleIngredientClick} title="Зажмите SHIFT и кликните по ингридиенту, чтобы добавить в корзину">
          {!!count && <Counter count={count} size="default" />}
          <img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4 mb-1" />
          <div className={`${burgerIngredientStyles.currency} mb-1`}>
            <p className="text text_type_digits-default ">{ingredient.price}&nbsp;</p>
            <CurrencyIcon />
          </div>
          <p className="text text_type_main-small">{ingredient.name}</p>
        </div>
      </Link>
    </li>

  )
}

BurgerIngredient.propTypes = {
  ingredient: IngredientPropType.isRequired
}

export default BurgerIngredient;