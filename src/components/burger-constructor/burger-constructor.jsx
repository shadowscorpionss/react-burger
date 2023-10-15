import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { useEffect, useMemo } from "react";
import { useToggle } from "../../hooks/useToggle";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { generateConstructorDataAction, removeConstructorIngredientAction } from "../../services/actions/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { makeOrder } from "../../services/actions/order";
import BurgerConstructorElement from "./burger-constructor-element";
import emptybun from '../../images/emptybun.png';

function BurgerConstructor() {
  //states and context
  const { constructorData } = useSelector(store => store.burgerConstructor);
  const data = useSelector(store => store.burgerIngredients.ingredients);
  const { isLoading, isFailed, order, errorMessage } = useSelector(store => store.order);
  const dispatch = useDispatch();

  const { isOpened: showModal, open: openModal, close: closeModal } = useToggle(false);
  const messages = useMemo(() => isFailed ? ["Ошибка выполнения запроса", errorMessage] : ["Ваш заказ начали готовить", "Дождитесь готовности на орбитальной станции"], [isFailed]);

  //structured data
  const bun = useMemo(() => constructorData.find(el => el.type === "bun") ?? { price: 0, name: '', image: emptybun, type:"bun" }, [constructorData]);
  const ingredients = useMemo(() => constructorData.filter(el => el.type !== "bun"), [constructorData]);
  const ingredientsIds = useMemo(() => [bun._id, ...ingredients.map(el => el._id), bun._id], [constructorData]);

  //calc fields
  //-------
  //total
  const total = useMemo(() =>
    ingredients.reduce((acc, el) => acc + el.price, 0) + (bun && bun.price ? bun.price * 2 : 0)
    , [ingredients, bun]);

  //methods
  const callMakeOrder = () => {
    dispatch(makeOrder(ingredientsIds));
    openModal();
  };

  //load ingredients data on mount
  useEffect(() => { dispatch(generateConstructorDataAction(data)) }, [data]);

  //render
  return (
    <section className={burgerConstructorStyles.constructor}>
      <div>
        <div className={burgerConstructorStyles.splitter}>
          <BurgerConstructorElement ingredient={bun} isOnTheTop={true} /> 
        </div>
        <ul className={`${burgerConstructorStyles.list} custom-scroll`}>
          {ingredients && ingredients.length ?
            (
              ingredients.map(item => (
                <li key={item.uniqueId} className={`${burgerConstructorStyles.listItem} `}>
                  <BurgerConstructorElement ingredient={item}/>
                </li>
              ))
            )
            : ''}
        </ul>
        <div className={burgerConstructorStyles.splitter}>
          <BurgerConstructorElement ingredient={bun} isOnTheTop={false} />         
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
