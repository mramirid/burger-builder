import { FireAuthResBody } from "../types/auth";

interface UserAuth {
  userId: string | null;
  token: string | null;
  tokenExpirationDate: number | null;
}

function saveUserAuth(userAuthData: UserAuth) {
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

function getUserAuth(): UserAuth {
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

function setAuthPersistence(
  userAuthRes: FireAuthResBody,
  onLogout: () => void
): number {
  // const tokenExpirationDuration = 5000; --> for testing auto logout
  const tokenExpirationDuration = +userAuthRes.expiresIn * 1000;
  const tokenExpirationDate = new Date().getTime() + tokenExpirationDuration;

  saveUserAuth({
    userId: userAuthRes.localId,
    token: userAuthRes.idToken,
    tokenExpirationDate: tokenExpirationDate,
  });

  const authTimerId = window.setTimeout(onLogout, tokenExpirationDuration);
  return authTimerId;
}

const authLocalStorage = {
  setAuthPersistence,
  saveUserAuth,
  getUserAuth,
  clearUserAuth,
};
export default authLocalStorage;
