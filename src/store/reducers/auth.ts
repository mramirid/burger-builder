import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { AppThunkAPIConfig } from "../types";
import { fireAuthAxios } from "../../axios/firebase";
import {
  InputAuthPayload,
  FireInputAuthReqBody,
  FireSigninResBody,
  FireSignupResBody,
} from "../../shared/types/auth";

interface UserAuth {
  userId: string | null;
  token: string | null;
}

interface AuthState extends UserAuth {}

const initialState: AuthState = {
  userId: null,
  token: null,
};

export const signUp = createAsyncThunk<
  UserAuth,
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
    return {
      userId: response.data.localId,
      token: response.data.idToken,
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
  UserAuth,
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
    return {
      userId: response.data.localId,
      token: response.data.idToken,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.token = action.payload.token;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.token = action.payload.token;
      });
  },
});

export default authSlice.reducer;
