import { getDefaultMiddleware } from "@reduxjs/toolkit";
import configureMockStore from "redux-mock-store";

import reducer, {
  AuthState,
  initialState,
  logout,
  selectIsAuth,
  selectAuthTimerId,
  selectToken,
  selectUserId,
  setUserAuth,
  signIn,
} from "./auth";
import { fireAuthAxios } from "../../axios/firebase";
import authLocalStorage from "../../shared/helpers/auth-local-storage";
import { FireSigninResBody, InputAuthPayload } from "../../shared/types/auth";
import { AppDispatch, RootState } from "../types";
import { HttpError } from "../../shared/types/errors";

const mockStore = configureMockStore<RootState, AppDispatch>(
  getDefaultMiddleware()
);

describe("auth slice", () => {
  describe("reducers and selectors", () => {
    it("Should return the initial state on first run", () => {
      const nextState = reducer(undefined, { type: "test" });
      expect(nextState).toEqual(initialState);
    });

    it("Should properly set the UserAuth & authTimerId upon sign in", () => {
      const updatedState: AuthState = {
        userId: "some-userId",
        token: "some-token",
        authTimerId: 100,
      };

      const nextState = reducer(initialState, setUserAuth(updatedState));

      const rootState: any = { auth: nextState };
      expect(selectIsAuth(rootState)).toEqual(true);
      expect(selectAuthTimerId(rootState)).toEqual(updatedState.authTimerId);
    });

    it("Should reset the UserAuth & authTimerId upon logout", () => {
      const currentState: AuthState = {
        userId: "some-userId",
        token: "some-token",
        authTimerId: 100,
      };

      const nextState = reducer(currentState, logout());

      const rootState: any = { auth: nextState };
      expect(selectIsAuth(rootState)).toEqual(false);
      expect(selectUserId(rootState)).toEqual(null);
      expect(selectToken(rootState)).toEqual(null);
      expect(selectAuthTimerId(rootState)).toEqual(-1);
    });
  });

  let mockedFireAuthAxios: jest.SpyInstance;
  const inputAuth: InputAuthPayload = {
    email: "test@test.com",
    password: "jajaja",
  };

  beforeEach(() => {
    mockedFireAuthAxios = jest.spyOn(fireAuthAxios, "post");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("thunks", () => {
    it("Should return the AuthState upon sign in fulfilled", async () => {
      const resPayload = {
        status: 200,
        data: {
          email: inputAuth.email,
          localId: "123",
          expiresIn: "3600",
          idToken: "this-is-token",
          kind: "Unknwon",
          refreshToken: "this-is-refresh-token",
          displayName: "test",
          registered: true,
        } as FireSigninResBody,
      };
      mockedFireAuthAxios.mockResolvedValueOnce(resPayload);
      authLocalStorage.setAuthPersistence = jest.fn(() => 123);
      const rootState: any = { auth: initialState };
      const store = mockStore(rootState);

      const res = await store.dispatch(signIn(inputAuth));

      expect(res.type).toBe(signIn.fulfilled.type);
      const authData = res.payload as AuthState;
      expect(authData.userId).toEqual(resPayload.data.localId);
      expect(authData.token).toEqual(resPayload.data.idToken);
      expect(authData.authTimerId).toBe(123);
    });

    it("Should return the HttpError upon sign in rejected", async () => {
      const resPayload = {
        response: {
          data: {
            error: {
              code: 400,
              message: "EMAIL_NOT_FOUND",
            },
          },
        },
      };
      mockedFireAuthAxios.mockRejectedValueOnce(resPayload);
      const rootState: any = { auth: initialState };
      const store = mockStore(rootState);

      const res = await store.dispatch(signIn(inputAuth));

      expect(res.type).toBe(signIn.rejected.type);
      const authData = res.payload as HttpError;
      expect(authData.statusCode).toBe(resPayload.response.data.error.code);
      expect(authData.message).toBe(
        "There is no user registered with that email address"
      );
    });
  });
});
