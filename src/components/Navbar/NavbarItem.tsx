import { cn } from "@/lib/utils";
import type { NavbarItemsProps } from "@/types/navbarTypes";
import React from "react";
import { Link } from "react-router-dom";

export default function NavbarItem({
  text,
  icon,
  route,
  className,
}: NavbarItemsProps) {
  return (
    <li className={cn("h-full", className)}>
      <Link
        to={route}
        className="h-full flex items-center gap-2 text-sm hover:text-primary px-2  "
      >
        {icon}
        {text}
      </Link>
    </li>
  );
}
