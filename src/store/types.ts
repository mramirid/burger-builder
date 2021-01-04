import { Action, SerializedError, ThunkAction } from "@reduxjs/toolkit";

import store from ".";

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export interface HTTPThunkAPIConfig {
  state: RootState;
  dispatch: AppDispatch;
  extra: unknown;
  rejectValue: unknown;
  serializedErrorType: SerializedError;
}
