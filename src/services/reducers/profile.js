import {
    GET_PROFILE_DATA_REQUEST,
    GET_PROFILE_DATA_SUCCESS,
    GET_PROFILE_DATA_FAILED
} from "../actions/profile/get-profile-data";

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED
} from "../actions/profile/user-login";

import {
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAILED
} from "../actions/profile/user-registration";

import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
} from '../actions/profile/forgot-password';

import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED
} from '../actions/profile/reset-password';


import {
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILED
} from '../actions/profile/user-logout';

import {
    UPDATE_USER_DATA_REQUEST,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILED
} from '../actions/profile/change-user-data';


const initialState = {
    user: {
        email: null,
        name: null,
    },
    isLoading: false,
    isFailed: false,

    //Errors?
    errorMessage: "",

    hasLoginError: false,
    loginErrorMessage: ""
}



export const profileReducer = (state = initialState, action) => {
    const { type, ...rest } = action;

    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                isLoading: true,
                user: {
                    ...state.user,
                    passwordReset:0
                }
            };
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                user: {
                    ...state.user,
                    password: null,
                },
            };
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                user: {
                    ...state.user,
                    password: null,
                },
                isLoading: false,
                isFailed: true,
                errorMessage: rest.errorMessage
            };
        }

        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                isLoading: true,
                user: {
                    ...state.user,
                    passwordReset:0
                }
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                user:{
                    ...state.user,
                    passwordReset:2
                }
            };
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                isLoading: false,
                isFailed: true,
                user:{
                    ...state.user,
                    passwordReset:1
                },
                errorMessage: rest.errorMessage
            };
        }
        case USER_REGISTRATION_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case USER_REGISTRATION_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isFailed: false,
                user: {
                    email: rest.user.email,
                    name: rest.user.name,
                },
            };
        }
        case USER_REGISTRATION_FAILED: {
            return {
                ...state,
                isLoading: false,
                isFailed: true,
            };
        }

        case USER_LOGIN_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isFailed: false,
                hasLoginError: false,
                user: {
                    email: null,
                    name: null,
                },
            };
        }
        case USER_LOGIN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isFailed: false,
                hasLoginError: false,
                user: {
                    email: rest.user.email,
                    name: rest.user.name,
                },
            };
        }
        case USER_LOGIN_FAILED: {
            return {
                ...state,
                isLoading: false,
                isFailed: true,
                hasLoginError: true,
                errorMessage: rest.errorMessage,
                loginErrorMessage: rest.err.message
            };
        }

        case USER_LOGOUT_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case USER_LOGOUT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isFailed: false,
                user: {
                    email: null,
                    name: null,
                },
            };
        }
        case USER_LOGOUT_FAILED: {
            return {
                ...state,
                isLoading: false,
                isFailed: true,
                errorMessage: rest.errorMessage
            };
        }
        case UPDATE_USER_DATA_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case UPDATE_USER_DATA_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isFailed: false,
                user: {
                    email: rest.user.email,
                    name: rest.user.name,
                },
            };
        }
        case UPDATE_USER_DATA_FAILED: {
            return {
                ...state,
                isLoading: false,
                isFailed: true,
            };
        }
        case GET_PROFILE_DATA_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case GET_PROFILE_DATA_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isFailed: false,
                user: {
                    email: rest.user.email,
                    name: rest.user.name,
                },
            };
        }
        case GET_PROFILE_DATA_FAILED: {
            return {
                ...state,
                isLoading: false,
                isFailed: true,
                user: {
                    email:null,
                    name:null
                },
                errorMessage: rest.errorMessage
            };
        }


        default: {
            return state;
        }
    }
};
