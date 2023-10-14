import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { IngredientPropType } from "../component-prop-types/ingredients-prop-types";
import PropTypes from "prop-types";
import { useContext, useEffect, useMemo, useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { OrderContext } from "../../utils/context";
import { postOrder } from "../../utils/api";
import { clearConstructorDataAction, removeConstructorIngredientAction } from "../../services/actions/burger-constructor";
import { useDispatch, useSelector } from "react-redux";

function ingredientsList(array, onCloseHandler) {
  return array.map(item => (
    <li key={item.uniqueId} className={`${burgerConstructorStyles.listItem} `}>
      <DragIcon /> <div className="mr-2" />
      <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} handleClose={() => onCloseHandler(item)} />
    </li>
  ));
}


function BurgerConstructor() {
  //states and context
  const { constructorData } = useSelector(store => store.burgerConstructor);
  const dispatch = useDispatch();

  const { isOpened: showModal, open: openModal, close: closeModal } = useToggle(false);
  const [messages, setMessages] = useState([]);
  const { setOrderId } = useContext(OrderContext);

  //structured data
  const bun = useMemo(() => constructorData.find(el => el.type === "bun") ?? { price: 0, name: '', image: null }, [constructorData]);
  const ingredients = useMemo(() => constructorData.filter(el => el.type !== "bun"), [constructorData]);
  const ingredientsIds = useMemo(() => [bun._id, ...ingredients.map(el => el._id), bun._id], [constructorData]);

  //calc fields
  //-------
  //total
  const total = useMemo(() =>
    ingredients.reduce((acc, el) => acc + el.price, 0) + (bun && bun.price ? bun.price * 2 : 0)
    , [ingredients, bun]);

  //methods
  const removeIngredient = (item) => {
    dispatch(removeConstructorIngredientAction(item.uniqueId));
  }

  const clearOrder = () => {
    dispatch(clearConstructorDataAction());
  }

  const makeOrder = ()=> {
    postOrder(ingredientsIds)
      .then(obj => {
        const { success, order, name, message } = obj;
        console.log(success, order.number, name);
        setMessages(["Ваш заказ начали готовить", "Дождитесь готовности на орбитальной станции"]);

        if (!success)
          setMessages(["Что-то пошло не так", message]);

        setOrderId(order.number);
        clearOrder();
      })
      .catch(err => {
        const { message } = err;
        setMessages(["Ошибка выполнения запроса", message]);

      })
      .finally(() => {
        openModal();
      })
  }

  //render
  return (
    <section className={burgerConstructorStyles.constructor}>
      <div>
        <div className={burgerConstructorStyles.splitter}>
          <div></div>
          <div><ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          /></div>

        </div>
        <ul className={`${burgerConstructorStyles.list} custom-scroll`}>
          {ingredients && ingredients.length ? ingredientsList(ingredients, removeIngredient) : ''}
        </ul>
        <div className={burgerConstructorStyles.splitter}>
          <div></div>
          <div><ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image} /></div>


        </div>
      </div>
      <div className={burgerConstructorStyles.currency}>
        <div className={burgerConstructorStyles.orderButton}>
          <span
            className={`${burgerConstructorStyles.currency} text text_type_digits-medium `}>{total}&nbsp;<CurrencyIcon />
            &nbsp;
          </span>
          <Button disabled={!bun || !bun.price} type="primary" size="large" htmlType="button" onClick={makeOrder}>Оформить заказ</Button>
          {showModal &&
            (<Modal title="&nbsp;" onClose={closeModal}>

              <OrderDetails messages={messages} />

            </Modal>)}
        </div>
      </div>

    </section>

  );
}


export default BurgerConstructor;
