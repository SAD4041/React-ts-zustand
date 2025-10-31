import {
  CircleAlert,
  HandHeart,
  Heart,
  Home,
  LogOut,
  Menu,
  NotebookPen,
  PawPrint,
  Scale,
  Undo2,
} from "lucide-react";
import React, { useState, type JSX } from "react";
import navbarImage from "@/assets/images/mobile-navbar-background.png";
import navbarLoginImage from "@/assets/images/mobile-navbar-background-login.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import sadraUrl from "@/assets/about_us/teamMember/sadra.webp";
import NavbarItem from "@/components/Navbar/NavbarItem";
import logoImage from "@/assets/images/Logo.svg";
import { Link } from "react-router-dom";
import type { MobileSidebar } from "@/types/navbarTypes";

export default function MobileSidebar({
  isUserLoggedin,
  links,
  userOptions,
}: MobileSidebar) {
  const [open, setOpen] = useState(false);
  return (
    <section className=" flex lg:hidden">
      <Menu className="size-7 ml-4" onClick={() => setOpen((prev) => !prev)} />
      <div>
        <div
          className={
            open
              ? "-translate-x-[0%] duration-500 absolute right-0 top-0 w-[60%] md:w-[40%] h-screen bg-white z-40 flex  justify-evenly items-start "
              : " translate-x-[100%] duration-500 absolute right-0 top-0 w-[60%] md:w-[40%] h-screen bg-white z-40 flex  justify-evenly items-start "
          }
        >
          <div
            className="absolute top-0 right-0 px-6 py-6 z-50"
            onClick={() => setOpen(false)} // change isNavOpen state to false to close the menu
          >
            <Undo2
              className="size-6 rotate-y-180"
              color="white"
              strokeWidth={2}
            />
          </div>
          <div className=" flex flex-col w-full">
            {isUserLoggedin ? (
              <div className="h-fit w-full flex flex-col items-center relative">
                {/* Top background image */}
                <img src={navbarLoginImage} alt="" />

                {/* Avatar block */}
                <div className=" mt-[-20%] flex flex-col items-center">
                  <Link to={""}>
                    <Avatar className="w-20 h-20 cursor-pointer">
                      <AvatarImage
                        src={sadraUrl}
                        className="object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <AvatarFallback>Mohammad Amin Bahari</AvatarFallback>
                    </Avatar>
                  </Link>

                  <div className="font-bold text-sm md:text-base mt-2">
                    Mohammad Amin Bahari
                  </div>
                  <div className="font-light text-xs">
                    bahariamin.1384@gmail.com
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full w-full ">
                <img src={navbarImage} alt="" />
              </div>
            )}

            <div className="flex flex-col w-full h-full items-center">
              <div className="h-auto flex flex-colg justify-start w-[80%] py-5">
                <ul>
                  {isUserLoggedin &&
                    userOptions.map((item) => (
                      <NavbarItem
                        icon={item.icon}
                        route={item.href}
                        className="w-fit h-10 rounded-lg"
                        text={item.label}
                      />
                    ))}

                  {links.map((item) => (
                    <NavbarItem
                      icon={item.icon}
                      route={item.href}
                      className="w-fit h-10 rounded-lg"
                      text={item.label}
                    />
                  ))}
                  {isUserLoggedin && (
                    <NavbarItem
                      route=""
                      icon={<LogOut className="h-5"></LogOut>}
                      className="w-fit h-10 rounded-lg"
                      text="خروج از حساب کاربری"
                    />
                  )}
                </ul>
              </div>
              <div className="flex justify-between w-[80%] mt-4 bottom-6 absolute border-t-1 pt-4">
                <img src={logoImage} alt="" className="h-8" />
                <p>نسخه ۱.۰.۰</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            open
              ? "w-screen absolute top-0 left-0 h-screen bg-black opacity-50 overscroll-none touch-none z-30 transition-opacity duration-500"
              : "w-screen absolute top-0 left-0 h-screen bg-black opacity-0 overscroll-none touch-none z-30 transition-opacity duration-500 pointer-events-none"
          }
          onClick={() => {
            setOpen(false);
          }}
        ></div>
      </div>
    </section>
  );
}
