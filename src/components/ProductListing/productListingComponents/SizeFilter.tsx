import React from 'react';
import type { SizeFilterProps } from '@/types/productListingTypes';

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
            className={`px-3 py-1 rounded-md text-sm transition ${selectedSizes.includes(size)
              ? 'bg-primary text-primary-foreground border border-primary-border'
              : 'bg-muted text-foreground border border-border hover:border-primary-border-hover hover:bg-border-hover'
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