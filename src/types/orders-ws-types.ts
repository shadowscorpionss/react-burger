import { TOrder } from "./order-types";

export interface IOrdersWSStorage {
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

export interface IOrdersMessage {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}
export interface IOrdersMessageAction{
    payload: IOrdersMessage;
}
