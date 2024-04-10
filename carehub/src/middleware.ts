import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOGIN_ROUTE, publicRoutes, authRoutes } from "@/routes";
import * as z from "zod";
import { cookiesSchema } from "@/schemas";

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const cookie: unknown = request.cookies.get("session");
  const validatedCookie = cookiesSchema.safeParse(cookie);

  if (isAuthRoute && validatedCookie.success) {
    const { name, value } = validatedCookie.data;
    return Response.redirect(new URL(DEFAULT_LOGIN_ROUTE, nextUrl));
  }
  if (!validatedCookie.success && !isAuthRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
