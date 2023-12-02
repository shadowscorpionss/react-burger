type TUser = {
    email: string;
    name: string;
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