import { SavedUserAuthPayload, StoreUserAuthPayload } from "../types/auth";

function saveUserAuth(userAuthData: StoreUserAuthPayload) {
  if (
    userAuthData.userId &&
    userAuthData.token &&
    userAuthData.tokenExpirationDate
  ) {
    localStorage.setItem("userId", userAuthData.userId);
    localStorage.setItem("token", userAuthData.token);
    localStorage.setItem(
      "tokenExpirationDate",
      userAuthData.tokenExpirationDate.toString()
    );
  }
}

function getUserAuth(): SavedUserAuthPayload {
  return {
    userId: localStorage.getItem("userId"),
    token: localStorage.getItem("token"),
    tokenExpirationDate: +(localStorage.getItem("tokenExpirationDate") || 0),
  };
}

function clearUserAuth() {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpirationDate");
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  saveUserAuth,
  getUserAuth,
  clearUserAuth,
};
