import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/Product/ProductCard';
import filterIcon from '@/assets/brand-profile/Filter_alt.png';
import { categories } from '@/data/brandProfile/data';
import type { FilterOptionsProps } from "@/types/homeTypes";


const FilterOptions: React.FC<FilterOptionsProps> = ({ options, currentFilter, onFilterChange }) => {
  return (
    <div className="px-10 flex flex-wrap gap-2 mb-4">
      {options.map((option) => (
        <button
          key={option.value}
          className={`text-sm font-medium py-2 px-4 rounded-md cursor-pointer ${
            currentFilter === option.value
              ? 'bg-black text-white'
              : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => onFilterChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

interface BrandProductsSectionProps {
  products: any[];
  brandId?: string;
}

const BrandProductsSection: React.FC<BrandProductsSectionProps> = ({ products, brandId }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // TODO: Implement filtering logic or call API with category filter
  };

  // فیلتر کردن محصولات بر اساس دسته‌بندی
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="mx-section mt-12 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center my-4 px-4">
        <h2 className="px-10 text-2xl font-semibold text-gray-800">محصولات برند</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 hover:bg-gray-200 text-gray-800 text-lg font-medium py-2 px-4 rounded-lg border cursor-pointer">
            <img src={filterIcon} alt="فیلتر" className="h-7 w-7" />
            فیلتر
          </button>
        </div>
      </div>

      <FilterOptions
        options={categories}
        currentFilter={selectedCategory}
        onFilterChange={handleCategoryChange}
      />

      <div className="px-10 grid grid-cols-2 md:grid-cols-5 gap-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 cursor-pointer">
            <Link to={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          محصولی در این دسته‌بندی یافت نشد
        </div>
      )}

      {filteredProducts.length > 10 && (
        <div className="mt-14 text-center">
          <button className="border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-xl hover:bg-gray-100 transition cursor-pointer">
            مشاهده محصولات بیشتر
          </button>
        </div>
      )}
    </div>
  );
};

export default BrandProductsSection;