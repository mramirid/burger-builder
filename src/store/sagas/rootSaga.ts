import { all, takeEvery, takeLatest } from "redux-saga/effects";

import {
  setAutoLogout,
  logout,
  tryAutoSignIn,
  fetchIngredientCounts,
} from "./actions";
import { onLogout, onAuthenticated, onAutoSignIn, onAutoLogout } from "./auth";
import { signIn, signUp } from "../thunks/auth";
import { onInitIngredientCounts } from "./burger";

export function* watchAuth() {
  yield takeLatest(
    [signUp.fulfilled.type, signIn.fulfilled.type],
    onAuthenticated
  );
  yield takeEvery(tryAutoSignIn, onAutoSignIn);
  yield takeEvery(setAutoLogout, onAutoLogout);
  yield takeEvery(logout, onLogout);
}

export function* watchBurger() {
  yield takeEvery(fetchIngredientCounts, onInitIngredientCounts);
}

export default function* rootSaga() {
  yield all([watchAuth(), watchBurger()]);
}
