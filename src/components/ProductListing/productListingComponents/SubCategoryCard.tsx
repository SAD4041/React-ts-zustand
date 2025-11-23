import React from 'react';
import type { SubCategoryProps } from '@/types/productListingTypes';

const SubCategoryCard: React.FC<SubCategoryProps> = ({ category }) => {
  return (
    <div className="shrink-0 w-40 cursor-pointer group">
      <div className="relative overflow-hidden rounded-lg shadow-sm">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-45 object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 text-xs p-2 text-center truncate"> 
          {category.title}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCard;