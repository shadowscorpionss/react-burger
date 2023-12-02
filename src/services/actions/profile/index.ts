import { TUpdateUserDataActions } from "./change-user-data";
import { TForgotPasswordActions } from "./forgot-password";
import { TGetProfileActions } from "./get-profile-data";
import { TResetPasswordActions } from "./reset-password";

export type TProfileActions = TUpdateUserDataActions | TForgotPasswordActions| TGetProfileActions | TResetPasswordActions;