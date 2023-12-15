import { IUser, ResetPasswordStatus, TProfileStorage, TUser } from "../../types/profile-types";
import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, TProfileActions, USER_REGISTRATION_FAILED, USER_REGISTRATION_REQUEST, USER_REGISTRATION_SUCCESS } from "../actions/profile";
import { profileReducer } from "./profile";


// case FORGOT_PASSWORD_SUCCESS: {
//     return {
//         ...updateRequestSuccess(updateNullPassword(state))
//     };
// }
// case FORGOT_PASSWORD_FAILED: {
//     return {
//         ...updateRequestFailed(updateNullPassword(state), action.err)
//     };
// }

// case RESET_PASSWORD_SUCCESS: {
//     return {
//         ...updateRequestSuccess(updateResetStatus(state, ResetPasswordStatus.Finish)),
//     };
// }
// case RESET_PASSWORD_FAILED: {
//     return {
//         ...updateRequestFailed(updateResetStatus(state, ResetPasswordStatus.Failed), action.err),
//     };
// }
// case USER_REGISTRATION_REQUEST: {
//     return {
//         ...updateRequest(state),
//     };
// }
// case USER_REGISTRATION_SUCCESS: {
//     return {
//         ...updateRequestSuccess(updateUser(state, action.user)),
//     };
// }
// case USER_REGISTRATION_FAILED: {
//     return {
//         ...updateRequestFailed(state, action.err)
//     };
// }

// case USER_LOGIN_REQUEST: {
//     return {
//         ...updateRequest(updateUser(state, defaultUser)),
//     };
// }
// case USER_LOGIN_SUCCESS: {
//     return {
//         ...updateRequestSuccess(updateUser(state, action.user)),

//     };
// }
// case USER_LOGIN_FAILED: {
//     return {
//         ...updateRequestFailed(state, action.err, true)
//     };
// }

// case USER_LOGOUT_REQUEST: {
//     return {
//         ...updateRequest(state)
//     };
// }
// case USER_LOGOUT_SUCCESS: {
//     return {
//         ...updateRequestSuccess(updateUser(state, defaultUser))
//     };
// }
// case USER_LOGOUT_FAILED: {
//     return {
//         ...updateRequestFailed(state, action.err)
//     };
// }
// case UPDATE_USER_DATA_REQUEST: {
//     return {
//         ...updateRequest(state)
//     };
// }
// case UPDATE_USER_DATA_SUCCESS: {
//     return {
//         ...updateRequestSuccess(updateUser(state, action.user))
//     };
// }
// case UPDATE_USER_DATA_FAILED: {
//     return {
//         ...updateRequestFailed(state, action.err)
//     };
// }
// case GET_PROFILE_DATA_REQUEST: {
//     return {
//         ...updateRequest(state)
//     };
// }
// case GET_PROFILE_DATA_SUCCESS: {
//     return {
//         ...updateRequestSuccess(updateUser(state, action.user))
//     };
// }
// case GET_PROFILE_DATA_FAILED: {
//     return {
//         ...updateRequestFailed(state, action.err)
//     };
// }
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

    it('should set failed state on forgot password success', () => {
        const result = profileReducer(initialState, { type: FORGOT_PASSWORD_SUCCESS });
        expect(result.isFailed).toEqual(false);
        expect(result.isLoading).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.loginErrorMessage).toEqual('');
        expect(result.user.password).toEqual('');
    });

    it('should set failed state on forgot password failed', () => {
        const result = profileReducer(initialState, { type: FORGOT_PASSWORD_FAILED, err: { status: 0, additional: '', message: 'reg' } });
        expect(result.isFailed).toEqual(true);
        expect(result.isLoading).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.loginErrorMessage).toEqual('')
    });


    it('should set loading state on reset password request', () => {
        const result = profileReducer(initialState, { type: RESET_PASSWORD_REQUEST });
        expect(result.isFailed).toEqual(false);
        expect(result.hasLoginError).toEqual(false);
        expect(result.isLoading).toEqual(true);
        expect(result.loginErrorMessage).toEqual('')
    });

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

    it('should set failed state on registration success', () => {
        const user: TUser ={
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


});