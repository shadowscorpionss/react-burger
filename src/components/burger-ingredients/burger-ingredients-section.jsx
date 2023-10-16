import { useSelector } from "react-redux";
import burgerIngredientsSectionStyles from "./burger-ingredients-section.module.css";
import BurgerIngredient from "./burger-ingredient";
import PropTypes from "prop-types";
import React from "react";
//generates section of items 
const BurgerIngredientSection = ({ filter, title, tabName, ingredientsRef }) => {
  const {ingredients}=useSelector(store=>store.burgerIngredients);
  return (
    <section
      ref={el => ingredientsRef.current = {
        ...ingredientsRef.current,
        [tabName]: el
      }}>
      <h2 className="text text_type_main-medium mb-6">{title}</h2>
      <ul className={`${burgerIngredientsSectionStyles.listItem} pl-4 pr-4`}>
        {
          ingredients
            .filter(el => el.type === filter)
            .map(item => <BurgerIngredient key={item._id} ingredient={item} />)
        }
      </ul>
    </section>
  )
};

BurgerIngredientSection.propTypes= {
  filter: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tabName: PropTypes.string.isRequired,  
  ingredientsRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func, 
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.any })
  ]).isRequired
}

export default BurgerIngredientSection;