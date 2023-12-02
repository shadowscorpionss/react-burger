import { TUpdateUserDataActions } from "./change-user-data";
import { TForgotPasswordActions } from "./forgot-password";
import { TGetProfileActions } from "./get-profile-data";

export type TProfileActions = TUpdateUserDataActions | TForgotPasswordActions| TGetProfileActions;