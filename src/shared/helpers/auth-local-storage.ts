interface UserAuth {
  userId: string | null;
  token: string | null;
  tokenExpirationDate: number | null;
}

export function saveUserAuth(userAuthData: UserAuth) {
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

export function getUserAuth(): UserAuth {
  return {
    userId: localStorage.getItem("userId"),
    token: localStorage.getItem("token"),
    tokenExpirationDate: +(localStorage.getItem("tokenExpirationDate") || 0),
  };
}

export function clearUserAuth() {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpirationDate");
}
