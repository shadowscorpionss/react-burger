
export const actionCreator =(type)=> {
    return {type: type};
}

export const errorActionCreator =(type, errorMessage) =>{
    return {...actionCreator(type), errorMessage: errorMessage};
}