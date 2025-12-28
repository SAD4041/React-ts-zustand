import React from 'react';
import sortIcon from '@/assets/Listing Icon.png';
import { sorts } from '@/data/productListingData';
import type { SortOptionsProps, SortOption } from '@/types/productListingTypes';

const SortOptions: React.FC<SortOptionsProps> = ({ currentSort, onSortChange }) => {
  return (
    <div className="flex items-center space-x-4 text-sm mb-4">
      <img
        src={sortIcon}
        alt="آیکون مرتب‌سازی"
        className="w-7 h-7 object-cover ml-2"
      />
      <span className="font-medium">مرتب سازی:</span>
      {sorts.map(sort => {
        const isActive = currentSort === sort.value;
        const isChosenLabel = sort.label === "منتخب";

        return (
          <button
            key={sort.value}
            onClick={() => onSortChange(sort.value as SortOption)}
            className={`
              px-3 py-1 rounded-md transition-colors
              ${isActive
                ? 'bg-primary text-white'
                : isChosenLabel
                  ? 'text-primary bg-transparent'
                  : 'text-muted-foreground hover:text-primary bg-transparent'
              }
            `}
          >
            {sort.label}
          </button>
        );
      })}
    </div>
  );
};

export default SortOptions;