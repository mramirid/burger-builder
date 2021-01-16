import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { AppThunk, AppThunkAPIConfig, RootState } from "../types";
import { fireAuthAxios } from "../../axios/firebase";
import {
  InputAuthPayload,
  FireInputAuthReqBody,
  FireSigninResBody,
  FireSignupResBody,
} from "../../shared/types/auth";
import authLocalStorage from "../../shared/helpers/auth-local-storage";

export interface AuthState {
  userId: string | null;
  token: string | null;
  authTimerId: number;
}

export const initialState: AuthState = {
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
      return thunkAPI.rejectWithValue({
        statusCode: response.status,
        message: "Failed to sign up",
      });
    }

    const authTimerId = authLocalStorage.setAuthPersistence(
      response.data,
      () => {
        thunkAPI.dispatch(authSlice.actions.logout());
      }
    );

    return {
      userId: response.data.localId,
      token: response.data.idToken,
      authTimerId,
    };
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
      return thunkAPI.rejectWithValue({
        statusCode: response.status,
        message: "Failed to sign in",
      });
    }

    const authTimerId = authLocalStorage.setAuthPersistence(
      response.data,
      () => {
        thunkAPI.dispatch(authSlice.actions.logout());
      }
    );

    return {
      userId: response.data.localId,
      token: response.data.idToken,
      authTimerId,
    };
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

export const tryAutoSignIn = (): AppThunk => (thunkDispatch) => {
  const userAuthData = authLocalStorage.getUserAuth();
  if (
    userAuthData.token &&
    userAuthData.userId &&
    userAuthData.tokenExpirationDate
  ) {
    const tokenExpirationDate =
      userAuthData.tokenExpirationDate - new Date().getTime();

    if (tokenExpirationDate > 0) {
      const authTimerId = window.setTimeout(() => {
        thunkDispatch(logout());
      }, tokenExpirationDate);

      thunkDispatch(
        setUserAuth({
          userId: userAuthData.userId,
          token: userAuthData.token,
          authTimerId,
        })
      );
    }
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAuth(state, action: PayloadAction<AuthState>) {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
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

export const selectToken = (state: RootState) => state.auth.token;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectAuthTimerId = (state: RootState) => state.auth.authTimerId;
export const selectIsAuth = createSelector(
  [selectToken, selectUserId],
  (token, userId) => !!token && !!userId
);

export const { setUserAuth, logout } = authSlice.actions;

export default authSlice.reducer;
