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
          side="right"
          className="animate-slideIn shadow-xl bg-white"
        >
          <SheetHeader>
            <SheetTitle>تنظیمات</SheetTitle>
            {/* <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription> */}
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-1 mt-6">

                <CustomButton pageAddress="/temp" backgroundColor="bg-[var(--color-gray-main)]" >شخصی‌سازی</CustomButton>

                <CustomButton pageAddress="/temp" backgroundColor="bg-[var(--color-gray-main)]" >ذخیره شده‌ها</CustomButton>

            <div className="border-t"></div>
              
                <CustomButton pageAddress="/temp" backgroundColor="bg-[var(--color-red-main)]" >خروج از حساب</CustomButton>

                <CustomButton pageAddress="/temp" backgroundColor="bg-[var(--color-red-main)]" >حذف حساب کاربری</CustomButton>

          </div>
          {/* <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter> */}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProfileSideSheet;
