import orderConfirmStyles from "./order-details.module.css";
import doneImage from "../../images/done.png";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useMemo } from "react";

function OrderDetails() {
  const { isLoading, isFailed, order, errorMessage } = useSelector(store => store.order);

  const messages = useMemo(() => isFailed ? ["Ошибка выполнения запроса", errorMessage] : ["Ваш заказ начали готовить", "Дождитесь готовности на орбитальной станции"], [isFailed]);


  return (
    <div className={orderConfirmStyles.orderCard}>
      <div className={orderConfirmStyles.topSpace}>&nbsp;</div>
      <div className={orderConfirmStyles.orderId}>
        <p className=" text text_type_digits-large ">{order.number}</p>
      </div>
      <div className={orderConfirmStyles.orderIdSpace}>&nbsp;</div>
      <div className={orderConfirmStyles.orderIdLabel}>
        <p className="text text_type_main-medium">{!isFailed ? ('идентификатор заказа') : ('Ошибка')}</p>

      </div>
      <div className={orderConfirmStyles.imageTopSpace}>&nbsp;</div>
      <div className={orderConfirmStyles.image}>
        {!isFailed && !isLoading && (<img src={doneImage} />)}
        {isLoading && (<div className='lds-dual-ring' />)}
      </div>
      <div className={orderConfirmStyles.imageBottomSpace}>&nbsp;</div>
      <div className={orderConfirmStyles.message1}>
        <p className="text text_type_main-default">{messages[0]}</p>
      </div>
      <div className={orderConfirmStyles.messageSpace}>&nbsp;</div>

      <div className={orderConfirmStyles.message2}>
        <p className="text text_type_main-default text_color_inactive ">{messages[1]}</p>
      </div>
      <div className={orderConfirmStyles.bottomSpace}>&nbsp;</div>

    </div>
  )

}

export default OrderDetails;
