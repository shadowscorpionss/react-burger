//styles
import styles from "./burger-ingredients-container.module.css";
//react, redux
import { FC, RefObject, UIEvent, useState } from "react";
import { useRef } from "react";
//custom components
import BurgerIngredientsSection from "./burger-ingredients-section";
import BurgerIngredientsScrollTab from "./burger-ingredients-scroll-tab";
import { useAppSelector } from "../../types/app-redux-thunk";

//constants
const sections = ["bun", "sauce", "main"] as const;
const titles = ["Булки", "Соусы", "Начинки"] as const;
const sectionProps = sections.map((s, i) => ({
  sid: s + "s",
  filter: s,
  title: titles[i],
  tabName: s + "Tab"
}));

//types
type TSections = typeof sections[number];

type TTabs = {
  [name in TSections as `${name}Tab`]: RefObject<HTMLElement>;
}

const BurgerIngredientsContainer: FC<{}> = () => {
  //store
  const { ingredients, isLoading, isFailed, errorMessage } = useAppSelector(store => store.burgerIngredients);

  const [activeTab, setActiveTab] = useState("bunTab");

  //using for scrolling
  const bunRef = useRef<HTMLElement>({} as HTMLElement);
  const sauceRef = useRef<HTMLElement>({} as HTMLElement);
  const mainRef = useRef<HTMLElement>({} as HTMLElement);

  const tabToRef: TTabs = {
    bunTab: bunRef,
    sauceTab: sauceRef,
    mainTab: mainRef
  };

  //calc current tab and select
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const elementScrollTop = element.scrollTop;

    const bunTab = bunRef.current;
    const sauceTab = sauceRef.current;

    const summScrollHeight = [bunTab, sauceTab].reduce((acc, cur) => cur.scrollHeight + acc, 0);
    const bunTabScrollHeight = (bunTab as HTMLElement).scrollHeight;

    if (elementScrollTop > summScrollHeight) {
      setActiveTab("mainTab");
    } else if (elementScrollTop > bunTabScrollHeight && elementScrollTop < summScrollHeight) {
      setActiveTab("sauceTab");
    } else if (elementScrollTop <= bunTabScrollHeight) {
      setActiveTab("bunTab");
    }

  };

  //scroll by click
  const onTabClick = (tabName:string) => {    
    setActiveTab(tabName);
    tabToRef[tabName as keyof TTabs].current?.scrollIntoView({behavior:"smooth"});
  }

  //---scrolling block end---

  return (
    <section>

      <div className={styles.tabs}>
        {sectionProps.map((t, i) => {
          return (
            <BurgerIngredientsScrollTab tabName={t.tabName} key={i} onClick={onTabClick} activeTab={activeTab}>
              {t.title}
            </BurgerIngredientsScrollTab>
          );
        })}
      </div>
      <div className={`${styles.ingredients} custom-scroll`} onScroll={onScroll}>
        {isLoading && (<div className="lds-dual-ring" />)}
        {isFailed && (errorMessage + " попробуйте перезагрузить страницу.")}

        {!isLoading && !isFailed && ingredients && ingredients.length ? (
          sectionProps.map((s, i) => {
            return (<BurgerIngredientsSection
              key={i}
              ref={tabToRef[s.tabName as keyof TTabs]}              
              {...s}
            />);
          })) : ("")
        }
      </div>

    </section >
  );
};

export default BurgerIngredientsContainer;