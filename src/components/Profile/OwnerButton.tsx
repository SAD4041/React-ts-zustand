import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CustomButton from "../Custom/CustomButton";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useNavigate } from "react-router-dom";

const OwnerButton = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/editprofile");
  };

  return (
    <div className="flex justify-center gap-xa-8 sm:gap-x-15 md:gap-x-26 mt-5">
      <div>
        <CustomButton
          className="bg-secondary hover:bg-secondary"
          onClick={handleEditProfile}
        >
          ویرایش پروفایل
        </CustomButton>
      </div>

      <div>
        <CustomButton
          onClick={() => setOpen(true)}
          className="bg-primary hover:bg-primary"
        >
          بساز+
        </CustomButton>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="animate-slideIn shadow-xl bg-white [&>button]:hidden rounded-t-2xl w-full sm:w-1/2 md:w-1/2 mx-auto"
        >
          <SheetClose asChild>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gray-400 rounded-full cursor-pointer hover:bg-gray-500"></div>
          </SheetClose>
          <SheetHeader className="flex flex-col items-center justify-center">
            <SheetTitle>کدوم؟</SheetTitle>
            {/* <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription> */}
          </SheetHeader>
          <div className="grid flex-1 justify-center auto-rows-min gap-6 px-1 mt-6 ">
            <CustomButton
              pageAddress="/create-post"
              className="bg-primary hover:bg-primary"
            >
              پست جدید
            </CustomButton>

            <CustomButton
              pageAddress="/temp"
              className="bg-secondary hover:bg-secondary"
            >
              چالش جدید
            </CustomButton>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default OwnerButton;
