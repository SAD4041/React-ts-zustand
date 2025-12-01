// BrandProductsSection.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBrandProducts } from '@/services/brandProfile';
import ProductCard from '@/components/Product/ProductCard';
import SortOptions from '@/components/ProductListing/productListingComponents/SortOptions';
import type { SortOption } from '@/components/ProductListing/productListingComponents/SortOptions';
import filterIcon from '@/assets/brand-profile/Filter_alt.png';
import { categories } from '@/data/brandProfile/data';
import LoadingSpinner from '../LoadingSpinner';

const FilterOptions: React.FC<{ options: any[]; currentFilter: string; onFilterChange: (filter: string) => void }> = ({ options, currentFilter, onFilterChange }) => {
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

const BrandProductsSection = () => {
  const { brandId } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentSort, setCurrentSort] = useState<SortOption | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getBrandProducts(brandId, { category: selectedCategory, sort: currentSort });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brandId, selectedCategory, currentSort]);

  if (loading) return <LoadingSpinner />;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort: SortOption) => {
    setCurrentSort(sort);
  };

  return (
    <div className="mx-[150px] mt-12 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center my-4 px-4">
        <h2 className="px-10 text-2xl font-semibold text-gray-800">محصولات برند</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 hover:bg-gray-200 text-gray-800 text-l font-medium py-2 px-4 rounded-lg border">
            <img src={filterIcon} alt="فیلتر" className="h-7 w-7" />
            فیلتر
          </div>
        </div>
      </div>

      <FilterOptions
        options={categories}
        currentFilter={selectedCategory}
        onFilterChange={handleCategoryChange}
      />

      <div className="px-10 grid grid-cols-2 md:grid-cols-5 gap-3">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 cursor-pointer">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-[60px] text-center">
        <button className="border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-xl hover:bg-gray-100 transition cursor-pointer">
          مشاهده محصولات بیشتر
        </button>
      </div>
    </div>
  );
};

export default BrandProductsSection;