import styles from './orders.module.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../types/app-redux-thunk';
import { ListOrders } from '../../components/orders/orders-list';
import { userOrdersStartAction, userOrdersStopAction } from '../../services/actions/profile/orders';

export const ProfileOrdersPage = () => {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector(store => store.userOrders);

    useEffect(() => {
        dispatch(userOrdersStartAction());
        return function cleanup() {
            dispatch(userOrdersStopAction());
        }
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            {orders
                ? <ListOrders userOrders={orders}
                    succession={true}
                    visibleStatus={true}
                    page={'profile/orders'} />
                : <h1 className={styles.title}>Здесь будут ваши заказы</h1>
            }
        </div>
    )
}