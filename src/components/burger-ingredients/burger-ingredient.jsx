import burgerIngredientStyles from "./burger-ingredient.module.css";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientPropType} from "../component-prop-types/ingredients-prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useEffect, useState } from "react";
import Modal from "../modal/modal";
import { useToggle } from "../hooks/useToggle";
import PropTypes from "prop-types";


function BurgerIngredient({ingredient, count, addItem}) {
  const item = ingredient;
  const {isOpened:showModal, open:openModal, close:closeModal} = useToggle(false);

  function incrementCountAndShow(){  
     openModal();
  }

  function handleIngredintDetailsClick(){
    if (typeof(addItem)==="function")
      addItem(item);
  }

  return (

    <li className={`${burgerIngredientStyles.ingredient} mb-8 `}>
      <div onClick={incrementCountAndShow}>
        {!!count && <Counter count={count} size="default"/>}        
        <img src={item.image} alt={item.name} className="ml-4 mr-4 mb-1"/>
        <div className={`${burgerIngredientStyles.currency} mb-1`}>
          <p className="text text_type_digits-default ">{item.price}&nbsp;</p>
          <CurrencyIcon/>
        </div>
        <p className="text text_type_main-small">{item.name}</p>
      </div>
      {showModal && 
      (<Modal title="Детали ингредиента" onClose={closeModal}>
        <IngredientDetails {...ingredient} onClick={handleIngredintDetailsClick}/>
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