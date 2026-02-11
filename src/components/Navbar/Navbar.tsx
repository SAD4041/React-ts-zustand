import {
  CircleAlert,
  HandHeart,
  Heart,
  Home,
  LogOut,
  NotebookPen,
  PawPrint,
  Scale,
} from "lucide-react";
import NavbarItem from "./NavbarItem";
import { Button } from "../Custom/Button/Button";
import { useMobile } from "@/hooks/ResponsiveHooks";

import logoImage from "@/assets/images/Logo.svg";
import NavbarProfileDropdonwMenu from "./NavbarProfile";
import MobileSidebar from "../Custom/MobileSidebar/MobileSidebar";
import { Link } from "react-router-dom";
import type { NavbarProps } from "@/types/navbarTypes";

const MOBILE_NAV_LINKS = [
  {
    label: "خانه",
    href: "/landing",
    icon: <Home className="h-5" />,
  },
  {
    label: "رزرو",
    href: "#services",
    icon: <HandHeart className="h-5" />,
  },
  {
    label: "بلاگ",
    href: "#blog",
    icon: <NotebookPen className="h-5" />,
  },
  {
    label: "درباره ما",
    href: "/AboutUs",
    icon: <CircleAlert className="h-5" />,
  },
  {
    label: "قوانین و مقررات",
    href: "",
    icon: <Scale className="h-5" />,
  },
];

const DESKTOP_NAV_LINKS = [
  {
    label: "خانه",
    href: "/landing",
    icon: <Home className="h-5" />,
  },
  {
    label: "رزرو",
    href: "#services",
    icon: <HandHeart className="h-5" />,
  },
  {
    label: "بلاگ",
    href: "#blog",
    icon: <NotebookPen className="h-5" />,
  },
  {
    label: "درباره ما",
    href: "/AboutUs",
    icon: <CircleAlert className="h-5" />,
  },
];

const USER_OPTIONS = [
  {
    label: "داشبورد پت‌یار",
    href: "",
    icon: <PawPrint className="h-5" />,
  },
  {
    label: "داشبورد صاحب پت",
    href: "",
    icon: <Heart className="h-5" />,
  },
];

export default function Navbar({ isUserLoggedin }: NavbarProps) {
  const isMobile = useMobile();
  return (
    <nav
      dir="rtl"
      className="z-20 flex justify-between bg-white h-13 items-center px-10 lg:px-20 font-[Alibaba] shadow-lg w-screen fixed"
    >
      <div className="flex h-full items-center ">
        {isMobile ? (
          <MobileSidebar
            isUserLoggedin={true}
            links={MOBILE_NAV_LINKS}
            userOptions={USER_OPTIONS}
          />
        ) : (
          <Link to={"/landing"} className="h-[70%]">
            <img src={logoImage} alt="petyar logo" className="h-full" />
          </Link>
        )}

        {!isMobile && (
          <ul className="mr-5 flex h-full items-center">
            {DESKTOP_NAV_LINKS.map((item) => (
              <NavbarItem
                icon={item.icon}
                route={item.href}
                text={item.label}
              />
            ))}
          </ul>
        )}
      </div>
      {isUserLoggedin ? (
        <div className="flex h-[70%] items-center">
          {isMobile ? (
            <img src={logoImage} alt="" className="h-full" />
          ) : (
            <NavbarProfileDropdonwMenu />
          )}
        </div>
      ) : (
        <div className="flex h-full items-center">
          <Button className="rounded-xl h-[70%] flex items-center gap-1 ">
            <LogOut strokeWidth={3} />
            <span className="font-bold text-sm w-fit">ورود</span>
            <div className="bg-white w-0.5 h-full rounded-4xl"></div>
            <span className="font-bold text-sm">ثبت نام</span>
          </Button>
        </div>
      )}
    </nav>
  );
}
