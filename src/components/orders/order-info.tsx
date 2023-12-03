import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentOrder } from '../../../services/actions/current-order';
import { OrderCardDetails } from '../order-card-details/order-card-datails';
import styles from './order-card-page.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';


export const OrderInfo: FC = () => {
    const dispatch = useAppDispatch();
    const { number = '' } = useParams();
    const { order } = useAppSelector((store) => store.currentOrder);
    const { isLoading } = useAppSelector(store => store.burgerIngredients);

    useEffect(() => {
        dispatch(getCurrentOrder(number))
    }, [dispatch, number]);

    return (
        <>
            {!order || isLoading
                ? <h1 style={{ textAlign: 'center' }}>Идет загрузка ...</h1>
                : <div className={styles.wrapper}>
                    <p className={styles.title}>{`# ${order.number}`}</p>
                    <OrderCardDetails order={order} />
                </div>
            }
        </>
    )
}