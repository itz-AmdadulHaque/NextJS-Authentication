import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // public path, login user won't see the below path
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";

  // if login user try to visit the public path they will be redirected to "/"
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // if there is no token, then user need to login to access the other path (that you want to protect)
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// path where middle ware will be applied
export const config = {
  matcher: ["/", "/login", "/signup", "/verifyemail", "/profile/:path*"],
};
