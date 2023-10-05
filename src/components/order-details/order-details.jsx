import orderConfirmStyles from "./order-details.module.css";
import doneImage from "../../images/done.png";
import PropTypes from "prop-types";
import { useContext } from "react";
import { OrderContext } from "../../utils/context";

function OrderDetails(props) {

  const {messages} = props;
  const {orderId}= useContext(OrderContext);

  return (
    <div className={orderConfirmStyles.orderCard}>
      <div className={orderConfirmStyles.topSpace}>&nbsp;</div>
      <div className={orderConfirmStyles.orderId}>
        <p className=" text text_type_digits-large ">{orderId}</p>
      </div>
      <div className={orderConfirmStyles.orderIdSpace}>&nbsp;</div>
      <div className={orderConfirmStyles.orderIdLabel}>
        <p className="text text_type_main-medium">идентификатор заказа</p>
      </div>
      <div className={orderConfirmStyles.imageTopSpace}>&nbsp;</div>
      <div className={orderConfirmStyles.image}>
        <img src={doneImage}/></div>
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

OrderDetails.propTypes = PropTypes
  .shape({
  messages: PropTypes
    .arrayOf(PropTypes.string)
    .isRequired
})
  .isRequired;

export default OrderDetails;
