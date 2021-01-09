import { InputControl } from "./input";

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

export interface FireSigninResBody {
  displayName: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registered: boolean;
}

export interface FireSignupResBody {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
}
