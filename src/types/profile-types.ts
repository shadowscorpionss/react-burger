interface IUser{
    email:string;
}

interface IProfileStorage{
    isLoading: boolean;
    isFailed: boolean;
    user: IUser;
    hasLoginError: boolean;
    loginErrorMessage:string;
}


export type {IUser, IProfileStorage}