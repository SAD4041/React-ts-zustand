import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../ui/spinner";
import { set } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { Props } from "@/types/customButtonProp";

//onClick={() => handleClickEdit()} className={`w-40 h-8.5 rounded-[12.5px] bg-[var(--color-blue-side)] text-white font-bold ${pressedEdit ? "shadow-none translate-y-[3px]" : "shadow-[0_3px_0px_0px_rgba(0,0,0,1)]"} transition-all duration-200 border-2 border-black `


const CustomButton = ({
  children,
  pageAddress,
  className = "bg-neutral-gray w-40 sm:w-50 md:w-6",
  onClick,
  height = "h-[40px]",
  // type = "button",
  loading = false,
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
      {...props} //does the type also
      // {...(type ? { type } : {})}
      onClick={handleClick}
      className={cn(
        "bg-neutral-gray w-40 sm:w-50 md:w-60 sm:text-sm md:text-base cursor-pointer sm:h-10 rounded-xl text-white font-bold active:shadow-none active:translate-y-[3px] shadow-[0_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-25 border-2 border-black",
        className
      )}
      disabled={loading || props.disabled}
    >
      {loading && <Spinner />}
      {children}
    </Button>
  );
};

export default CustomButton;
