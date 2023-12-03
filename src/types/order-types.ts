import { IStorage, TStorage } from "./storage-types";

export type TOrder = {
    _id: string;
    name: string;
    ingredients: Array<string>;
    number: number;
    status: string;
    visibleStatus?: boolean;
    updatedAt: string;
    createdAt: string;
    page?: string;
}

export interface IOrder {
    order: TOrder;
}

export type TOrderStorage = {
    order: TOrder;
} & TStorage;

export interface IOrderStorage extends IOrder, IStorage { }

