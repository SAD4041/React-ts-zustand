import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CustomButton from "../Custom/CustomButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const OwnerButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center gap-x-8 sm:gap-x-15 md:gap-x-26 mt-5">
      <div>
        <CustomButton backgroundColor="bg-[var(--color-blue-side)]">
          ویرایش پروفایل
        </CustomButton>
      </div>

      <div>
        <CustomButton onClick={() => setOpen(true)} backgroundColor="bg-[var(--color-blue-main)]">
          بساز+
        </CustomButton>
      </div>
      
      <Sheet open={open} onOpenChange={setOpen}>

        <SheetContent
          side="bottom"
          className="animate-slideIn shadow-xl bg-white"
        >
          <SheetHeader>
            <SheetTitle>کدوم؟</SheetTitle>
            {/* <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription> */}
          </SheetHeader>
          <div className="grid flex-1 justify-center auto-rows-min gap-6 px-1 mt-6">
                <CustomButton pageAddress="/temp" backgroundColor="bg-[var(--color-blue-main)]" >پست جدید</CustomButton>

                <CustomButton pageAddress="/temp" backgroundColor="bg-[var(--color-orange-main)]" >چالش جدید</CustomButton>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default OwnerButton;
