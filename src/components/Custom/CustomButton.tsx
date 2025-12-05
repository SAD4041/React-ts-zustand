import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";
import { cn } from "@/lib/utils";
import type { Props } from "@/types/customButtonProps";

const CustomButton = ({
  children,
  pageAddress,
  className = "",
  onClick,
  height = "h-[40px]",
  width = "w-40", 
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
      variant="ghost"
      size={null}
      {...props}
      onClick={handleClick}
      className={cn(
        "bg-white hover:bg-gray-300 cursor-pointer rounded-xl shadow transition-all border border-gray-300 text-[20px]",
        height, 
        width,
        'mx-auto',
        className
      )}
      disabled={loading || props.disabled}
    >
      {loading && <LoadingSpinner />}
      {children}
    </Button>
  );
};

export default CustomButton;