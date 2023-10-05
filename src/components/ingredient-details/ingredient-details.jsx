import React from "react"
import IngredientDetailsStyles from "./ingredient-details.module.css"
import {IngredientPropType} from "../component-prop-types/ingredients-prop-types";
import PropTypes from "prop-types";

function IngredientDetails ({ingredient, onClick}) {
 const {image_large, image,name, calories, proteins,fat,carbohydrates}=ingredient;
  return (
    <div className={IngredientDetailsStyles.ingredientCard} onClick={onClick}>
      <div className={IngredientDetailsStyles.c1}>
        <img src={image_large??image} alt={name}/>
      </div>
      <div className={IngredientDetailsStyles.c2}>
        <p className="text_type_main-medium text">{name}</p>
      </div>
      <div className={IngredientDetailsStyles.c3}>
        <p className="text text_color_inactive text_type_main-small">Калории, ккал
        </p>
      </div>
      <div className={IngredientDetailsStyles.c4}>
        <p className="text_type_digits-default text_color_inactive">{calories}</p>
      </div>
      <div className={IngredientDetailsStyles.c5}>
        <p className="text_color_inactive text_type_main-small">Белки, г</p>
      </div>
      <div className={IngredientDetailsStyles.c6}>
        <p className="text_type_digits-default text_color_inactive">{proteins}</p>
      </div>
      <div className={IngredientDetailsStyles.c7}>
        <p className="text_color_inactive text_type_main-small">Жиры, г</p>
      </div>
      <div className={IngredientDetailsStyles.c8}>
        <p className="text_type_digits-default text_color_inactive ">{fat}</p>
      </div>
      <div className={IngredientDetailsStyles.c9}>
        <p className="text_color_inactive text_type_main-small">Углеводы, г</p>
      </div>
      <div className={IngredientDetailsStyles.c10}>
        <p className="text_type_digits-default text_color_inactive">{carbohydrates}</p>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = { 
  ingredient: IngredientPropType.isRequired,
  onClick: PropTypes.func
}

export default IngredientDetails;