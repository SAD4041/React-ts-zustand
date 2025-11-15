import React from 'react';

export type SortOption = 'newest' | 'most-viewed' | 'cheapest' | 'expensive' | 'best-rated';

interface SortOptionsProps {
  currentSort: SortOption | null;
  onSortChange: (sort: SortOption) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ currentSort, onSortChange }) => {
  const sorts = [
    { value: 'most-revelent', label: 'مرتبط ترین' },
    { value: 'newest', label: 'جدیدترین' },
    { value: 'most-selled', label: 'پرفروش ترین' },
    { value: 'cheapest', label: 'ارزان ترین' },
    { value: 'expensive', label: 'گران ترین' },
    { value: 'chosen', label: 'منتخب' }
  ];

  return (
    <div className="flex items-center space-x-4  text-sm mb-4">
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