type TStorage = {
    isLoading: boolean;
    isFailed: boolean;
    errorMessage: string;
}

interface IStorage extends TStorage { }

export type { IStorage, TStorage };