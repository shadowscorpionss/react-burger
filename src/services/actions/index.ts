
export interface IAction <T> {
    readonly type: T
}

export interface IErrorAction <T> extends IAction<T> {
    err: IReqError
}

export interface IReqError {
    status:number;
    message: string;
    additional: string;
}

export const actionCreator = <T>(type:T)=> {
    return {type: type};
}


export const errorActionCreator = <T,E>(type:T, errorMessage:string, err:E) =>{
    return {...actionCreator(type), errorMessage: errorMessage, err};
}

export const requestErrorActionCreator =<T>(type:T,err:IReqError)=> errorActionCreator(type, requestErrorMessage(err), err)

export const requestErrorMessage= (err:IReqError)=>{
    const {status, message, additional}=err;
    return `Error. Status: ${status}. Message: ${message}. Additional info: ${additional}`;
}

