import React from 'react';
import type { ColorOption } from '@/types/productListingTypes';

interface ColorFilterProps {
  colors: ColorOption[];
  selectedColors: string[];
  onToggleColor: (code: string) => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({ colors, selectedColors, onToggleColor }) => {
  return (
    <div className="mb-6">
      <h3 className="font-bold mb-3">رنگ ها</h3>
      <div className="flex flex-wrap gap-2">
        {colors.map(color => (
          <button
            key={color.code}
            type="button"
            onClick={() => onToggleColor(color.code)}
            className={`w-6 h-6 rounded-full border-2 transition ${
              selectedColors.includes(color.code)
                ? 'border-gray-300 ring-1 ring-offset-1 ring-[#FE621F]'
                : 'border-gray-300 hover:border-[#FE621F]'
            }`}
            style={{ backgroundColor: color.code }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;