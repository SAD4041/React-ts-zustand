import { Button } from "@/components/ui/button";
import React from "react";
interface Props {
  isFollowing?: boolean;
}
const ViewButton = ({ isFollowing = false }: Props) => {
  return (
    <div className="flex justify-center mt-5">
      {isFollowing ? (
        <Button className="w-60 h-8.5 rounded-[12.5px] bg-[var(--color-red-main)] text-white font-bold shadow-[0_5px_0px_0px_rgba(0,0,0,1)] border-2 border-black ">
          لغو دنبال
        </Button>
      ) : (
        <Button className="w-60 h-8.5 rounded-[12.5px] bg-[var(--color-blue-main)] text-white font-bold shadow-[0_5px_0px_0px_rgba(0,0,0,1)] border-2 border-black ">
          بزن دنبالش
        </Button>
      )}
    </div>
  );
};

export default ViewButton;
