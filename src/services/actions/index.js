
export const actionCreator =(type)=> {
    return {type: type};
}

export const errorActionCreator =(type, errorMessage) =>{
    return {...actionCreator(type), errorMessage: errorMessage};
}

export const requestErrorActionCreator =(type,err)=> errorActionCreator(type, requestErrorMessage(err))


export const requestErrorMessage= (err)=>{
    const {status, message, additional}=err;
    return `Error. Status: ${status}. Message: ${message}. Additional info: ${additional}`;
}