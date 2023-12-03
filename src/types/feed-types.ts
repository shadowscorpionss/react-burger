import { TOrder } from "./order-types";

export interface IFeedStorage {
    wsConnected: boolean;
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}

export interface IEventAction {
    payload: Event;
}

export interface IStringAction{
    payload: string;
}

export interface IFeed {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}

export interface IFeedAction{
    payload: IFeed;
}