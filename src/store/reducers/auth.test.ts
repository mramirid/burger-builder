import reducer, {
  AuthState,
  initialState,
  logout,
  selectIsAuth,
  selectToken,
  selectUserId,
  setUserAuth,
} from "./auth";

describe("auth slice", () => {
  describe("reducers and selectors", () => {
    it("Should return the initial state on first run", () => {
      const nextState = reducer(undefined, { type: "test" });
      expect(nextState).toEqual(initialState);
    });

    it("Should properly set the UserAuth data upon sign in", () => {
      const updatedState: AuthState = {
        userId: "some-userId",
        token: "some-token",
      };

      const nextState = reducer(initialState, setUserAuth(updatedState));

      const rootState: any = { auth: nextState };
      expect(selectIsAuth(rootState)).toEqual(true);
    });

    it("Should clear the UserAuth upon logout", () => {
      const currentState: AuthState = {
        userId: "some-userId",
        token: "some-token",
      };

      const nextState = reducer(currentState, logout());

      const rootState: any = { auth: nextState };
      expect(selectIsAuth(rootState)).toEqual(false);
      expect(selectUserId(rootState)).toEqual(null);
      expect(selectToken(rootState)).toEqual(null);
    });
  });
});
