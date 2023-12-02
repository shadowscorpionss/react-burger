import { IResSuccess } from "../utils/api";

type TUser = {
    email: string;
    name: string;
}

export interface IUserResponse extends IResSuccess{
    user: TUser;
}

interface IUser extends TUser{    
    password:string;
    passwordReset:number;
}

interface IProfileStorage{
    isLoading: boolean;
    isFailed: boolean;
    user: IUser;
    hasLoginError: boolean;
    loginErrorMessage:string;
}


export type {IUser, IProfileStorage, TUser}