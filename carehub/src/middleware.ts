import { NextResponse, type NextRequest } from "next/server";
import { publicRoutes, authRoutes, protectedRoutes } from "@/routes";
import { cookiesSchema } from "@/schemas";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // const protectedRoute = protectedRoutes.includes(nextUrl.pathname);
  // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const cookie: unknown = request.cookies.get("session");
  const validatedCookie = cookiesSchema.safeParse(cookie);
  const customer = false;

  if (!validatedCookie.success && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }
  if (validatedCookie.success && request.nextUrl.pathname.startsWith("/api")) {
    return;
  }
  if (
    validatedCookie.success &&
    !request.nextUrl.pathname.startsWith("/customer") &&
    customer
  ) {
    return NextResponse.redirect(new URL("/customer/dashboard", request.url));
  }
  if (
    validatedCookie.success &&
    !request.nextUrl.pathname.startsWith("/care-provider") &&
    !customer
  ) {
    return NextResponse.redirect(
      new URL("/care-provider/dashboard", request.url)
    );
  }

  return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
