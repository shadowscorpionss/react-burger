import { IResSuccess } from "../utils/api";
import { TStorage } from "./storage-types";

export enum ResetPasswordStatus{
    None,
    Failed,    
    Finish
}

export type TUser = {
    email: string;
    name: string;
}

export interface IUserResponse extends IResSuccess {
    user: TUser;
}

export interface IUser extends TUser {
    password: string;
    resetStatus: ResetPasswordStatus;
}

export type TProfileStorage = {
    user: IUser;
    hasLoginError: boolean;
    loginErrorMessage: string;
} & Omit<TStorage, 'errorMessage'>;


export interface IProfileStorage extends TProfileStorage { }

export type RegUpdateProfileFunction = (email: string, password: string, name: string) => any;
export type LoginFunction = (email: string, password: string) => any;
export type ResetPasswordFunction = (password: string, token: string) => any;
export type ForgotPasswordFunction = (password: string) => any;
