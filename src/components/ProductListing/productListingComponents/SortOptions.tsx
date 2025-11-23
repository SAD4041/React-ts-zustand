import React from 'react';
import sortIcon from '@/assets/Listing Icon.png'
import {sorts} from '@/data/data'
import type {SortOptionsProps , SortOption} from '@/types/productListingTypes'

const SortOptions: React.FC<SortOptionsProps> = ({ currentSort, onSortChange }) => {

  return (
    <div className="flex items-center space-x-4  text-sm mb-4">
      <img 
        src={sortIcon}
        alt="Product Picture"
        className="w-7 h-7 object-cover ml-2"
      />
      <span className="font-medium">مرتب سازی:</span>
      {sorts.map(sort => {

          const textColor = sort.value === 'chosen'
          ? 'text-[#FE621F]'
          : currentSort === sort.value
            ? 'text-[#FE621F]'
            : 'text-gray-700';
      
      return(
        <button
          key={sort.value}
          onClick={() => onSortChange(sort.value as SortOption)}
          className={`px-3 py-1 rounded-md transition ${
             currentSort === sort.value
                ? 'bg-orange-100 text-[#FE621F] border border-orange-300'
                : `${textColor} hover:bg-gray-100`
          }`}
        >
          {sort.label}
        </button>
      );
      })}
    </div>
  );
};

export default SortOptions;