import React from 'react';
import { toPersianDigits } from '@/utils/PersianDigits';
import type { PaginationProps } from '@/types/productListingTypes';

const Pagination: React.FC<PaginationProps> = ({ 
  currentGroup, 
  totalGroups, 
  onGroupChange,
  pagesPerGroup 
}) => {
  if (totalGroups <= 1) return null;

  const groupStarts = Array.from({ length: totalGroups }, (_, i) => i * pagesPerGroup + 1);

  if (totalGroups <= 5) {
    return (
      <div className="flex justify-center items-center space-x-1 space-x-reverse mt-6">
        {groupStarts.map((startPage, i) => (
          <button
            key={startPage}
            onClick={() => onGroupChange(i + 1)}
            className={`w-10 h-10 rounded-full transition cursor-pointer ${
<<<<<<< HEAD
              i + 1 === currentGroup ? 'bg-gray-800 text-white' : 'text-gray-700 hover:bg-gray-100'
=======
              i + 1 === currentGroup 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground hover:bg-muted'
>>>>>>> origin/develop
            }`}
          >
            {toPersianDigits(startPage)}
          </button>
        ))}
      </div>
    );
  }

  const items: (number | 'dots')[] = [];
<<<<<<< HEAD


=======
>>>>>>> origin/develop
  items.push(groupStarts[0]);

  if (currentGroup > 2) {
    items.push('dots');
    items.push(groupStarts[currentGroup - 2]);
  }

  if (currentGroup !== 1) {
    items.push(groupStarts[currentGroup - 1]);
  }

  if (currentGroup < totalGroups) {
    items.push(groupStarts[currentGroup]);
  }

<<<<<<< HEAD

=======
>>>>>>> origin/develop
  if (currentGroup < totalGroups - 1) {
    items.push('dots');
    items.push(groupStarts[totalGroups - 1]);
  }

<<<<<<< HEAD

=======
>>>>>>> origin/develop
  const cleaned = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i] === 'dots' && cleaned.length > 0 && cleaned[cleaned.length - 1] === 'dots') {
      continue;
    }
    if (typeof items[i] === 'number') {
      if (cleaned.length === 0 || cleaned[cleaned.length - 1] !== items[i]) {
        cleaned.push(items[i]);
      }
    } else {
      cleaned.push(items[i]);
    }
  }

  return (
    <div className="flex justify-center items-center space-x-1 space-x-reverse mt-6">
      {cleaned.map((item, index) => {
        if (typeof item === 'number') {
          const groupNumber = Math.ceil(item / pagesPerGroup);
          const isCurrent = groupNumber === currentGroup;
          return (
            <button
              key={item}
              onClick={() => onGroupChange(groupNumber)}
              className={`w-10 h-10 rounded-full transition cursor-pointer ${
<<<<<<< HEAD
                isCurrent ? 'bg-gray-800 text-white' : 'text-gray-700 hover:bg-gray-100'
=======
                isCurrent 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-foreground hover:bg-muted'
>>>>>>> origin/develop
              }`}
            >
              {toPersianDigits(item)}
            </button>
          );
        }
<<<<<<< HEAD
        return <span key={`dots-${index}`} className="px-2 text-gray-500">...</span>;
=======
        return <span key={`dots-${index}`} className="px-2 text-muted-foreground">...</span>;
>>>>>>> origin/develop
      })}
    </div>
  );
};

export default Pagination;