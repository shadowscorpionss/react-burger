interface IUser{
    email:string;
}

interface IProfileStorage{
    isLoading: boolean;
    hasError: boolean;
    user: IUser;
}


export type {IUser, IProfileStorage}