// src/components/Custom/BackButton.tsx
import React from "react";
import { ArrowLeft } from "lucide-react";
import type { BackButtonProps } from "@/types/challengeElementsTypes";

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-primary w-11 h-11 border-2 border-primary rounded-[12.5px] px-2 py-2 flex items-center justify-center mr-4 hover:bg-primary-hover"
    >
      <ArrowLeft className="w-full h-full text-primary" />
    </button>
  );
};

export default BackButton;
