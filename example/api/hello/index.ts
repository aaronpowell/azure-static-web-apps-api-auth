import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  getUserInfo,
  isAuthenticated,
} from "@aaronpowell/static-web-apps-api-auth";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");

  if (!isAuthenticated(req)) {
    context.res = {
      body: "You are not logged in at the moment",
    };
  } else {
    const { clientPrincipal } = getUserInfo(req);

    context.res = {
      body: `Thanks for logging in ${
        clientPrincipal.userDetails
      }. You logged in via ${
        clientPrincipal.identityProvider
      } and have the roles ${clientPrincipal.userRoles.join(", ")}`,
    };
  }
};

export default httpTrigger;
