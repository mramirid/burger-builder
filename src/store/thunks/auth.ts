import { createAsyncThunk } from "@reduxjs/toolkit";

import { AppThunkAPIConfig } from "../types";
import { fireAuthAxios } from "../../axios/firebase";
import {
  InputAuthPayload,
  FireInputAuthReqBody,
  FireSigninResBody,
  FireSignupResBody,
  FireAuthResBody,
} from "../../types/auth";

export const signUp = createAsyncThunk<
  FireAuthResBody,
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
      return thunkAPI.rejectWithValue({
        statusCode: response.status,
        message: "Failed to sign up",
      });
    }
    return response.data;
  } catch (axiosErr) {
    let errorMessage: string;
    switch (axiosErr.response.data.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "The email is already in use by another account";
        break;
      default:
        errorMessage = "An Error Occurred";
    }
    return thunkAPI.rejectWithValue({
      statusCode: axiosErr.response.data.error.code || 400,
      message: errorMessage,
    });
  }
});

export const signIn = createAsyncThunk<
  FireAuthResBody,
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
      return thunkAPI.rejectWithValue({
        statusCode: response.status,
        message: "Failed to sign in",
      });
    }
    return response.data;
  } catch (axiosErr) {
    let errorMessage: string;
    switch (axiosErr.response.data.error.message) {
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
        errorMessage = "An Error Occurred";
    }
    return thunkAPI.rejectWithValue({
      statusCode: axiosErr.response.data.error.code || 400,
      message: errorMessage,
    });
  }
});
