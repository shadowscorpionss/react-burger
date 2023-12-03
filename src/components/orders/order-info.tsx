import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './order-info.module.css';
import { useAppDispatch, useAppSelector } from '../../types/app-redux-thunk';
import { getCurrentOrderThunk } from '../../services/actions/current-order';
import { OrderCardDetails } from './order-card-details';


export const OrderInfo: FC = () => {
    const dispatch = useAppDispatch();
    const { number = '' } = useParams();
    const order  = useAppSelector((store) => store.currentOrder.order);
    const { isLoading } = useAppSelector(store => store.burgerIngredients);

    useEffect(() => {
        dispatch(getCurrentOrderThunk(number));
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