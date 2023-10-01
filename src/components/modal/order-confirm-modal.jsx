import Style from "./order-confirm-modal.module.css";
import doneImage from "../../images/done.png";
import PropTypes from "prop-types";

function OrderConfirm(props) {

  const {orderId, messages} = props;

  return (
    <div className={Style.orderCard}>
      <div className={Style.topSpace}>&nbsp;</div>
      <div className={Style.orderId}>
        <p className=" text text_type_digits-large ">{orderId}</p>
      </div>
      <div className={Style.orderIdSpace}>&nbsp;</div>
      <div className={Style.orderIdLabel}>
        <p className="text text_type_main-medium">идентификатор заказа</p>
      </div>
      <div className={Style.imageTopSpace}>&nbsp;</div>
      <div className={Style.image}>
        <img src={doneImage}/></div>
      <div className={Style.imageBottomSpace}>&nbsp;</div>
      <div className={Style.message1}>
        <p className="text text_type_main-default">{messages[0]}</p>
      </div>
      <div className={Style.messageSpace}>&nbsp;</div>

      <div className={Style.message2}>
        <p className="text text_type_main-default text_color_inactive ">{messages[1]}</p>
      </div>
      <div className={Style.bottomSpace}>&nbsp;</div>
      
    </div>
  )

}

OrderConfirm.propTypes = PropTypes
  .shape({
  orderId: PropTypes.string.isRequired,
  messages: PropTypes
    .arrayOf(PropTypes.string)
    .isRequired
})
  .isRequired;

export default OrderConfirm;
