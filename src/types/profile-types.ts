import { IResSuccess } from "../utils/api";

export type TUser = {
    email: string;
    name: string;
}

export interface IUserResponse extends IResSuccess {
    user: TUser;
}

export interface IUser extends TUser {
    password: string;
    passwordReset: number;
}

export interface IProfileStorage {
    isLoading: boolean;
    isFailed: boolean;
    user: IUser;
    hasLoginError: boolean;
    loginErrorMessage: string;
}

export type RegUpdateProfileFunction = (email: string, password: string, name: string) => any;
export type LoginFunction = (email: string, password: string) => any;
export type ResetPasswordFunction = (password: string, token: string) => any;
export type ForgotPasswordFunction = (password: string) => any;
