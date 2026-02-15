// components/ChallengeManagement/ChallengeImage.tsx
import React from "react";
import { Hexagon } from "lucide-react";
import CustomButton from "@/components/Custom/CustomButton";
import type { ChallengeImageProps } from "@/types/challengeElementsTypes";

const ImageAndBadgeContainerEdit: React.FC<ChallengeImageProps> = ({
  imageUrl,
  onImageChange,
}) => {
  return (
    <div className="relative w-full max-w-xl mb-4 mt-4">
      {/* Image with blur effect */}
      <img
        src={imageUrl}
        alt="Scenic Landscape"
        className="w-full h-auto rounded-[8px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] filter blur-xs"
      />

      {/* Badge container */}
      <div className="absolute h-11 bottom-[-10px] right-[-0px] bg-secondary border-1 border-black p-1 rounded-[8px] flex space-x-2 items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <button className="w-10 h-10 flex items-center justify-center bg-secondary p-1 rounded-full">
          <Hexagon className="w-full h-full text-gold-badge" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-secondary p-1 rounded-full">
          <Hexagon className="w-full h-full text-bronze-badge" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-secondary p-1 rounded-full">
          <Hexagon className="w-full h-full text-silver-badge" />
        </button>
      </div>

      {/* Custom button in the center to change the image */}
      <div className="absolute inset-0 flex justify-center items-center">
        <CustomButton
          className="bg-secondary text-white hover:bg-secondary px-6 py-2 rounded-primary-radius shadow-md"
          onClick={() => document.getElementById("imageUploadInput")?.click()}
        >
          تغییر تصویر
        </CustomButton>
        <input
          id="imageUploadInput"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onImageChange}
        />
      </div>
    </div>
  );
};

export default ImageAndBadgeContainerEdit;
