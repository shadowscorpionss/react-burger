import {ConstructorElement, CurrencyIcon, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {IngredientPropType} from "../component-prop-types/ingredients-prop-types";
import PropTypes from "prop-types";
import {useContext, useMemo, useState} from "react";
import {useToggle} from "../hooks/useToggle";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { ConstructorContext } from "../../utils/context";
import { postOrder } from "../../utils/api";

function ingredientsList(array, onCloseHandler) {
  return array.map(item => (
    <li key={item._id} className={`${burgerConstructorStyles.listItem} `}>
        <DragIcon /> <div className="mr-2" />
        <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} handleClose={()=>onCloseHandler(item)}/>
    </li>
  ));
}


function BurgerConstructor() {
  const { constructorData, setConstructorData } = useContext(ConstructorContext);
  const { isOpened: showModal, open:openModal, close:closeModal} = useToggle(false);  
  const [messages, setMessages] = useState([]);
  const [orderId, setOrderId] = useState(0);
  
  const bun = constructorData.find(el=> el.type==="bun") ;
  const ingredients = constructorData.filter(el=> el.type!=="bun");

  const ingredientsIds = useMemo(()=> constructorData.map(el=>el._id), [constructorData]);

  function removeIngredient(item){     
     setConstructorData(constructorData.filter(el=>el!==item));
  }
  
  function makeOrder (){    
    postOrder(ingredientsIds)
    .then(obj=>{
      const {success, order, name, message}=obj;
      setMessages(["Ваш заказ начали готовить", "Дождитесь готовности на орбитальной станции"]);

      if (!success)
        setMessages(["Что-то пошло не так", message]);
      
      setOrderId(order.number);

      openModal();
    })
    .catch(err=>{
      const {message}=err;
      setMessages(["Ошибка выполнения запроса", message]);
      openModal()
    });
  }

  //total
  const total = useMemo(() => {
    let s = 0;
    ingredients.forEach(el => {
      s += el.price;
    });
    if (!bun || !bun.price)
      return s;
    s += bun.price*2;
    return s;
  }, [constructorData]);

  if (!constructorData || !constructorData.length)
    return;

  return (
    <section className={burgerConstructorStyles.constructor}>
      <div className={burgerConstructorStyles.a}>
          <div className={burgerConstructorStyles.splitter}>
            <div></div>
            <div><ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
                style={{
                backgroundColor: "green"
              }}/></div>
            
          </div>
          <ul className={`${burgerConstructorStyles.list} custom-scroll`}>
            {ingredientsList(ingredients, removeIngredient)}
          </ul>
          <div className={burgerConstructorStyles.splitter}>
            <div></div>
            <div><ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}/></div>

           
            </div>
      </div>
      <div className={burgerConstructorStyles.currency}>
        <div className={burgerConstructorStyles.orderButton}>
          <span
            className={`${burgerConstructorStyles.currency} text text_type_digits-medium `}>{total}&nbsp;<CurrencyIcon/>
            &nbsp;
          </span>
          <Button type="primary" size="large" htmlType="button" onClick={makeOrder}>Оформить заказ</Button>
          {showModal && 
          (<Modal title="&nbsp;" onClose={closeModal}>
            <OrderDetails orderId={orderId} messages={messages} />
          </Modal>)}
        </div>
      </div>

    </section>

  );
}

BurgerConstructor.propTypes = {
  
}
export default BurgerConstructor;
