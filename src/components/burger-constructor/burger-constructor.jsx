import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";

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
  let total = 0;
  notBunArr.forEach(el => {
    total += el.price;
  });
  total += randomBun.price;

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

          <Button type="primary" size="large">Оформить заказ</Button>
        </div>
      </div>

    </section>

  );
}

export default BurgerConstructor;
