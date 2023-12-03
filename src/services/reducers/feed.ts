import {
    FEED_OPEN,
    FEED_ERROR,
    FEED_CLOSE,
    FEED_MESSAGE,
    TFeedActions
} from '../actions/feed';
import { IFeedStorage } from '../../types/feed-types';

const feedInitialState: IFeedStorage = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
};

export const feedReducer = (state = feedInitialState, action: TFeedActions): IFeedStorage => {
    switch (action.type) {
        case FEED_OPEN:
            return {
                ...state,
                wsConnected: true
            };

        case FEED_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case FEED_CLOSE:
            return {
                ...state,
                wsConnected: false
            };

        case FEED_MESSAGE:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            };

        default:
            return state;
    }
};
