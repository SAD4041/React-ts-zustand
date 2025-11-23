import React from 'react';
import { brands, sizes, colors } from '@/data/data';
import type { FilterSidebarProps } from '@/types/productListingTypes';
import BrandFilter from './BrandFilters';
import SizeFilter from './SizeFilter';
import ColorFilter from './ColorFilter';
import PriceRangeFilter from './PriceRange';


const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedBrands,
  selectedSizes,
  selectedColors,
  priceRange,
  globalMaxPrice,
  onBrandToggle,
  onSizeToggle,
  onColorToggle,
  onPriceChange,
  onClearFilters,
}) => {
  return (
    <aside className="w-64 bg-gray-50 p-3 rounded-lg shadow-sm">

      <BrandFilter
        brands={brands}
        selectedBrands={selectedBrands}
        onToggleBrand={onBrandToggle}
      />
      <hr className="my-1.5 border-gray-200" />

      <SizeFilter
        selectedSizes={selectedSizes}
        onToggleSize={onSizeToggle}
        sizes={sizes}
      />
      <hr className="my-1.5 border-gray-200" />

      <ColorFilter
        selectedColors={selectedColors}
        onToggleColor={onColorToggle}
        colors={colors}
      />
      <hr className="my-1.5 border-gray-200" />

      <PriceRangeFilter
        minPrice={priceRange.min}
        maxPrice={priceRange.max}
        onPriceChange={onPriceChange}
        globalMaxPrice={globalMaxPrice}
      />
      <hr className="my-1.5 border-gray-200" />

      <button
        onClick={onClearFilters}
        className="w-full mt-2 py-1 text-s bg-[#FE621F] text-white rounded hover:bg-orange-400 transition"
      >
        پاک کردن فیلترها
      </button>
    </aside>
  );
};

export default FilterSidebar;