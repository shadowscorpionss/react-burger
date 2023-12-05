import styles from './feed.module.css';

import { FC, useEffect, useMemo } from 'react'
import { feedStopAction, feedStartAction } from '../services/actions/feed';
import { ListOrders } from '../components/orders/orders-list';
import { useAppDispatch, useAppSelector } from '../types/app-redux-thunk';

const displayCount: number = 10;

export const FeedPage: FC = () => {
    const { wsConnected, orders, total, totalToday } = useAppSelector(store => store.feed);

    const doneOrders = useMemo(() =>
        orders
            .filter((order) => order.status === 'done')
            .map((order) => order.number)
            .slice(0, displayCount).sort((a, b) => a + b)
        , [orders]);

    const pendingOrders = useMemo(() =>
        orders
            .filter((order) => order.status === 'pending')
            .map((order) => order.number)
            .slice(0, displayCount).sort((a, b) => a + b)
        , [orders]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(feedStartAction());
    }, [dispatch]);

    useEffect(() => function cleanup() {
        dispatch(feedStopAction());
    }, []);

    return (
        <div>
            {!wsConnected ? (
                <h1 className={styles.loader}>Пожайлуста, подождите ...</h1>
            ) : (
                <div className={styles.wrapper} >
                    <div className={styles.orders}>
                        <h1 className={styles.title}>Лента заказов</h1>
                        <ListOrders
                            userOrders={orders}
                            succession={false}
                            visibleStatus={false}
                            page={'feed'}
                        />
                    </div>
                    <div className={`${styles.main} custom-scroll`}>
                        <div className={styles.container}>
                            <div className={styles.ready}>
                                <h1>Готовы:</h1>
                                <div className={styles.statuses}>
                                    {doneOrders.map((num, index) => (
                                        <p key={index}>{num}</p>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.getting}>
                                <h1>В работе:</h1>
                                <div className={styles.statuses}>
                                    {pendingOrders.map((num, index) => (
                                        <p key={index}>{num}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <h1 className={styles.totalAll}>Выполнено за все время:</h1>
                        <p className={styles.count}>{total}</p>
                        <h1 className={styles.totalToday}>Выполнено за сегодня:</h1>
                        <p className={styles.count}>{totalToday}</p>
                    </div>
                </div>
            )}
        </div>
    )
}