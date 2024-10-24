import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "./utils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  console.log("URL: ", request.nextUrl.pathname);
  // The runWithAmplifyServerContext will run the operation below
  // in an isolated matter.
  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        // The fetch will grab the session cookies
        const session = await fetchAuthSession(contextSpec, {});
        return session.tokens !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });
  console.log(authenticated)
  // If user is authenticated then the route request will continue on
  if (authenticated) {
    return response;
  }

  // If user is not authenticated they are redirected to the /login page
  return NextResponse.redirect(new URL("/signin", request.url));
}

// This config will match all routes accept /login, /api, _next/static, /_next/image
// favicon.ico
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|signin|/code|/installHook.js.map|https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?).*)",
  ],
};
