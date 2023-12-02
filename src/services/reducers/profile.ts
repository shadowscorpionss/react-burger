import { IRequestError } from "../../types/action-types";
import { IUser, ResetPasswordStatus, TProfileStorage, TUser } from "../../types/profile-types";
import {
    GET_PROFILE_DATA_REQUEST,
    GET_PROFILE_DATA_SUCCESS,
    GET_PROFILE_DATA_FAILED,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILED,
    UPDATE_USER_DATA_REQUEST,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILED,
    TProfileActions
} from "../actions/profile";

const defaultUser: IUser = {
    email: '',
    name: '',
    password: '',
    resetStatus: ResetPasswordStatus.None
}


const profileInitialState: TProfileStorage = {
    user: defaultUser,
    isLoading: false,
    isFailed: false,
    hasLoginError: false,
    loginErrorMessage: ""
}

const updateRequest = (state: TProfileStorage) => {
    return {
        ...state,
        isLoading: true,
        isFailed: false,
        hasLoginError: false,
    }
}

const updateRequestSuccess = (state: TProfileStorage) => {
    return {
        ...state,
        isLoading: false,
        isFailed: false,
        hasLoginError: false,
    }
}

const updateRequestFailed = (state: TProfileStorage, err: IRequestError, loginError: boolean = false) => {
    return {
        ...state,
        isLoading: false,
        isFailed: true,
        loginErrorMessage: loginError ? err.message : '',
        hasLoginError: loginError && err.message,
    }
}


const updateUser = (state: TProfileStorage, user: TUser) => {
    return {
        ...state,
        user: {
            ...state.user,
            email: user.email,
            name: user.name
        }
    }
}

const updateNullPassword = (state: TProfileStorage) => {
    return {
        ...state,
        user: {
            ...state.user,
            password: '',
        }
    }
}

const updateResetStatus = (state: TProfileStorage, resetStatus: ResetPasswordStatus = ResetPasswordStatus.None) => {
    return {
        ...state,
        user: {
            ...state.user,
            resetStatus: resetStatus
        }
    }
}


export const profileReducer = (state = profileInitialState, action: TProfileActions) => {

    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...updateRequest(updateResetStatus(state))
            };
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...updateRequestSuccess(updateNullPassword(state))
            };
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...updateRequestFailed(updateNullPassword(state), action.err)
            };
        }

        case RESET_PASSWORD_REQUEST: {
            return {
                ...updateRequest(updateResetStatus(state)),
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...updateRequestSuccess(updateResetStatus(state, ResetPasswordStatus.Finish)),
            };
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...updateRequestFailed(updateResetStatus(state, ResetPasswordStatus.Failed), action.err),
            };
        }
        case USER_REGISTRATION_REQUEST: {
            return {
                ...updateRequest(state),
            };
        }
        case USER_REGISTRATION_SUCCESS: {
            return {
                ...updateRequestSuccess(updateUser(state, action.user)),
            };
        }
        case USER_REGISTRATION_FAILED: {
            return {
                ...updateRequestFailed(state, action.err)
            };
        }

        case USER_LOGIN_REQUEST: {
            return {
                ...updateRequest(updateUser(state, defaultUser)),
            };
        }
        case USER_LOGIN_SUCCESS: {
            return {
                ...updateRequestSuccess(updateUser(state, action.user)),

            };
        }
        case USER_LOGIN_FAILED: {
            return {
                ...updateRequestFailed(state, action.err, true)
            };
        }

        case USER_LOGOUT_REQUEST: {
            return {
                ...updateRequest(state)
            };
        }
        case USER_LOGOUT_SUCCESS: {
            return {
                ...updateRequestSuccess(updateUser(state, defaultUser))
            };
        }
        case USER_LOGOUT_FAILED: {
            return {
                ...updateRequestFailed(state,action.err)                
            };
        }
        case UPDATE_USER_DATA_REQUEST: {
            return {
                ...updateRequest(state)                
            };
        }
        case UPDATE_USER_DATA_SUCCESS: {
            return {
                ...updateRequestSuccess(updateUser(state,action.user))                
            };
        }
        case UPDATE_USER_DATA_FAILED: {
            return {
                ...updateRequestFailed(state,action.err)
            };
        }
        case GET_PROFILE_DATA_REQUEST: {
            return {
                ...updateRequest(state)                
            };
        }
        case GET_PROFILE_DATA_SUCCESS: {
            return {
                ...updateRequestSuccess(updateUser(state,action.user))                
            };
        }
        case GET_PROFILE_DATA_FAILED: {
            return {
                ...updateRequestFailed(state,action.err)
            };
        }

        default: {
            return state;
        }
    }
};
