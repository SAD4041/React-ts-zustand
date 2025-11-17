import React from "react";
import { ArrowLeft, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { BackButtonAndMenuProps } from "@/types/challengeElementsTypes";


const BackButtonAndMenu: React.FC<BackButtonAndMenuProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-between w-full items-center mb-4 max-w-xl">
      <button
        onClick={handleBack}
        className="text-primary w-11 h-11 border-2 border-primary rounded-[12.5px] px-2 py-2 flex items-center justify-center mr-4 hover:bg-orange-50"
      >
        <ArrowLeft className="w-full h-full text-primary" />
      </button>
      <button
        onClick={onMenuClick}
        className="text-primary w-11 h-11 border-2 border-primary rounded-secondary-radius px-2 py-2 flex items-center justify-center hover:bg-primary-hover"
      >
        <Menu className="w-full h-full text-primary" />
      </button>
    </div>
  );
};

export default BackButtonAndMenu;
