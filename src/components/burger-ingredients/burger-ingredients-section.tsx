import burgerIngredientsSectionStyles from './burger-ingredients-section.module.css';
import BurgerIngredient from './burger-ingredient';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useAppSelector } from '../../types/app-redux-thunk';

interface IBurgerIngredientsSection {
  filter: string;
  title: string;
}

//generates section of items 
const BurgerIngredientsSection = forwardRef<HTMLElement, IBurgerIngredientsSection>(
  ({ filter, title }, ref) => {
    const { ingredients } = useAppSelector(store => store.burgerIngredients);
    const sectionRef = useRef<HTMLElement>({} as HTMLElement);

    useImperativeHandle(ref, () => sectionRef.current, [])
    return (
      <section ref={sectionRef}>
        <h2 className='text text_type_main-medium mb-6'>{title}</h2>
        <ul className={`${burgerIngredientsSectionStyles.listItem} pl-4 pr-4`}>
          {
            ingredients
              .filter(el => el.type === filter)
              .map(item => <BurgerIngredient key={item._id} ingredient={item} />)
          }
        </ul>
      </section>
    )
  });

export default BurgerIngredientsSection;