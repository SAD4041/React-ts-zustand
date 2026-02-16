import React from 'react';
import { Link } from 'react-router-dom';
import type { SubCategoryProps } from '@/types/productListingTypes';
import { categoryLabels } from '@/data/productListingData';

const SubCategoryCard: React.FC<SubCategoryProps> = ({ category }) => {
  const categoryTitle = categoryLabels[category.category] || category.category;

  return (
    <Link
      to={`/product-list?category=${encodeURIComponent(category.category)}&subcategory=${encodeURIComponent(category.slug)}`}
      className="shrink-0 w-80 cursor-pointer group sm:w-52 md:w-48 lg:w-44 xl:w-40"
    >
      <div className="relative overflow-hidden rounded-lg shadow-sm border border-border">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-45 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-background bg-opacity-90 text-foreground text-xs p-2 text-center truncate">
          {category.title}
        </div>
      </div>
    </Link>
  );
};

export default SubCategoryCard;
