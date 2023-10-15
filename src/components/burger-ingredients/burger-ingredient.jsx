import burgerIngredientStyles from "./burger-ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientPropType } from "../component-prop-types/ingredients-prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { resetCurrentIngredientAction, setCurrentIngredientAction } from "../../services/actions/burger-ingredients";
import { useMemo } from "react";
import { addConstructorIngredientAction } from "../../services/actions/burger-constructor";
import { useDrag } from "react-dnd";

function BurgerIngredient({ ingredient }) {

  const dispatch = useDispatch();
  //store
  const { currentIngredient } = useSelector(store => store.burgerIngredients);
  const { constructorData } = useSelector(store => store.burgerConstructor);

  const [{ opacity, isDragging }, ref] = useDrag({
    type: 'ingredient',
    item: { ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  //counter
  const count = useMemo(() => {
    const g = constructorData.filter(el => el._id === ingredient._id);
    return g && g.length ? g.length : 0
  }, [constructorData]);

  //event handlers
  function handleIngredientClick(e) {
    if (e.shiftKey) {
      dispatch(addConstructorIngredientAction(ingredient));
      return;
    }
    dispatch(setCurrentIngredientAction(ingredient));
  }

  function handleClose() {
    dispatch(resetCurrentIngredientAction());
  }

  return (

    <li className={`${burgerIngredientStyles.ingredient} mb-8 `}>
      <div ref={ref} onClick={handleIngredientClick} title="Зажмите SHIFT и кликните по ингридиенту, чтобы добавить в корзину">
        {!!count && <Counter count={count} size="default" />}        
          <img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4 mb-1" />
          <div className={`${burgerIngredientStyles.currency} mb-1`}>
            <p className="text text_type_digits-default ">{ingredient.price}&nbsp;</p>
            <CurrencyIcon />
          </div>
          <p className="text text_type_main-small">{ingredient.name}</p>
      </div>
      {currentIngredient &&
        (<Modal title="Детали ингредиента" onClose={handleClose}>
          <IngredientDetails />
        </Modal>)}
    </li>

  )
}

BurgerIngredient.propTypes = {
  ingredient: IngredientPropType.isRequired
}

export default BurgerIngredient;