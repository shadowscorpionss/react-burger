interface IUser{
    email:string;
    name: string;
    password:string;
}

interface IProfileStorage{
    isLoading: boolean;
    isFailed: boolean;
    user: IUser;
    hasLoginError: boolean;
    loginErrorMessage:string;
}


export type {IUser, IProfileStorage}