import { Button } from "@/components/ui/button";
import React from "react";
import CustomButton from "../Custom/CustomButton";
interface Props {
  isFollowing?: boolean;
}
const ViewButton = ({ isFollowing = false }: Props) => {
  return (
    <div className="flex justify-center mt-5">
      {isFollowing ? (
        <CustomButton backgroundColor="bg-[var(--color-red-main)]" width="w-60">
          لغو دنبال
        </CustomButton>
      ) : (
        <CustomButton backgroundColor="bg-[var(--color-blue-main)]" width="w-60">
          بزن دنبالش
        </CustomButton>
      )}
    </div>
  );
};

export default ViewButton;
