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
