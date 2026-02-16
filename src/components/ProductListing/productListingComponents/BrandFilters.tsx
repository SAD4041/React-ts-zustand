import React, { useState } from 'react';
import type { BrandFilterProps } from '@/types/productListingTypes';
import ExtendIcon from '../icon loader/extended';
import ShortenIcon from '../icon loader/shorten';
import FillIcon from '../icon loader/fillIcon';

const BrandFilter: React.FC<BrandFilterProps> = ({ brands, selectedBrands, onToggleBrand }) => {
  const [showAllBrands, setShowAllBrands] = useState(false);

  const visibleCount = showAllBrands ? brands.length : 5;

  return (
    <div className="mb-6">
      <h3 className="font-bold mb-3">برند ها</h3>
      <div className="space-y-2">
        {brands.slice(0, visibleCount).map(brand => (
          <label key={brand.id} className="flex items-center cursor-pointer">
            <span
              onClick={(e) => {
                e.stopPropagation();
                onToggleBrand(brand.slug);
              }}
              className={`w-4 h-4 border rounded flex items-center justify-center mr-2 transition ${selectedBrands.includes(brand.slug)
                ? 'bg-primary border-primary'
                : 'border-border hover:border-primary-border-hover'
                }`}
            >
              {selectedBrands.includes(brand.slug) && (
                <FillIcon />
              )}
            </span>
            <span className="text-sm ml-auto mr-1">{brand.name}</span>
            <span className="text-xs text-muted-foreground mr-2">{brand.slug}</span>
          </label>
        ))}
      </div>

      {brands.length > 5 && (
        <button
          type="button"
          onClick={() => setShowAllBrands(!showAllBrands)}
          className="mt-2 flex justify-center w-full text-xs text-muted-foreground hover:text-foreground transition"
        >
          {showAllBrands ? (
            <ExtendIcon />
          ) : (
            <ShortenIcon />
          )}
        </button>
      )}
    </div>
  );
};

export default BrandFilter;
