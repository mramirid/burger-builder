import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "..";

export interface AuthState {
  userId: string | null;
  token: string | null;
}

export const initialState: AuthState = {
  userId: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAuth(state, action: PayloadAction<AuthState>) {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    logout(state) {
      state.token = null;
      state.userId = null;
    },
  },
});

export const selectToken = (state: RootState) => state.auth.token;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectIsAuth = createSelector(
  [selectToken, selectUserId],
  (token, userId) => !!token && !!userId
);

export const { setUserAuth, logout } = authSlice.actions;

export default authSlice.reducer;
