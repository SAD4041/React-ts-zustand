// src/components/Custom/ImageContainerWithShadow.tsx
import React from "react";
import { Hexagon } from "lucide-react";
import type { ImageContainerWithShadowProps } from "@/types/challengeElementsTypes";

const ImageAndBadgeContainer: React.FC<ImageContainerWithShadowProps> = ({
  imageUrl,
}) => {
  return (
    <div className="relative w-full max-w-xl mb-4">
      <img
        src={imageUrl}
        alt="Scenic Landscape"
        className="w-full h-auto rounded-[8px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      />
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
    </div>
  );
};

export default ImageAndBadgeContainer;
