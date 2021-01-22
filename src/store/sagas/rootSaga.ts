import { all, takeEvery, takeLatest } from "redux-saga/effects";

import { setAutoLogout, logout, tryAutoSignIn } from "./actions";
import { onLogout, onAuthenticated, onAutoSignIn, onAutoLogout } from "./auth";
import { signIn, signUp } from "../thunks/auth";

export function* watchAuth() {
  yield takeLatest(
    [signUp.fulfilled.type, signIn.fulfilled.type],
    onAuthenticated
  );
  yield takeEvery(tryAutoSignIn, onAutoSignIn);
  yield takeEvery(setAutoLogout, onAutoLogout);
  yield takeEvery(logout, onLogout);
}

export default function* rootSaga() {
  yield all([watchAuth()]);
}
