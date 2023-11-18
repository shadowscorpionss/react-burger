interface IUser{
    email:string;
}

interface IProfileStorage{
    isLoading: boolean;
    user: IUser;
}


export type {IUser, IProfileStorage}