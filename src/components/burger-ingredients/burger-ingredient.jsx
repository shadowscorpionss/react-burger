import burgerIngredientStyles from "./burger-ingredient.module.css";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientPropType} from "../component-prop-types/ingredients-prop-types";
import IngredientCard from "../modal/ingredient-card";
import { useState } from "react";
import Modal from "../modal/modal";
import { useToggle } from "../hooks/useToggle";

function BurgerIngredient({ingredient}) {
  const {name, image, price} = ingredient
  const {isOpened:showModal, open:openModal, close:closeModal} = useToggle(false);
  const [elCount,setElCount]=useState(0);

  function incrementCountAndShow(){
     setElCount(elCount+1);
     openModal();
  }

  return (

    <li className={`${burgerIngredientStyles.ingredient} mb-8 `}>
      <div onClick={incrementCountAndShow}>
        {!!elCount &&
        <Counter count={elCount} size="default"/>
        }        
        <img src={image} alt={name} className="ml-4 mr-4 mb-1"/>
        <div className={`${burgerIngredientStyles.currency} mb-1`}>
          <p className="text text_type_digits-default ">{price}&nbsp;</p>
          <CurrencyIcon/>
        </div>
        <p className="text text_type_main-small">{name}</p>
      </div>
      {showModal && <Modal title="Детали ингредиента" onClose={closeModal}>
        <IngredientCard {...ingredient}/>
      </Modal>}
    </li>

  )
}

BurgerIngredient.propTypes = {
  ingredient: IngredientPropType.isRequired
}

export default BurgerIngredient;