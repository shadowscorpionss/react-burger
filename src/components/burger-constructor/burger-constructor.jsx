import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {IngredientPropType} from "../component-prop-types/ingredients-prop-types";
import PropTypes from "prop-types";
import { useMemo } from "react";

function ingredientsList(array) {
  return array.map(item => (
    <li key={item._id} className={`${burgerConstructorStyles.listItem} `}>
      <ConstructorElement text={item.name} price={item.price} thumbnail={item.image}/>
    </li>
  ));
}

function BurgerConstructor({ingdata}) {
  //random 7 elements (not bun)
  const notBunArr = [...ingdata.filter(el => el.type !== "bun")].sort(() => 0.5 - Math.random()).slice(0, 7);
  //buns
  const bunsArr = ingdata.filter(el => el.type === "bun");

  //random bun
  const randomBun = bunsArr[Math.floor(bunsArr.length * Math.random())];

  //total
  const total = useMemo (()=>{
    let s=0;
    notBunArr.forEach(el => {
      s += el.price;
    });
    s+=randomBun.price;
    return s;
  });

  return (
    <section className={burgerConstructorStyles.constructor}>
      <div>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${randomBun.name} (верх)`}
          price={randomBun.price}
          thumbnail={randomBun.image}
          style={{
          backgroundColor: "green"
        }}/>

        <ul className={`${burgerConstructorStyles.list} custom-scroll`}>
          {ingredientsList(notBunArr)}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${randomBun.name} (низ)`}
          price={randomBun.price}
          thumbnail={randomBun.image}/>
      </div>
      <div className={burgerConstructorStyles.currency}>
        <div className={burgerConstructorStyles.orderButton}>
          <span
            className={`${burgerConstructorStyles.currency} text text_type_digits-medium `}>{total}&nbsp;<CurrencyIcon/>
            &nbsp;
          </span>

          <Button type="primary" size="large" htmlType="button">Оформить заказ</Button>
        </div>
      </div>

    </section>

  );
}

BurgerConstructor.propTypes = {
  ingdata: PropTypes.arrayOf(IngredientPropType).isRequired
} 
export default BurgerConstructor;
