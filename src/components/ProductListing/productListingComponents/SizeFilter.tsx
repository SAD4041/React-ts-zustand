// src/components/SizeFilter.tsx
import React from 'react';

interface SizeFilterProps {
  sizes: string[];
  selectedSizes: string[];
  onToggleSize: (size: string) => void;
}

const SizeFilter: React.FC<SizeFilterProps> = ({ sizes, selectedSizes, onToggleSize }) => {
  return (
    <div className="mb-6">
      <h3 className="font-bold mb-3">سایز ها</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map(size => (
          <button
            key={size}
            type="button"
            onClick={() => onToggleSize(size)}
            className={`px-3 py-1 rounded-md text-sm transition ${
              selectedSizes.includes(size)
                ? 'bg-[#FE621F] text-white border border-orange-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeFilter;