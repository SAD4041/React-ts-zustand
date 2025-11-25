import React from "react";
import { ArrowLeft, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { topProfile } from "@/types/topProfile";

const TopProfile: React.FC<topProfile> = ({ onMenuClick, hideMenue }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-2  flex justify-between w-full items-center mb-4 max-w-xl">
      <button
        onClick={handleBack}
        className="text-primary w-11 h-11 border-2 border-primary rounded-xl px-2 py-2 flex items-center justify-center mr-4 hover:bg-orange-50"
      >
        <ArrowLeft className="w-full h-full text-primary" />
      </button>
      {!hideMenue && (
        <button
          onClick={onMenuClick}
          className="text-primary w-11 h-11 border-2 border-primary rounded-xl px-2 py-2 flex items-center justify-center hover:bg-orange-50"
        >
          <Menu className="w-full h-full text-primary" />
        </button>
      )}
    </div>
  );
};

export default TopProfile;
