import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import tokenService from "./lib/token";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await tokenService.getToken(request, "refresh");
  if (token && request.nextUrl.pathname !== "/login") {
    const refresh_token_isValid = await tokenService.isValid(token);
    if (!refresh_token_isValid) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  const res = NextResponse.next();
  return res;
}
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)", "/login"],
};
