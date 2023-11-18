import React, { FC, RefObject, UIEvent, useState } from "react";
import { useRef } from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { useDispatch, useSelector } from "react-redux";
import BurgerIngredientSection from "./burger-ingredients-section";

import BurgerIngredientsScrollTab from "./burger-ingredients-scroll-tab";
import { setCurrentTabActionCreator } from "../../services/actions/burger-ingredients";

//constants
const sections = ["bun", "sauce", "main"];
const titles = ["Булки", "Соусы", "Начинки"];
const sectionProps = sections.map((s, i) => ({
  sid: s + "s",
  filter: s,
  title: titles[i],
  tabName: s + "Tab"
}));


type TTitleToRef = {
  [name: string]: RefObject<HTMLHeadingElement>;
};

const BurgerIngredients: FC<{}> = () => {
  const dispatch = useDispatch();
  //store
  const { ingredients, isLoading, isFailed, errorMessage } = useSelector<any, any>(store => store.burgerIngredients);




  //using for scrolling ---NOT WORKING FUCK!
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);

  const titleToRef: TTitleToRef = {
    bun: bunRef,
    sauce: sauceRef,
    main: mainRef
  };

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const elementScrollTop = element.scrollTop;

    if (!bunRef || !sauceRef)
      return;
    const bunTab = bunRef.current;
    const sauceTab = sauceRef.current;
    if (!bunTab || !sauceTab)
      return;

    const summaryScroollHeight = [bunTab, sauceTab].reduce((acc, cur) => cur ? cur.scrollHeight + acc : acc, 0);
    const bunTabScrollHeight = bunTab ? bunTab.scrollHeight : 0;

    if (elementScrollTop > summaryScroollHeight) {
      dispatch(setCurrentTabActionCreator("mainTab"));
    } else if (elementScrollTop > bunTabScrollHeight && elementScrollTop < summaryScroollHeight) {
      dispatch(setCurrentTabActionCreator("sauceTab"));
    } else if (elementScrollTop <= bunTabScrollHeight) {
      dispatch(setCurrentTabActionCreator("bunTab"));
    }
  };
  //---scrolling block end---

  return (
    <section>

      <div className={burgerIngredientsStyles.tabs}>
        {sectionProps.map((t, i) => {
          return (
            <BurgerIngredientsScrollTab type={t.tabName} key={i}>
              {t.title}
            </BurgerIngredientsScrollTab>
          );
        })}
      </div>
      <div className={`${burgerIngredientsStyles.ingredients} custom-scroll`} onScroll={onScroll}>
        {isLoading && (<div className="lds-dual-ring" />)}
        {isFailed && (errorMessage + " попробуйте перезагрузить страницу.")}

        {!isLoading && !isFailed && ingredients && ingredients.length ? (
          sectionProps.map((s, i) => {
            return (<BurgerIngredientSection
              key={i}
              elementRef={titleToRef[s.title]}
              {...s}
            />);
          })) : ("")
        }
      </div>

    </section >
  );
};

export default BurgerIngredients;