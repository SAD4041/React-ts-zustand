import React from "react";
import { Button } from "../ui/button";
import { EllipsisIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import CustomButton from "../Custom/CustomButton";

const ProfileSideSheet = () => {
  return (
    <div className="relative w-full h-12">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="absolute top-5 right-2"
            variant="ghost"
            onClick={() => console.log("open settings")}
          >
            <EllipsisIcon
              className="rotate-90"
              style={{ width: "1.5rem", height: "1.5rem" }}
            ></EllipsisIcon>
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className="w-[300px] sm:w-[350px] md:w-[400px]"
        >
          <SheetHeader className="flex flex-col items-center justify-center">
            <SheetTitle>تنظیمات</SheetTitle>
            {/* <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription> */}
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-1 mt-6 justify-center">
            <CustomButton
              pageAddress="/temp"
              backgroundColor="bg-gray-500 hover:bg-gray-500"
            >
              شخصی‌سازی
            </CustomButton>

            <CustomButton
              pageAddress="/temp"
              backgroundColor="bg-gray-500 hover:bg-gray-500"
            >
              ذخیره شده‌ها
            </CustomButton>

            <div className="border-t"></div>

            <CustomButton
              pageAddress="/temp"
              backgroundColor="bg-red-500 hover:bg-red-500"
            >
              خروج از حساب
            </CustomButton>

            <CustomButton
              pageAddress="/temp"
              backgroundColor="bg-red-500 hover:bg-red-500"
            >
              حذف حساب کاربری
            </CustomButton>
          </div>
          {/* <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter> */}
          {/* <SheetClose className="absolute bottom-3 left-1/2 -translate-x-1/2 text-gray-500 hover:text-gray-800">
            <div className="w-10 h-1 bg-gray-400 rounded-full"></div>
          </SheetClose> */}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProfileSideSheet;
