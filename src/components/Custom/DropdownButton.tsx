import React, { use } from "react";
import { Button } from "../ui/button";

const DropdownButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button> & {
    backgroundColor?: string;
    width?: string;
  }
>(({ children, backgroundColor, width = "w-40", className, ...props }, ref) => {

  return (
    <Button
      ref={ref}
      {...props} 
      className={`${width} hover:${backgroundColor} cursor-pointer h-8.5 rounded-[12.5px] text-white font-bold ${backgroundColor} shadow-[0_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-25 border-2 border-black ${className}`}
    >
      {children}
    </Button>
  );
});

DropdownButton.displayName = "DropdownButton";

export default DropdownButton;
