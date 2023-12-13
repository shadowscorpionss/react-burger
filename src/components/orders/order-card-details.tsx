import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

import styles from './order-card-details.module.css'

import { useAppSelector } from '../../types/app-redux-thunk';
import { convertStatus } from '../../utils/convert-status';
import { OrderCardIngridient } from './order-card-ingredient';
import { TOrder } from '../../types/order-types';

interface IOrderCardDetails {
    order: TOrder;
}

interface IItem {
    name: string,
    count: number,
    price: number,
    image_mobile: string,
}

interface IObject {
    [_id: string]: IItem
}


export const OrderCardDetails: FC<IOrderCardDetails> = ({ order }) => {

    const { name, status, ingredients, createdAt } = order;
    const data = FormattedDate({ date: new Date(createdAt) })
    const translatedStatus = convertStatus(status);
    const storedIngredients = useAppSelector(store => store.burgerIngredients.ingredients);

    let totalPrice: number = 0;
    const totalPriceDetails = ingredients.reduce((acc: IObject, number) => {
        const { _id, name, price, image_mobile } = storedIngredients.filter((el) => el?._id === number)[0];
        totalPrice += price;

        if (!acc.hasOwnProperty(_id)) {
            acc[_id] = { name, count: 1, price, image_mobile }
        } else {
            acc[_id] = { ...acc[_id], count: acc[_id].count + 1, price: acc[_id].count * acc[_id].price }
        }
        return acc;
    }, {})

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.name}>{name}</h1>
                <p className={translatedStatus === 'Выполнен' ? styles.success : ''}>{translatedStatus}</p>
            </div>
            <div className={styles.container}>
                <div><h2 className={styles.content}>Состав:</h2></div>
                <div>
                    <ul className={`${styles.list} custom-scroll`}>
                        {Object.entries(totalPriceDetails)
                            .map((item, index) => (
                                <OrderCardIngridient
                                    key={index}
                                    {...item[1]}
                                />
                            ))}
                    </ul>
                </div>
            </div>
            <div className={styles.orderDetails}>
                <p className={styles.data}>{data}</p>
                <div className={styles.inner}>
                    <p>{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}