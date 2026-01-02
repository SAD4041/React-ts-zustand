import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/Product/ProductCard';
import filterIcon from '@/assets/brand-profile/Filter_alt.png';
import { categories } from '@/data/brandProfile/data';
import type { FilterOptionsProps } from "@/types/brandProfileTypes";
import { Button } from '../ui/button';

const FilterOptions: React.FC<FilterOptionsProps> = ({ options, currentFilter, onFilterChange }) => {
  return (
    <div className="px-10 flex flex-wrap gap-2 mb-4">
      {options.map((option) => (
        <button
          key={option.value}
          className={`text-sm font-medium py-2 px-4 rounded-md cursor-pointer ${
            currentFilter === option.value
              ? 'bg-black text-light'
              : 'bg-white text-text border border-border hover:bg-border'
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
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsExpanded(false);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const displayedProducts = isExpanded ? filteredProducts : filteredProducts.slice(0, 10);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="mx-section mt-12 p-4 bg-login-card-bg rounded-xl shadow-sm border border-border">
      <div className="flex justify-between items-center my-4 px-4">
        <h2 className="px-10 text-2xl font-semibold text-text">محصولات برند</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 hover:bg-gray-200 text-text text-lg font-medium py-2 px-4 rounded-lg border cursor-pointer">
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
        {displayedProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 cursor-pointer">
            <Link to={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-text">
          محصولی در این دسته‌بندی یافت نشد
        </div>
      )}

      {filteredProducts.length > 10 && (
        <div className="mt-6 text-center">
          <Button
            className="border border-border text-sm font-medium py-2 px-6 rounded-lg transition"
            onClick={toggleExpand}
          >
            {isExpanded ? "نمایش کمتر" : "مشاهده همه"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BrandProductsSection;