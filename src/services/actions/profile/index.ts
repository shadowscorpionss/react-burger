import { TUpdateUserDataActions } from "./change-user-data";
import { TForgotPasswordActions } from "./forgot-password";


export type TProfileActions = TUpdateUserDataActions | TForgotPasswordActions;