import { getDefaultMiddleware } from "@reduxjs/toolkit";
import configureMockStore from "redux-mock-store";

import { fireAuthAxios } from "../../axios/firebase";
import {
  FireAuthResBody,
  FireInputAuthReqBody,
  FireSigninResBody,
  InputAuthPayload,
} from "../../shared/types/auth";
import { HttpError } from "../../shared/types/errors";
import { initialState } from "../reducers/auth";
import { AppDispatch, RootState } from "../types";
import { signIn } from "./auth";

const mockStore = configureMockStore<RootState, AppDispatch>(
  getDefaultMiddleware()
);

const rootState: any = { auth: initialState };
const store = mockStore(rootState);
const inputAuth: InputAuthPayload = {
  email: "test@test.com",
  password: "jajaja",
};

describe("thunks", () => {
  it("Should return the FireAuthResBody upon sign in fulfilled", async () => {
    const axiosPostSpy = jest
      .spyOn(fireAuthAxios, "post")
      .mockResolvedValueOnce({
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
      });

    const result = await store.dispatch(signIn(inputAuth));

    expect(result.type).toBe(signIn.fulfilled.type);
    expect(axiosPostSpy).toBeCalledTimes(1);
    expect(axiosPostSpy).toBeCalledWith(
      `/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
      {
        email: inputAuth.email,
        password: inputAuth.password,
        returnSecureToken: true,
      } as FireInputAuthReqBody
    );
    const authData = result.payload as FireAuthResBody;
    expect(authData.localId).toEqual("123");
    expect(authData.idToken).toEqual("this-is-token");
  });

  it("Should return the HttpError upon sign in rejected", async () => {
    const axiosPostSpy = jest
      .spyOn(fireAuthAxios, "post")
      .mockRejectedValueOnce({
        response: {
          data: {
            error: {
              code: 400,
              message: "EMAIL_NOT_FOUND",
            },
          },
        },
      });

    const res = await store.dispatch(signIn(inputAuth));

    expect(res.type).toBe(signIn.rejected.type);
    expect(axiosPostSpy).toBeCalledTimes(1);
    expect(axiosPostSpy).toBeCalledWith(
      `/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
      {
        email: inputAuth.email,
        password: inputAuth.password,
        returnSecureToken: true,
      } as FireInputAuthReqBody
    );
    const authData = res.payload as HttpError;
    expect(authData.statusCode).toBe(400);
    expect(authData.message).toBe(
      "There is no user registered with that email address"
    );
  });
});
