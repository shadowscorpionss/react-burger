import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { OrderCardDetails } from './order-card-details';
import Modal from '../modal/modal';
import { useAppDispatch, useAppSelector } from '../../types/app-redux-thunk';
import { getCurrentOrderThunk } from '../../services/actions/current-order';

export const OrderCardModal: FC = () => {
    const dispatch = useAppDispatch();
    const { number = '' } = useParams();
    const { order } = useAppSelector(store => store.currentOrder);

    useEffect(() => {
        dispatch(getCurrentOrderThunk(number))
    }, [dispatch, number]);

    return (
        <>
            {!order
                ? null
                : <Modal title={`# ${order.number}`} >
                    <OrderCardDetails order={order} />
                </Modal>
            }
        </>
    )
}