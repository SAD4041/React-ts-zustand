import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pagesPerGroup = 5; 
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const totalGroups = Math.ceil(totalPages / pagesPerGroup);

  const currentGroupStart = (currentGroup - 1) * pagesPerGroup + 1;
  const prevGroupStart = currentGroupStart - pagesPerGroup;
  const nextGroupStart = currentGroupStart + pagesPerGroup;

  const isFirstPageInCurrentGroup = currentGroupStart === 1;
  
  const isLastPageInCurrentGroup = currentGroupStart + pagesPerGroup - 1 >= totalPages;


  const isPrevGroupIncludesFirst = prevGroupStart === 1;
  const isNextGroupIncludesLast = nextGroupStart + pagesPerGroup - 1 >= totalPages;

  const currentGroupPages = [];
  for (let i = currentGroupStart; i <= Math.min(currentGroupStart + pagesPerGroup - 1, totalPages); i++) {
    currentGroupPages.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-1 space-x-reverse mt-6">

      {!isFirstPageInCurrentGroup && !isPrevGroupIncludesFirst && (
        <button
          onClick={() => onPageChange(1)}
          className="w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 transition cursor-pointer"
        >
          1
        </button>
      )}


      {currentGroup > 1 && !isFirstPageInCurrentGroup && !isPrevGroupIncludesFirst && (
        <span className="px-2">...</span>
      )}


      {prevGroupStart >= 1 && (
        <button
          onClick={() => onPageChange(prevGroupStart)}
          className="w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 transition cursor-pointer"
        >
          {prevGroupStart}
        </button>
      )}

      {currentGroupPages.map(page => {
        const isGroupStart = page === currentGroupStart;
        const isCurrentPage = currentPage === page;

        if (isGroupStart) {
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-full transition cursor-pointer ${
                isCurrentPage || (currentPage >= currentGroupStart && currentPage < currentGroupStart + pagesPerGroup)
                  ? 'bg-gray-300 text-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          );
        } else {
          return (
            <span
              key={page}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 bg-gray-100"
            >
              {page}
            </span>
          );
        }
      })}


      {nextGroupStart <= totalPages && (
        <button
          onClick={() => onPageChange(nextGroupStart)}
          className="w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 transition cursor-pointer"
        >
          {nextGroupStart}
        </button>
      )}

      {currentGroup < totalGroups && !isLastPageInCurrentGroup && !isNextGroupIncludesLast && (
        <span className="px-2">...</span>
      )}

      {!isLastPageInCurrentGroup && !isNextGroupIncludesLast && totalPages > 1 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 transition cursor-pointer"
        >
          {totalPages}
        </button>
      )}
    </div>
  );
};

export default Pagination;