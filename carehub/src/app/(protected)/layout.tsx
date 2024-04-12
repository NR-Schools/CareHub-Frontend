import SideNav from "@/components/sidenav/side-nav";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-screen grid-cols-2 w-full  md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="bg-[#A1A4E3] flex-1 place-content-center ">
        <SideNav />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
