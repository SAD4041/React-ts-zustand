import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import userIcon from "@/assets/Img/Icon/userIcon.svg";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, src, ...props }, ref) => {
  const [imgSrc, setImgSrc] = React.useState(src || userIcon);
  const [isDefaultIcon, setIsDefaultIcon] = React.useState(!src); // true if no src provided

  React.useEffect(() => {
    setImgSrc(src || userIcon);
    setIsDefaultIcon(!src); // Update when src changes
  }, [src]);

  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn(
        "aspect-square h-full w-full",
        isDefaultIcon && "object-contain scale-75",
        className
      )}
      src={imgSrc}
      onLoadingStatusChange={(status) => {
        if (status === "error") {
          setImgSrc(userIcon);
          setIsDefaultIcon(true); // Mark as default icon on error
        }
      }}
      {...props}
    />
  );
});

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
