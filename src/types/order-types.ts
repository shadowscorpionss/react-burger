import { IStorage } from "./common-types";

interface IOrder {
    number:number;
}

interface IOrderStorage extends IStorage{
    order:IOrder;
}

export type {IOrderStorage};