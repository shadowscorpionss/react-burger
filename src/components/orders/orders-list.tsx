import styles from './orders-list.module.css'
import { FC } from 'react';
import { TOrder } from '../../types/order-types';
import { OrderCard } from './order-card';


interface IListOrder {
    userOrders: TOrder[];
    succession: boolean;
    visibleStatus: boolean;
    page: string;
}
const maxOrdersCount: number = 50;

export const ListOrders: FC<IListOrder> = ({ userOrders, succession, visibleStatus, page }) => {
    const array = succession ? [...userOrders]
        .reverse()
        .slice(0, maxOrdersCount) : userOrders;

    return (
        <div>
            <div className={`${styles.list} custom-scroll`}>
                {array
                    .map((order) => (
                        <OrderCard
                            key={order._id}
                            visibleStatus={visibleStatus}
                            page={page}
                            {...order}
                        />
                    ))
                }
            </div>
        </div>
    )
}