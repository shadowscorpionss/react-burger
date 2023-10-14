import { useSelector } from "react-redux";
import burgerIngredientsSectionStyles from "./burger-ingredients-section.module.css";
import BurgerIngredient from "./burger-ingredient";

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

export default BurgerIngredientSection;