import { createAction } from "@reduxjs/toolkit";

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}

export const logout = createAction("authSaga/logout");
export const tryAutoSignIn = createAction("authSaga/tryAutoLogin");
export const setAutoLogout = createAction(
  "authSaga/setAutoLogout",
  withPayloadType<number>()
);
