import type { JSX } from "react";

export type NavbarItemsProps = {
  text: string;
  icon?: React.ReactNode;
  route: string;
  className?: string;
};

export type NavbarProps = {
  isUserLoggedin: boolean;
};

export type MobileSidebar = {
  isUserLoggedin: boolean;
  links: NavLink[];
  userOptions: NavLink[];
};

export type NavLink = {
  label: string;
  href: string;
  icon: JSX.Element;
};
