import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { useMemo } from "react";
import { useToggle } from "../../hooks/useToggle";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { removeConstructorIngredientAction } from "../../services/actions/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { makeOrder } from "../../services/actions/order";

function BurgerConstructor() {
  //states and context
  const { constructorData } = useSelector(store => store.burgerConstructor);
  const { isLoading, isFailed, order, errorMessage } = useSelector(store=>store.order);
  const dispatch = useDispatch();

  const { isOpened: showModal, open: openModal, close: closeModal } = useToggle(false);
  const messages = useMemo(()=> isFailed? ["Ошибка выполнения запроса", errorMessage]:["Ваш заказ начали готовить", "Дождитесь готовности на орбитальной станции"] ,[isFailed]);

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
  const removeIngredient = (uniqueId) => {
    dispatch(removeConstructorIngredientAction(uniqueId));
  };

  const callMakeOrder = () => {
    dispatch(makeOrder(ingredientsIds));
    openModal();
  };

  //render
  return (
    <section className={burgerConstructorStyles.constructor}>
      <div>
        <div className={burgerConstructorStyles.splitter}>
          <div></div>
          <div><ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name? `${bun.name} (верх)`:'Выберете булку'}
            price={bun.price}
            thumbnail={bun.image} 
                      /></div>

        </div>
        <ul className={`${burgerConstructorStyles.list} custom-scroll`}>
          {ingredients && ingredients.length ?
            (
              ingredients.map(item =>
               (<li key={item.uniqueId} className={`${burgerConstructorStyles.listItem} `}>
                <DragIcon /> <div className="mr-2" />
                <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} handleClose={() => removeIngredient(item.uniqueId)} />
              </li>)              
              )
            )

            : ''}
        </ul>
        <div className={burgerConstructorStyles.splitter}>
          <div></div>
          <div><ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name? `${bun.name} (низ)`:'Выберете булку'}
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
