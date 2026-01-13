import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';

interface CustomSwitchButtonProps {
  name: string;
  labelText?: string;
  classNames?: {
    label?: string;
    switch?: string;
  };
}

const CustomSwitchButton: React.FC<CustomSwitchButtonProps> = ({
  name,
  labelText = "متن",
  classNames ={},
}) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };

  return (
    <div className="flex items-center">
      {labelText && (
        <label className={`${classNames?.label} mr-2`}>
          {labelText}
        </label> 
      )}

      <Switch
        id={name}
        checked={checked}
        onCheckedChange={handleChange}
        className={`
            ${classNames?.switch} 
            border-[2px] 
            ${checked ? 'bg-primary border-primary' : 'bg-white border-black'} 
            data-[state=checked]:bg-primary data-[state=checked]:border-primary
            data-[state=unchecked]:bg-white data-[state=unchecked]:border-black
            relative inline-flex items-center rounded-full transition-colors duration-300
            shadow-none
        `}

      >
      </Switch>
    </div>
  );
};

export default CustomSwitchButton;
