import React from 'react';
import type { ToggleSwitchProps } from '@/types/UserDashInfoTypes';

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, label }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        onClick={onChange}
        className={`relative inline-block w-12 h-7 rounded-full cursor-pointer transition-colors duration-300 ${
          checked ? 'bg-[#00A6D4]' : 'bg-white border border-gray-300'
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
      {label && (
        <label
          onClick={onChange}
          className="cursor-pointer text-sm font-medium"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default ToggleSwitch;