import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronDown, CircleUser, Heart, LogOut, PawPrint } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,

  DropdownMenuTrigger,
} from "@/components/Custom/Dropdonw-Menu/DropdownMenu";

export default function NavbarProfile() {
  const userImage = "";
  return (
    <div className="h-full flex items-center gap-0.5 text-right lg:ml-7">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="h-full flex gap-0.5 items-center cursor-pointer">
            <Avatar className="h-full">
              <AvatarImage
                className="h-full"
                src={userImage}
                loading="lazy"
                decoding="async"
              />
              <AvatarFallback>
                <CircleUser
                  className="h-full w-full"
                  strokeWidth={1.5}
                ></CircleUser>
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="" size={15} strokeWidth={4} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 mt-3 rtl "
          align="start"
          sideOffset={8}
        >
          <DropdownMenuLabel className="mt-2">
            محمد امین بهاری
          </DropdownMenuLabel>
          <DropdownMenuLabel className="text-xs font-light">
            bahariamin.1384@gmail.com
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <PawPrint />
              داشبورد پت‌یار
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Heart />
              داشبورد صاحب پت
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              خروج از حساب
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
