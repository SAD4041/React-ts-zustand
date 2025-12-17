import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonWithUsernameProps {
  username: string;
  onBackClick: () => void;
}

const BackButtonWithUsername: React.FC<BackButtonWithUsernameProps> = ({ username, onBackClick }) => {
  return (
    <div className="flex justify-start items-center mb-10 w-full">
      <button 
        className="text-primary w-13 h-13 border-2 border-primary rounded-[12.5px] px-2 py-2 flex items-center justify-center mr-4 hover:bg-orange-50"
        onClick={onBackClick}
      >
        <ArrowLeft className="w-6 h-6 text-primary" />
      </button>

      <h2 className="font-bold text-xl mt-2">{username}</h2>
    </div>
  );
};

export default BackButtonWithUsername;
