import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const { supabase, response } = await updateSession(request);
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/pricing");

  if (isPublicRoute) {
    return response;
  }

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    const redirectResponse = NextResponse.redirect(loginUrl);
    response.cookies.getAll().forEach(({ name, value }) => {
      redirectResponse.cookies.set(name, value);
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
    "/signup",
    "/pricing",
  ],
};
