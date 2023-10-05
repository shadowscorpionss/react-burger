import React from "react"
import Style from "./ingredient-details.module.css"
import {IngredientPropType} from "../component-prop-types/ingredients-prop-types";
import PropTypes from "prop-types";

function IngredientDetails (props) {
 const {image_large, image,name, calories, proteins,fat,carbohydrates, onClick}=props
 console.log(props.description)
  return (
    <div className={Style.ingredientCard} onClick={onClick}>
      <div className={Style.c1}>
        <img src={image_large??image} alt={name}/>
      </div>
      <div className={Style.c2}>
        <p className="text_type_main-medium text">{name}</p>
      </div>
      <div className={Style.c3}>
        <p className="text text_color_inactive text_type_main-small">Калории, ккал
        </p>
      </div>
      <div className={Style.c4}>
        <p className="text_type_digits-default text_color_inactive">{calories}</p>
      </div>
      <div className={Style.c5}>
        <p className="text_color_inactive text_type_main-small">Белки, г</p>
      </div>
      <div className={Style.c6}>
        <p className="text_type_digits-default text_color_inactive">{proteins}</p>
      </div>
      <div className={Style.c7}>
        <p className="text_color_inactive text_type_main-small">Жиры, г</p>
      </div>
      <div className={Style.c8}>
        <p className="text_type_digits-default text_color_inactive ">{fat}</p>
      </div>
      <div className={Style.c9}>
        <p className="text_color_inactive text_type_main-small">Углеводы, г</p>
      </div>
      <div className={Style.c10}>
        <p className="text_type_digits-default text_color_inactive">{carbohydrates}</p>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = IngredientPropType.isRequired;
IngredientDetails.propTypes.onClick= PropTypes.func;

export default IngredientDetails;