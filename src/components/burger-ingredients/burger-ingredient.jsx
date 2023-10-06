import burgerIngredientStyles from "./burger-ingredient.module.css";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientPropType} from "../component-prop-types/ingredients-prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useToggle } from "../../hooks/useToggle";
import PropTypes from "prop-types";


function BurgerIngredient({ingredient, count, addItem}) {
  const {isOpened:showModal, open:openModal, close:closeModal} = useToggle(false);

  function handleIngredientClick(e){  
    if (e.shiftKey && typeof(addItem)==="function"){
        addItem(ingredient);
        return;
    }
    
    openModal();
  }

  return (

    <li className={`${burgerIngredientStyles.ingredient} mb-8 `}>
      <div onClick={handleIngredientClick} title="Зажмите SHIFT и кликните по ингридиенту, чтобы добавить в корзину">
        {!!count && <Counter count={count} size="default"/>}        
        <img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4 mb-1"/>
        <div className={`${burgerIngredientStyles.currency} mb-1`}>
          <p className="text text_type_digits-default ">{ingredient.price}&nbsp;</p>
          <CurrencyIcon/>
        </div>
        <p className="text text_type_main-small">{ingredient.name}</p>
      </div>
      {showModal && 
      (<Modal title="Детали ингредиента" onClose={closeModal}>
        <IngredientDetails ingredient={ingredient}/>
      </Modal>)}
    </li>

  )
}

BurgerIngredient.propTypes = {
  ingredient: IngredientPropType.isRequired,
  count: PropTypes.number,
  addItem: PropTypes.func
}

export default BurgerIngredient;