import React from 'react';
import { brands, sizes, colors } from '@/data/productListingData';
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
    <aside className="w-68 bg-muted p-3 rounded-lg shadow-sm h-fit">

      <BrandFilter
        brands={brands}
        selectedBrands={selectedBrands}
        onToggleBrand={onBrandToggle}
      />
      <hr className="my-1.5 border-border" />

      <SizeFilter
        selectedSizes={selectedSizes}
        onToggleSize={onSizeToggle}
        sizes={sizes}
      />
      <hr className="my-1.5 border-border" />

      <ColorFilter
        selectedColors={selectedColors}
        onToggleColor={onColorToggle}
        colors={colors}
      />
      <hr className="my-1.5 border-border" />

      <PriceRangeFilter
        minPrice={priceRange.min}
        maxPrice={priceRange.max}
        onPriceChange={onPriceChange}
        globalMaxPrice={globalMaxPrice}
      />
      <hr className="my-1.5 border-border" />

      <button
        onClick={onClearFilters}
        className="w-full mt-2 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary-hover transition"
      >
        پاک کردن فیلترها
      </button>
    </aside>
  );
};

export default FilterSidebar;