import { InputControl } from "./input";

/*
 * Authentication Forms
 */
enum InputAuthFields {
  Email = "email",
  Password = "password",
}

export interface InputAuthControls {
  [InputAuthFields.Email]: InputControl;
  [InputAuthFields.Password]: InputControl;
  [x: string]: InputControl;
}

export interface InputAuthPayload {
  [InputAuthFields.Email]: string;
  [InputAuthFields.Password]: string;
}

export interface FireInputAuthReqBody {
  [InputAuthFields.Email]: string;
  [InputAuthFields.Password]: string;
  returnSecureToken: boolean;
}

/*
 * Firebase Auth REST API
 */
export interface FireAuthResBody {
  idToken: string;
  expiresIn: string;
  localId: string;
}

export interface FireSigninResBody extends FireAuthResBody {
  displayName: string;
  email: string;
  refreshToken: string;
  kind: string;
  registered: boolean;
}

export interface FireSignupResBody extends FireAuthResBody {
  email: string;
  refreshToken: string;
  kind: string;
}

/*
 * Local Storage
 */
export interface StoreUserAuthPayload {
  userId: string;
  token: string;
  tokenExpirationDate: number;
}

export interface SavedUserAuthPayload {
  userId: string | null;
  token: string | null;
  tokenExpirationDate: number | null;
}
