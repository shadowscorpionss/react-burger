import { IUser, ResetPasswordStatus, TProfileStorage, TUser } from "../../types/profile-types";
import {
    FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
    GET_PROFILE_DATA_FAILED, GET_PROFILE_DATA_REQUEST, GET_PROFILE_DATA_SUCCESS,
    RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,
    UPDATE_USER_DATA_FAILED, UPDATE_USER_DATA_REQUEST, UPDATE_USER_DATA_SUCCESS,
    USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
    USER_LOGOUT_FAILED, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS,
    USER_REGISTRATION_FAILED, USER_REGISTRATION_REQUEST, USER_REGISTRATION_SUCCESS,
    TProfileActions,
} from "../actions/profile";
import { profileReducer } from "./profile";


const defaultUser: IUser = {
    email: '',
    name: '',
    password: '',
    resetStatus: ResetPasswordStatus.None
}

const initialState: TProfileStorage = {
    user: defaultUser,
    isLoading: false,
    isFailed: false,
    hasLoginError: false,
    loginErrorMessage: ''
}

describe('test userOrdersReducer', () => {
    it('should return initial state', () => {
        const result = profileReducer(undefined, {} as TProfileActions);
        expect(result).toEqual(initialState);
    });
    //forgot
    it('should set loading state on forgot password request', () => {
        const result = profileReducer(initialState, { type: FORGOT_PASSWORD_REQUEST });
        expect(result.isFailed).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.isLoading).toEqual(true);
        expect(result.loginErrorMessage).toEqual('')
    });

    it('should set failed state on forgot password failed', () => {
        const result = profileReducer(initialState, { type: FORGOT_PASSWORD_FAILED, err: { status: 0, additional: '', message: 'fp' } });
        expect(result.isFailed).toEqual(true);
        expect(result.isLoading).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.loginErrorMessage).toEqual('')
    });

    it('should set state on forgot password success', () => {
        const result = profileReducer(initialState, { type: FORGOT_PASSWORD_SUCCESS });
        expect(result.isFailed).toEqual(false);
        expect(result.isLoading).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.loginErrorMessage).toEqual('');
        expect(result.user.password).toEqual('');
    });
    //reset
    it('should set loading state on reset password request', () => {
        const result = profileReducer(initialState, { type: RESET_PASSWORD_REQUEST });
        expect(result.isFailed).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.isLoading).toEqual(true);
        expect(result.loginErrorMessage).toEqual('')
    });

    it('should set failed state on reset password failed', () => {
        const result = profileReducer(initialState, { type: RESET_PASSWORD_FAILED, err: { status: 0, additional: '', message: 'rp' } });
        expect(result.isFailed).toEqual(true);
        expect(result.isLoading).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.loginErrorMessage).toEqual('')
    });

    it('should set state on reset password success', () => {
        const result = profileReducer(initialState, { type: RESET_PASSWORD_SUCCESS });
        expect(result.isFailed).toEqual(false);
        expect(result.isLoading).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.loginErrorMessage).toEqual('');
        expect(result.user.password).toEqual('');
    });

    //registration
    it('should set loading state on registration request', () => {
        const result = profileReducer(initialState, { type: USER_REGISTRATION_REQUEST });
        expect(result.isFailed).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.isLoading).toEqual(true);
        expect(result.loginErrorMessage).toEqual('')
    });

    it('should set failed state on registration failed', () => {
        const result = profileReducer(initialState, { type: USER_REGISTRATION_FAILED, err: { status: 0, additional: '', message: 'reg' } });
        expect(result.isFailed).toEqual(true);
        expect(result.isLoading).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.loginErrorMessage).toEqual('')
    });

    it('should set user information on registration success', () => {
        const user: TUser = {
            name: 'reg',
            email: 'reg@email'
        };
        const result = profileReducer(initialState, { type: USER_REGISTRATION_SUCCESS, user: user });
        expect(result.isFailed).toEqual(false);
        expect(result.isLoading).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.loginErrorMessage).toEqual('');
        expect(result.user.email).toEqual(user.email);
        expect(result.user.name).toEqual(user.name);
    });

    //login
    it('should set loading state on login request', () => {
        const result = profileReducer(initialState, { type: USER_LOGIN_REQUEST });
        expect(result.isFailed).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.isLoading).toEqual(true);
        expect(result.loginErrorMessage).toEqual('')
    });

    it('should set failed state on login failed', () => {
        const result = profileReducer(initialState, { type: USER_LOGIN_FAILED, err: { status: 0, additional: '', message: 'login' } });
        expect(result.isFailed).toEqual(true);
        expect(result.isLoading).toEqual(false);
        expect(result.hasLoginError).toEqual(true);
        expect(result.loginErrorMessage).toEqual('login')
    });

    it('should set user information state on login success', () => {
        const user: TUser = {
            name: 'login',
            email: 'login@email'
        };
        const result = profileReducer(initialState, { type: USER_LOGIN_SUCCESS, user: user });
        expect(result.isFailed).toEqual(false);
        expect(result.isLoading).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.loginErrorMessage).toEqual('');
        expect(result.user.email).toEqual(user.email);
        expect(result.user.name).toEqual(user.name);
    });

    //logout
    it('should set loading state on logout request', () => {
        const result = profileReducer(initialState, { type: USER_LOGOUT_REQUEST });
        expect(result.isFailed).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.isLoading).toEqual(true);
        expect(result.loginErrorMessage).toEqual('')
    });

    it('should set failed state on logout failed', () => {
        const result = profileReducer(initialState, { type: USER_LOGOUT_FAILED, err: { status: 0, additional: '', message: 'logout' } });
        expect(result.isFailed).toEqual(true);
        expect(result.isLoading).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.loginErrorMessage).toEqual('')
    });

    it('should set default user state on logout success', () => {
        const result = profileReducer(initialState, { type: USER_LOGOUT_SUCCESS });
        expect(result.isFailed).toEqual(false);
        expect(result.isLoading).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.loginErrorMessage).toEqual('');
        expect(result.user.email).toEqual('');
        expect(result.user.name).toEqual('');
    });

    //update user data
    it('should set loading state on update user data request', () => {
        const result = profileReducer(initialState, { type: UPDATE_USER_DATA_REQUEST });
        expect(result.isFailed).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.isLoading).toEqual(true);
        expect(result.loginErrorMessage).toEqual('')
    });

    it('should set failed state on update user data failed', () => {
        const result = profileReducer(initialState, { type: UPDATE_USER_DATA_FAILED, err: { status: 0, additional: '', message: 'uud' } });
        expect(result.isFailed).toEqual(true);
        expect(result.isLoading).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.loginErrorMessage).toEqual('')
    });

    it('should set user state on update user data success', () => {
        const user: TUser = {
            name: 'updated',
            email: 'updated@email'
        };
        const result = profileReducer(initialState, { type: UPDATE_USER_DATA_SUCCESS, user: user });
        expect(result.isFailed).toEqual(false);
        expect(result.isLoading).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.loginErrorMessage).toEqual('');
        expect(result.user.email).toEqual(user.email);
        expect(result.user.name).toEqual(user.name);
    });

    //get user data
    it('should set loading state on get profile data request', () => {
        const result = profileReducer(initialState, { type: GET_PROFILE_DATA_REQUEST });
        expect(result.isFailed).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.isLoading).toEqual(true);
        expect(result.loginErrorMessage).toEqual('')
    });

    it('should set failed state on get profile data failed', () => {
        const result = profileReducer(initialState, { type: GET_PROFILE_DATA_FAILED, err: { status: 0, additional: '', message: 'gpd' } });
        expect(result.isFailed).toEqual(true);
        expect(result.isLoading).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.loginErrorMessage).toEqual('')
    });

    it('should set user state on update get profile data success', () => {
        const user: TUser = {
            name: 'profile',
            email: 'profile@email'
        };
        const result = profileReducer(initialState, { type: GET_PROFILE_DATA_SUCCESS, user: user });
        expect(result.isFailed).toEqual(false);
        expect(result.isLoading).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.loginErrorMessage).toEqual('');
        expect(result.user.email).toEqual(user.email);
        expect(result.user.name).toEqual(user.name);
    });


});