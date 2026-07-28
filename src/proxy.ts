import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);

  const { pathname } = request.nextUrl;

  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/pricing");

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup");

  if (isAuthPage && user) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  if (isPublicRoute) {
    return response;
  }

  if (!user) {
    const signinUrl = new URL("/signin", request.url);
    const redirectResponse = NextResponse.redirect(signinUrl);
    response.cookies.getAll().forEach((cookie) => {
      const { name, value, ...options } = cookie;
      redirectResponse.cookies.set(name, value, options);
    });
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/explore",
    "/explore/:path*",
    "/workspaces/:path*",
    "/billing/:path*",
    "/settings/:path*",
    "/kits/:path*",
    "/",
    "/login",
    "/signin",
    "/signup",
    "/pricing",
  ],
};
