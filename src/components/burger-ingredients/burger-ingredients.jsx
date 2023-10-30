import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { useSelector } from "react-redux";
import BurgerIngredientSection from "./burger-ingredients-section";

//constants
const sections = ["bun", "sauce", "main"];
const titles = ["Булки", "Соусы", "Начинки"];
const sectionProps = sections.map((s, i) => ({
  sid: s + "s",
  filter: s,
  title: titles[i],
  tabName: s + "Tab"
}));

function BurgerIngredients() {
  //store
  const { ingredients, isLoading, isFailed, errorMessage } = useSelector(store => store.burgerIngredients);

  //---scrolling block start---
  //saves state current tab
  const [stab, setTab] = React.useState("bunTab");

  //using for scrolling 
  const componentsRef = useRef({});

  //saves state and scrolls to element
  function scrollInto(type) {
    //save state
    setTab(type);
    if (isFailed)
      return;
    //scroll to 
    componentsRef
      .current[type] //element
      .scrollIntoView({ behavior: "smooth" });
  };

  //tab with scrolling
  const ScrollTab = (props) => {
    return (
      <Tab value={props.type} active={stab === `${props.type}`} onClick={scrollInto}>
        {props.children}
      </Tab>);
  }

  const onScroll = (e) => {
    const element = e.target;
    const est = element.scrollTop;

    const { bunTab, sauceTab } = componentsRef.current;
    const tot = [bunTab, sauceTab].reduce((acc, cur) => cur.scrollHeight + acc, 0);
    const bsh = bunTab.scrollHeight;

    if (est > tot) {
      setTab("mainTab");
    } else if (est > bsh && est < tot) {
      setTab("sauceTab");
    } else if (est <= bsh) {
      setTab("bunTab");
    }
  };
  //---scrolling block end---

  return (
    <section>

      <div className={burgerIngredientsStyles.tabs}>
        {sectionProps.map((t, i) => {
          return <ScrollTab type={t.tabName} key={i}>{t.title}</ScrollTab>
        })}
      </div>
      <div className={`${burgerIngredientsStyles.ingredients} custom-scroll`} onScroll={onScroll}>
        {isLoading && (<div className="lds-dual-ring" />)}
        {isFailed && (errorMessage + " попробуйте перезагрузить страницу.")}

        {!isLoading && !isFailed && ingredients && ingredients.length ? (
          sectionProps.map((s, i) => {
            return <BurgerIngredientSection
              className={burgerIngredientsStyles.any}
              key={i}
              ingredientsRef={componentsRef}
              {...s}
            />
          })) : ("")
        }
      </div>

    </section>
  );
};

export default BurgerIngredients;