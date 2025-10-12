import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import "../Profile/ProfileHeader.css";
import { Button } from "@/components/ui/button";
import { EllipsisIcon } from "@/components/ui/icons/lucide-ellipsis";
function getUserInitials(fullName: string) {
  if (!fullName) {
    return "";
  }

  const nameParts = fullName.split(" ");
  let initials = "";

  if (nameParts.length > 0) {
    initials += nameParts[0].charAt(0).toUpperCase();
  }

  if (nameParts.length > 1) {
    initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  }

  return initials;
}

const ProfileHeader = () => {
  const fullName = "Saman Khajeamiri";
  const initials = getUserInitials(fullName);
  const personalColor = "bg-blue-500 text-white"; //costumizable

  return (
    <>
    <Button variant="ghost">
        <EllipsisIcon className="absolute top-5 right-5 w-6 h-6 rotate-90"></EllipsisIcon>
    </Button>
    <div className="flex justify-center mt-2.5">
      <div className="relative">
        <Avatar className="w-24 h-24 shadow-lg">
          <AvatarImage
            alt={fullName}
            src="https://samanskh.github.io/assets/images/bio-photo.jpg"
          />
          <AvatarFallback className={`text-2xl font-semibold ${personalColor}`}>
            {initials}
          </AvatarFallback>
        </Avatar>

        <img src="/badge.png" alt="badge" className="badge badge-center"></img>
        <img src="/badge.png" alt="badge" className="badge badge-right"></img>
        <img src="/badge.png" alt="badge" className="badge badge-left"></img>

      </div>
    </div>

    
    </>
  );
};

export default ProfileHeader;
