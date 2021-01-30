import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, delay, put } from "redux-saga/effects";

import authLocalStorage from "../../utils/auth-local-storage";
import { FireAuthResBody } from "../../types/auth";
import * as authReducer from "../reducers/auth";
import * as sagaActions from "./actions";

export function* onAuthenticated(action: PayloadAction<FireAuthResBody>) {
  const tokenExpirationDuration = +action.payload.expiresIn * 1000;
  const tokenExpirationDate = new Date().getTime() + tokenExpirationDuration;
  yield all([
    call(() => {
      authLocalStorage.saveUserAuth({
        token: action.payload.idToken,
        userId: action.payload.localId,
        tokenExpirationDate,
      });
    }),
    put(sagaActions.setAutoLogout(tokenExpirationDuration)),
    put(
      authReducer.setUserAuth({
        token: action.payload.idToken,
        userId: action.payload.localId,
      })
    ),
  ]);
}

export function* onAutoSignIn() {
  const userAuthData = authLocalStorage.getUserAuth();
  if (
    userAuthData.token &&
    userAuthData.userId &&
    userAuthData.tokenExpirationDate
  ) {
    const tokenExpirationDuration =
      userAuthData.tokenExpirationDate - new Date().getTime();

    if (tokenExpirationDuration > 0) {
      yield all([
        put(sagaActions.setAutoLogout(tokenExpirationDuration)),
        put(
          authReducer.setUserAuth({
            token: userAuthData.token,
            userId: userAuthData.userId,
          })
        ),
      ]);
    }
  }
}

export function* onLogout() {
  yield all([
    call(() => authLocalStorage.clearUserAuth()),
    put(authReducer.logout()),
  ]);
}

export function* onAutoLogout(action: PayloadAction<number>) {
  yield delay(action.payload);
  yield put(sagaActions.logout());
}
