// src/components/ProductListing.tsx
import React, { useState } from 'react';
import SubCategorySlider from './productListingComponents/SubCategorySilder';
import Pagination from './productListingComponents/Pagination';
import FilterSidebar from './productListingComponents/FilterSidebar';
import ProductGrid from './productListingComponents/ProductGrid';
import SortOptions from './productListingComponents/SortOptions';
import type {SortOption} from './productListingComponents/SortOptions'
import { products } from '@/data/data';

const ProductListing: React.FC = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
  const [currentSort, setCurrentSort] = useState<SortOption | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [filteredProductsCount, setFilteredProductsCount] = useState(products.length);

  const productsPerPage = 2;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const globalMaxPrice = Math.max(...products.map(p => p.price), 10000000);
  const currentCategory = "تیشرت زنانه";

  const applyFiltersAndSort = () => {
    console.log('فیلترها یا مرتب‌سازی تغییر کردند:', {
      brands: selectedBrands,
      sizes: selectedSizes,
      colors: selectedColors,
      price: priceRange,
      sort: currentSort
    });

    setFilteredProductsCount(products.length);
  }; 

  const handleBrandToggle = (slug: string) => {
    setSelectedBrands(prev =>
      prev.includes(slug) ? prev.filter(b => b !== slug) : [...prev, slug]
    );
    applyFiltersAndSort(); 
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
    applyFiltersAndSort();
  };

  const handleColorToggle = (code: string) => {
    setSelectedColors(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
    applyFiltersAndSort();
  };

  const handlePriceChange = (range: { min: number; max: number }) => {
    setPriceRange(range);
    applyFiltersAndSort();
  };

  const handleSortChange = (sort: SortOption) => {
    const newSort = currentSort === sort ? null : sort;
    setCurrentSort(newSort);
    applyFiltersAndSort();
  };

  const handleClearFilters = () => {
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange({ min: 0, max: globalMaxPrice });
    setCurrentSort(null);
    applyFiltersAndSort();
  };

  return (
    <div dir="rtl" className="container mx-auto px-4 py-6 font-vazir">
    <div className="mb-0 mt-70">
      <SubCategorySlider />
    </div>

      <div className="flex gap-6 mt-6">
        <FilterSidebar
          selectedBrands={selectedBrands}
          selectedSizes={selectedSizes}
          selectedColors={selectedColors}
          priceRange={priceRange}
          globalMaxPrice={globalMaxPrice}
          onBrandToggle={handleBrandToggle}
          onSizeToggle={handleSizeToggle}
          onColorToggle={handleColorToggle}
          onPriceChange={handlePriceChange}
          onClearFilters={handleClearFilters}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <SortOptions 
                currentSort={currentSort} 
                onSortChange={handleSortChange} 
              />
            </div>
            <div className="text-sm text-gray-600">
              {filteredProductsCount.toLocaleString('fa-IR')} محصول در دسته {currentCategory}
            </div>
          </div>

          <hr className="mb-4 border-gray-200" />

          <div className="h-[600px] overflow-y-auto border rounded-lg p-4 bg-white shadow-sm">
            <ProductGrid />
          </div>

          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;