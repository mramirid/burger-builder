import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunkAPIConfig } from "../types";
import { fireAuthAxios } from "../../axios/firebase";
import {
  InputAuthPayload,
  FireInputAuthReqBody,
  FireSigninResBody,
  FireSignupResBody,
} from "../../shared/types/auth";
import * as authLocalStorage from "../../shared/helpers/auth-local-storage";

interface AuthState {
  userId: string | null;
  token: string | null;
  authTimerId: number;
}

const initialState: AuthState = {
  userId: null,
  token: null,
  authTimerId: -1,
};

export const signUp = createAsyncThunk<
  AuthState,
  InputAuthPayload,
  AppThunkAPIConfig
>("auth/signUp", async (payload, thunkAPI) => {
  try {
    const response = await fireAuthAxios.post<FireSignupResBody>(
      `/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,
      {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      } as FireInputAuthReqBody
    );
    if (response.status >= 400) {
      return thunkAPI.rejectWithValue("Failed to sign up");
    }

    const tokenExpirationDuration = +response.data.expiresIn * 1000;
    const tokenExpirationDate = new Date().getTime() + tokenExpirationDuration;

    authLocalStorage.saveUserAuth({
      userId: response.data.localId,
      token: response.data.idToken,
      tokenExpirationDate: tokenExpirationDate,
    });

    const authTimerId = window.setTimeout(
      () => thunkAPI.dispatch(authSlice.actions.logout()),
      tokenExpirationDuration
    );

    return {
      userId: response.data.localId,
      token: response.data.idToken,
      authTimerId,
    };
  } catch (error) {
    let errorMessage: string;
    switch (error.response.data.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "The email is already in use by another account";
        break;
      default:
        errorMessage = error.message || "An error occurred";
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const signIn = createAsyncThunk<
  AuthState,
  InputAuthPayload,
  AppThunkAPIConfig
>("auth/signIn", async (payload, thunkAPI) => {
  try {
    const response = await fireAuthAxios.post<FireSigninResBody>(
      `/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
      {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      } as FireInputAuthReqBody
    );
    if (response.status >= 400) {
      return thunkAPI.rejectWithValue("Failed to sign up");
    }

    const tokenExpirationDuration = 5000;
    // const tokenExpirationDuration = +response.data.expiresIn * 1000;
    const tokenExpirationDate = new Date().getTime() + tokenExpirationDuration;

    authLocalStorage.saveUserAuth({
      userId: response.data.localId,
      token: response.data.idToken,
      tokenExpirationDate: tokenExpirationDate,
    });

    const authTimerId = window.setTimeout(
      () => thunkAPI.dispatch(authSlice.actions.logout()),
      tokenExpirationDuration
    );

    return {
      userId: response.data.localId,
      token: response.data.idToken,
      authTimerId,
    };
  } catch (error) {
    let errorMessage: string;
    switch (error.response.data.error.message) {
      case "EMAIL_NOT_FOUND":
        errorMessage = "There is no user registered with that email address";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is invalid";
        break;
      case "USER_DISABLED":
        errorMessage = "The user account has been disabled by an administrator";
        break;
      default:
        errorMessage = error.message || "An error occurred";
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAuth(state, action: PayloadAction<AuthState>) {
      state.userId = action.payload.userId;
      state.userId = action.payload.token;
      state.authTimerId = action.payload.authTimerId;
    },
    logout(state) {
      authLocalStorage.clearUserAuth();
      clearTimeout(state.authTimerId);
      state.token = null;
      state.userId = null;
      state.authTimerId = -1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        state.authTimerId = action.payload.authTimerId;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        state.authTimerId = action.payload.authTimerId;
      });
  },
});

export const { setUserAuth, logout } = authSlice.actions;

export default authSlice.reducer;
