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

const getUserInfo = (req: HttpRequest): { clientPrincipal: UserInfo } => {
  const header = req.headers["x-ms-client-principal"];
  const encoded = Buffer.from(header, "base64");
  const decoded = encoded.toString("ascii");

  return JSON.parse(decoded);
};

const isAuthenticated = (req: HttpRequest): boolean => {
  const userInfo = getUserInfo(req);
  return !!userInfo.clientPrincipal;
};

export { getUserInfo, isAuthenticated };
