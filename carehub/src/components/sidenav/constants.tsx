interface SidenavMenu {
  title: string;
  path: string;
}

export const SIDENAV_MENU_CUSTOMER: SidenavMenu[] = [
  {
    title: "Dashboard",
    path: "/customer/dashboard",
  },
  {
    title: "Request",
    path: "/customer/request",
  },
  {
    title: "Offers",
    path: "/customer/offer",
  },
  {
    title: "Settings",
    path: "/customer/user-settings",
  },
];
export const SIDENAV_MENU_PROVIDER: SidenavMenu[] = [
  {
    title: "Dashboard",
    path: "/care-provider/dashboard",
  },
  {
    title: "Offers",
    path: "/care-provider/offer",
  },
  {
    title: "Request",
    path: "/care-provider/request",
  },
  {
    title: "Settings",
    path: "/care-provider/user-settings",
  },
];
