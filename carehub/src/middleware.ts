import { NextResponse, type NextRequest } from "next/server";
import {
  publicRoutes,
  authRoutes,
  protectedRoutesProvider,
  protectedRoutesCustomer,
} from "@/routes";
import { cookiesSchema } from "@/schemas";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const protectedRouteCustomer = protectedRoutesCustomer.includes(
    nextUrl.pathname
  );
  const protectedRouteProvider = protectedRoutesProvider.includes(
    nextUrl.pathname
  );
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const cookie: unknown = request.cookies.get("session");
  const validatedCookie = cookiesSchema.safeParse(cookie);
  const customer = true;

  // const authorization = cookies().get("session");
  // const respo = await fetch(`${process.env.DATABASE_URL}/user`, {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer: ${authorization?.value}`,
  //   },
  // });
  // const user = await respo.json();
  // console.log(user);
  if (!validatedCookie.success && !isAuthRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
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
  // if (isAuthRoute && validatedCookie.success) {
  //   return Response.redirect(new URL(DEFAULT_LOGIN_ROUTE_CUSTOMER, nextUrl));
  // }
  // if (isPublicRoute) {
  //   return Response.redirect(new URL(`customer/dashboard`, request.url));
  // }

  return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
