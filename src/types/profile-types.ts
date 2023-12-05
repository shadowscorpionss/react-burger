import { IResSuccess } from "../utils/api";
import { AppThunk } from "./app-redux-thunk";
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

export type RegUpdateProfileThunk = (email: string, password: string, name: string) => AppThunk;
export type LoginThunk = (email: string, password: string) => AppThunk;
export type ResetPasswordThunk = (password: string, token: string) => AppThunk;
export type ForgotPasswordThunk = (password: string) => AppThunk;
