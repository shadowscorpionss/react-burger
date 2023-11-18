import { useSelector } from "react-redux";
import burgerIngredientsSectionStyles from "./burger-ingredients-section.module.css";
import BurgerIngredient from "./burger-ingredient";
import React,{ FC, RefObject, useEffect, useRef } from "react";
import {  IIngredientsStorage } from "../../types/ingredient-interface";


interface IBurgerIngredientsSection {
  filter: string;
  title: string;
  tabName: string;
  elementRef:RefObject<HTMLHeadingElement>
}

//generates section of items 
const BurgerIngredientsSection: FC<IBurgerIngredientsSection> = ({ filter, title, tabName, elementRef }) => {
  const { ingredients, currentTab } = useSelector<any, IIngredientsStorage>(store => store.burgerIngredients);  
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (currentTab !== tabName)
      return;
    const el = sectionRef.current;
    if (el==null)
      return;

    el.scrollIntoView({behavior:"smooth"});
  }, [currentTab]);



  return (
    <section ref={sectionRef}>
      <h2 ref={elementRef} className="text text_type_main-medium mb-6">{title}</h2>
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

export default BurgerIngredientsSection;