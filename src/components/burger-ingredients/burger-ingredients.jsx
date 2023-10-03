import React, {useMemo} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useRef} from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import BurgerIngredient from "./burger-ingredient";
import PropTypes from "prop-types";
import { IngredientPropType } from "../component-prop-types/ingredients-prop-types";


function BurgerIngredients({ingdata}) {
  //saves state current tab
  const [stab, setTab] = React.useState("tbun");
  
   //using for scrolling 
  const componentsRef = useRef({}); 

  //saves state and scrolls to element
  function scrollInto(type) {
    //save state
    setTab(type);

    //scroll to 
    componentsRef
      .selectEl[type] //element
      .scrollIntoView({behavior: "smooth"});
  };

  //generates section of items 
  function SectionOf({sid, filter, sectionClass, title, tabName }){
    return (
      <section
        className={sectionClass}
        ref={el => componentsRef.selectEl = {
          ...componentsRef.selectEl,
          [tabName]: el}}>
        <h2 className="text text_type_main-medium mb-6" id={sid}>{title}</h2>
        <ul className={`${burgerIngredientsStyles.listItem} pl-4 pr-4`}>
          {
            ingdata
              .filter(el => el.type === filter)
              .map(item => <BurgerIngredient key={item._id} ingredient={item}/>)
          }
        </ul>
      </section>
    )
  }

  //tab with scrolling
  function ScrollTab(props){
    return (
      <Tab value={props.type} active={stab === `${props.type}`} onClick={scrollInto}>
            {props.children}
      </Tab>);
  }
  
  const sections =["bun","sauce","main"];
  const titles=["Булки","Соусы","Начинки"];

  const sectionProps = useMemo( ()=> sections.map((s,i)=> ({
    sid:s+"s",
    filter: s,
    title: titles[i],
    tabName: s+"Tab",
    sectionClass: ""
  }) ), [sections, titles]);

  return (
    <section>
      <div className={burgerIngredientsStyles.tabs}>
        { sectionProps.map((t,i) =>{
          return <ScrollTab type={t.tabName} key={i}>{t.title}</ScrollTab>  
        })}              
      </div>
      <div className={`${burgerIngredientsStyles.ingredients} custom-scroll`}>
        { sectionProps.map((s,i)=> {
          return <SectionOf 
            className={burgerIngredientsStyles.any}            
            key={i}
            {...s}                        
            />
        })}        
      </div>
    
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingdata: PropTypes.arrayOf(IngredientPropType).isRequired
}

export default BurgerIngredients;