import styles from './order-card.module.css';

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { FC, useMemo } from 'react';
import { TOrder } from '../../types/order-types';
import { IIngredient } from '../../types/ingredient-types';
import { OrderImages } from './order-images';
import { useAppSelector } from '../../types/app-redux-thunk';
import { convertStatus } from '../../utils/convert-status';



const getOrderIngridients = (ids: Array<string | null>, ingredients: IIngredient[]): IIngredient[] => {

    const ingridientsList = ids.reduce((acc: IIngredient[], id) => {
        const current = ingredients.filter((el) => el?._id === id)[0];
        
        if (!current) 
            return acc;
        return [...acc, current];
    }, []);

    const bun = ingridientsList.filter(el => el.type === 'bun')[0];
    const others = ingridientsList.filter(el => el.type !== 'bun')

    return bun ? [bun, ...others] : [...others];
}


export const OrderCard: FC<TOrder> = ({ ingredients, createdAt, name, number, status, visibleStatus, page }) => {

    const location = useLocation();
    const translatedStatus = useMemo(() => convertStatus(status), [status]);
    const storedIngredients = useAppSelector(store => store.burgerIngredients.ingredients);

    const orderIngridients = useMemo(() => getOrderIngridients(ingredients, storedIngredients), [ingredients, storedIngredients]);

    const allIcons = orderIngridients.map((ingridient) => ingridient.image_mobile);
    const sortedIcons = allIcons.filter((x, i) => allIcons.indexOf(x) === i);
    const totalPrice = orderIngridients.reduce((acc: number, ingridient: IIngredient) => acc + ingridient.price, 0);
    const data = FormattedDate({ date: new Date(createdAt) })


    return (
        <Link
            to={`/${page}/${number}`}
            state={{ background: location }}
            className={styles.order}
        >
            <div className={styles.header}>
                <p className={styles.title}>#{number}</p>
                <p className={styles.data}>{data}</p>
            </div>
            {visibleStatus &&
                <p className={translatedStatus === 'Выполнен' ? styles.success : ''}>{translatedStatus}</p>
            }
            <p className={styles.name}>{name}</p>
            <div className={styles.inner}>
                <OrderImages icons={sortedIcons} />
                <div className={styles.priceWrapper}>
                    <p className={styles.totalPrice}>{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    )
}