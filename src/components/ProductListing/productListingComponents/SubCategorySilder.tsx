import React, { useRef, useState, useEffect } from 'react';
import SubCategoryCard from './SubCategoryCard';
import { subCategories } from '@/data/data';

const SubCategorySlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false); // ✅ ابتدای صفحه: نمی‌تونیم چپ بریم
  const [canScrollRight, setCanScrollRight] = useState(true); // ✅ می‌تونیم راست بریم

  useEffect(() => {
    updateScrollButtons();
  }, []);

  const updateScrollButtons = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < maxScroll - 1);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = 250;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    const maxScroll = scrollWidth - clientWidth;

    const newScroll = direction === 'left'
      ? Math.max(0, scrollLeft - scrollAmount)
      : Math.min(maxScroll, scrollLeft + scrollAmount);

    sliderRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
    setTimeout(updateScrollButtons, 300);
  };

  return (
    <div className="relative mb-6">
      <button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className={`absolute left-0 top-1/2 z-10 p-2 bg-white rounded-full shadow-md transition ${
          !canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        ref={sliderRef}
        onScroll={updateScrollButtons}
        className="flex items-start space-x-10 space-x-reverse overflow-x-auto py-3 px-6 hide-scrollbar gap-6"
      >
        {subCategories.map(cat => (
          <SubCategoryCard key={cat.id} category={cat} />
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md transition ${
          !canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default SubCategorySlider;