interface authToken {
  token: {
    accessToken: string;
    identityToken: string;
    refreshToken: string;
  };
}
export const setAuthenticationToken = async ({ token }: authToken) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("access_token", token.accessToken);
    sessionStorage.setItem("identity_token", token.identityToken);
    sessionStorage.setItem("refresh_token", token.refreshToken);
  }
};

export const getAuthenticationToken = () => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("access_token");
    return token;
  }
};

export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("refresh_token");
    return token;
  }
};

export const removeAuthenticationToken = async () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("identity_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.clear();
  }
};
