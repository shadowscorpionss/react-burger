
export interface IAction <T> {
    readonly type: T
}

export interface IErrorAction <T> extends IAction<T> {
    err: IRequestError
}

export interface IRequestError {
    status:number;
    message: string;
    additional: string;
}

export const actionCreator = <T>(type:T)=> {
    return {type: type, };
}

export const errorActionCreator = <T,E>(type:T, errorMessage:string, err:E) =>{
    return {...actionCreator(type), errorMessage: errorMessage, err};
}

export const requestErrorActionCreator =<T>(type:T,err:IRequestError)=> errorActionCreator(type, requestErrorMessage(err), err)

export const requestErrorMessage= (err:IRequestError)=>{
    const {status, message, additional}=err;
    return `Error. Status: ${status}. Message: ${message}. Additional info: ${additional}`;
}

