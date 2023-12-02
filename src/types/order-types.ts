import { IStorage, TStorage } from "./storage-types";

type TOrder = {
    number:number | undefined;
}

interface IOrder {
    order: TOrder;
}

export type TOrderStorage = {
    order: TOrder;
} & TStorage;


interface IOrderStorage extends IOrder,IStorage{}

export type {IOrderStorage, TOrder, IOrder};