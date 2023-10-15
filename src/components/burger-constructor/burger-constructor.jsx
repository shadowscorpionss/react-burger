import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { addConstructorIngredientAction, sortConstructorDataAction } from "../../services/actions/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { makeOrder } from "../../services/actions/order";
import BurgerConstructorElement from "./burger-constructor-element";
import { useDrop } from "react-dnd";

function BurgerConstructor() {
  //states and context
  const { ingredients, bun } = useSelector(store => store.burgerConstructor);
  const lref = useRef();
  const [isDragging, setIsDragging] = useState(false);

  const { isLoading, isFailed, order, errorMessage } = useSelector(store => store.order);
  const dispatch = useDispatch();

  const { isOpened: showModal, open: openModal, close: closeModal } = useToggle(false);
  const messages = useMemo(() => isFailed ? ["Ошибка выполнения запроса", errorMessage] : ["Ваш заказ начали готовить", "Дождитесь готовности на орбитальной станции"], [isFailed]);

  //structured data
  const ingredientsIds = useMemo(() => [bun._id, ...ingredients.map(el => el ? el._id : null), bun._id], [ingredients, bun]);

  //total
  const total = useMemo(() =>
    ingredients.reduce((acc, el) => el ? acc + el.price : acc, 0) + (bun && bun.price ? bun.price * 2 : 0)
    , [ingredients, bun]);

  //methods
  const callMakeOrder = () => {
    dispatch(makeOrder(ingredientsIds));
    openModal();
  };

  const moveIngredient = (dragIndex, hoverIndex) => {
    // Получаем перетаскиваемый ингредиент
    const dragCard = ingredients[dragIndex];
    const newCards = [...ingredients];
    // Удаляем перетаскиваемый элемент из массива
    newCards.splice(dragIndex, 1);
    // Вставляем элемент на место того элемента, над которым мы навели мышку с "перетаскиванием"
    // создается новый массив, в котором изменен порядок элементов
    newCards.splice(hoverIndex, 0, dragCard);
    dispatch(sortConstructorDataAction(newCards));
  };


  //drop ingredients
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      const dropItem = item.ingredient;
      dispatch(addConstructorIngredientAction(dropItem));
    },

  });

  //render
  const renderConstructorElement = useCallback((item, index) => {
    return (
      (
        <li ref={lref} key={item.uniqueId} className={`${burgerConstructorStyles.listItem} `}>
          <BurgerConstructorElement ingredient={item} index={index} moveIngredient={moveIngredient} setIsDragging={setIsDragging} />
        </li>
      )
    )
  }, [ingredients]);

  //scroll into the end after adding (not when dragging)
  useEffect(() => {
    if (lref.current && !isDragging)
      lref.current.scrollIntoView({
        behavior: "smooth",
      });
  }, [ingredients]);

  return (
    <section className={burgerConstructorStyles.constructor} ref={dropTarget}>
      <div>
        <div >
          <div><ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name ? `${bun.name} (верх)` : "Выберете булку"}
            price={bun.price}
            thumbnail={bun.image}
          /></div>
        </div>
        <ul className={`${burgerConstructorStyles.list} custom-scroll`}>
          {ingredients && ingredients.length ?
            (
              ingredients.map((item, index) => renderConstructorElement(item, index))
            ) : ""}
        </ul>
        <div>
          <div><ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name ? `${bun.name} (низ)` : "Выберете булку"}
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
          <Button disabled={!bun || !bun.price} type="primary" size="large" htmlType="button" onClick={callMakeOrder}>Оформить заказ</Button>
          {!isLoading && !isFailed && !!order && showModal &&
            (<Modal title="&nbsp;" onClose={closeModal}>

              <OrderDetails messages={messages} />

            </Modal>)}
        </div>
      </div>

    </section>

  );
}


export default BurgerConstructor;
