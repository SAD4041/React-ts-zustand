import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import type { Props } from "@/types/tertiaryCustomButtonProp";

//onClick={() => handleClickEdit()} className={`w-40 h-8.5 rounded-[12.5px] bg-[var(--color-blue-side)] text-white font-bold ${pressedEdit ? "shadow-none translate-y-[3px]" : "shadow-[0_3px_0px_0px_rgba(0,0,0,1)]"} transition-all duration-200 border-2 border-black `



const TertiaryCustomButton = ({
  children,
  backgroundColor = "bg-neutral-gray",
  pageAddress,
  width = "w-40 sm:w-50 md:w-60",
  className = "",
  onClick,
  isGray = false,
  ...props
}: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setTimeout(() => {
      if (onClick) {
        onClick();
      }
      if (pageAddress) {
        navigate(pageAddress);
      }
    }, 200);
  };
  return (
    <Button
      {...props}
      onClick={handleClick}
      className={`hover:bg-white cursor-pointer rounded-[12.5px] font-bold bg-white active:shadow-none active:translate-y-[3px] ${isGray ? "shadow-[0_3px_0px_0px_theme('colors.neutral-gray.DEFAULT')] border-neutral-gray" : "shadow-[0_3px_0px_0px_theme('colors.primary.DEFAULT')] border-primary"} transition-all duration-25 border-2 ${className} `}
    >
      {children}
    </Button>
  );
};

export default TertiaryCustomButton;
