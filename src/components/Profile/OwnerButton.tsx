import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CustomButton from "../Custom/CustomButton";

const OwnerButton = () => {

  return (
    <div className="flex justify-around mr-5 ml-5 mt-5">
      <div>
        <CustomButton backgroundColor="bg-[var(--color-blue-side)]">ویرایش پروفایل</CustomButton>
      </div>
      <div>
        <CustomButton backgroundColor="bg-[var(--color-blue-main)]">بساز+</CustomButton>
      </div>
    </div>
  );
};

export default OwnerButton;
