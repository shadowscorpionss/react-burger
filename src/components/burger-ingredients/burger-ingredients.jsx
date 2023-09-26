import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useRef} from "react";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerIngredient from "./burger-ingredient";

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
  function SectionOf({sid, filter, sectionClass, title, refFunction }){
    return (
      <section
        className={sectionClass}
        ref={refFunction}>
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

  return (
    <section>
      <div className={burgerIngredientsStyles.tabs}>
        <ScrollTab type="tbun">Булки</ScrollTab>        
        <ScrollTab type="tsauce">Соусы</ScrollTab>        
        <ScrollTab type="tmain">Начинки</ScrollTab>                
      </div>
      <div className={`${burgerIngredientsStyles.ingredients} custom-scroll`}>
        <SectionOf 
            id="buns" 
            filter="bun" 
            className={`${burgerIngredientsStyles.any}`}
            title="Булки"
            refFunction={el => componentsRef.selectEl = {
              ...componentsRef.selectEl,
              tbun: el
            }}/>

          <SectionOf 
            id="mains"          
            filter="sauce"
            className={`${burgerIngredientsStyles.any}`}
            title="Соусы"
            refFunction={el => componentsRef.selectEl = {
              ...componentsRef.selectEl,
              tsauce: el
            }}/>

          <SectionOf 
            id="sauces"
            filter="main"
            className={`${burgerIngredientsStyles.any}`}
            title="Начинки"
            refFunction={el => componentsRef.selectEl = {
              ...componentsRef.selectEl,
              tmain: el
            }}/>
      </div>
    
    </section>
  );
};

export default BurgerIngredients;