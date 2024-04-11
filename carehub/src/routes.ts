export const publicRoutes = ["/"];

export const authRoutes = ["/auth/login", "/auth/register"];

export const DEFAULT_LOGIN_ROUTE_PROVIDER = "/care-provider/dashboard";
export const DEFAULT_LOGIN_ROUTE_CUSTOMER = "/customer/dashboard";

export const protectedRoutesProvider = [
  "/care-provider/dashboard",
  "/care-provider/offer",
  "/care-provider/request",
  "/care-provider/user-settings",
];
export const protectedRoutesCustomer = [
  "/customer/dashboard",
  "/customer/request",
  "/customer/offer",
  "/customer/user-settings",
];
