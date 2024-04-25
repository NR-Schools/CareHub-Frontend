import { CookiesSchema } from "@/schemas";
import { Package2 } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

const NavItem = () => {
  const cookieStore: unknown = cookies().get("userType");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  let link = "";
  if (validatedCookie.success) {
    const data = validatedCookie.data;
    link =
      data.value === "Customer"
        ? "/customer/dashboard?offerId=0"
        : "/care-provider/dashboard?offerId=0";
  }
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link href="/home" className="flex items-center gap-2">
        <Package2 className="h-6 w-6" color="#edf0e6" />
        <span className="text-custom-nav  font-bold">CAREHUB LOGO</span>
      </Link>
      <Link
        href="/home"
        className="  hover:text-custom-onHover text-custom-nav"
      >
        Home
      </Link>
      <Link href={link} className="hover:text-custom-onHover text-custom-nav">
        Requests
      </Link>
      <Link
        href="#contact"
        className="hover:text-custom-onHover text-custom-nav"
      >
        Contact Us
      </Link>
    </nav>
  );
};

export default NavItem;
