import { IStorage } from "./common-types";

type TOrder = {
    number:number | undefined;
}

interface IOrder {
    order: TOrder;
}

interface IOrderStorage extends IOrder,IStorage{}

export type {IOrderStorage, TOrder, IOrder};