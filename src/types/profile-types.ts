interface IUser{
    email:string;
}

interface IProfileStorage{
    isLoading: boolean;
    isFailed: boolean;
    user: IUser;
}


export type {IUser, IProfileStorage}