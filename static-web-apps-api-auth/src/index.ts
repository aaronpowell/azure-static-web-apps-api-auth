import { HttpRequest } from "@azure/functions";

export type AuthProviders =
  | "aad"
  | "facebook"
  | "github"
  | "google"
  | "twitter";

export type UserInfo = {
  identityProvider: undefined | AuthProviders;
  userId: string | undefined;
  userDetails: string | undefined;
  userRoles: string[];
};

const getUserInfo = (req: HttpRequest): UserInfo | null => {
  const header = req.headers["x-ms-client-principal"];
  if (!header) {
    return null;
  }
  const encoded = Buffer.from(header, "base64");
  const decoded = encoded.toString("ascii");

  return JSON.parse(decoded);
};

const isAuthenticated = (req: HttpRequest): boolean => {
  const userInfo = getUserInfo(req);
  return userInfo !== null;
};

export { getUserInfo, isAuthenticated };
