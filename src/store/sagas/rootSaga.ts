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
  yield all([
    takeLatest([signUp.fulfilled.type, signIn.fulfilled.type], onAuthenticated),
    takeEvery(tryAutoSignIn, onAutoSignIn),
    takeEvery(setAutoLogout, onAutoLogout),
    takeEvery(logout, onLogout),
  ]);
}

export function* watchBurger() {
  yield takeLatest(fetchIngredientCounts, onInitIngredientCounts);
}

export default function* rootSaga() {
  yield all([watchAuth(), watchBurger()]);
}
