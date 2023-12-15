//styles
import orderConfirmStyles from './order-details.module.css';
import doneImage from '../../images/done.png';
//react, redux
import { FC, useMemo } from 'react';
//types
import { useAppSelector } from '../../types/app-redux-thunk';

const OrderDetails: FC<{}> = () => {
  const { isLoading, isFailed, order, errorMessage } = useAppSelector(store => store.order);

  const messages = useMemo(() => isFailed ?
    ['Ошибка выполнения запроса', errorMessage] :
    ['Ваш заказ начали готовить', 'Дождитесь готовности на орбитальной станции']
    , [isFailed]);

  const labels = useMemo(() =>
    isLoading ?
      'Подождите, идет отправка заказа...' :
      !isFailed ?
        'идентификатор заказа' : 'Ошибка', [isLoading, isFailed]);

  return (
    <div className={orderConfirmStyles.orderCard}>
      <div className={orderConfirmStyles.topSpace}>&nbsp;</div>
      <div className={orderConfirmStyles.orderId}>
        {!isLoading && (<p className=" text text_type_digits-large ">{order.number}</p>)}
      </div>
      <div className={orderConfirmStyles.orderIdSpace}>&nbsp;</div>
      <div className={orderConfirmStyles.orderIdLabel}>
        <p className="text text_type_main-medium">{labels}</p>
      </div>
      <div className={orderConfirmStyles.imageTopSpace}>&nbsp;</div>
      <div className={orderConfirmStyles.image}>
        {isLoading ?
          (<div className="lds-dual-ring" />) :
          !isFailed && (<img src={doneImage} />)
        }
      </div>
      <div className={orderConfirmStyles.imageBottomSpace}>&nbsp;</div>
      <div className={orderConfirmStyles.message1}>
        {!isLoading && (<p className="text text_type_main-default">{messages[0]}</p>)}
      </div>
      <div className={orderConfirmStyles.messageSpace}>&nbsp;</div>

      <div className={orderConfirmStyles.message2}>
        {!isLoading && (<p className="text text_type_main-default text_color_inactive ">{messages[1]}</p>)}
      </div>
      <div className={orderConfirmStyles.bottomSpace}>&nbsp;</div>

    </div>
  )

}

export default OrderDetails;
