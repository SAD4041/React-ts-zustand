import React from 'react';
import CustomButton from '@/components/Custom/CustomButton';

interface ToggleButtonsProps {
  activeTab: 'followers' | 'followings';
  onTabSwitch: (tab: 'followers' | 'followings') => void;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({ activeTab, onTabSwitch }) => {
  return (
    <div className="mb-6 flex justify-start">
      <CustomButton
        className={`px-4 py-2 h-8 ${activeTab === 'followings' ? 'bg-secondary text-white hover:bg-secondary' : 'bg-white text-secondary hover:bg-white'} rounded-r-none border-r-[0.5px] w-44 font-semibold`}
        onClick={() => onTabSwitch('followings')}
      >
        دنبال شوندگان
      </CustomButton>
      <CustomButton
        className={`px-4 py-2 h-8 ${activeTab === 'followers' ? 'bg-secondary text-white hover:bg-secondary' : 'bg-white text-secondary hover:bg-white'} rounded-l-none border-l-[0.5px] w-44 font-semibold`}
        onClick={() => onTabSwitch('followers')}
      >
        دنبال کنندگان
      </CustomButton>
    </div>
  );
};

export default ToggleButtons;
