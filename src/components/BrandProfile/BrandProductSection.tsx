// BrandProductsSection.jsx

import React, { useState } from 'react';
import ProductCard from '@/components/Product/ProductCard';
import SortOptions from '@/components/ProductListing/productListingComponents/SortOptions';
import type { SortOption } from '@/components/ProductListing/productListingComponents/SortOptions';
import filterIcon from '@/assets/brand-profile/Filter_alt.png'; 
import Tshirt from '@/assets/image1.png'; // اگر این مسیر درست نیست، خودت جایگزین کن

// داده ماک شده برای یک محصول
const mockProduct = {
  id: 1,
  name: "تیشرت CATWAREHOUSE",
  model: "Bussiness Not Boomin",
  price: 699999,
  discountedPrice: 531999,
  discount: 24,
  hasDiscount: true,
  image: Tshirt, // اینجا تصویر واقعی رو قرار بده
  sizes: [
    { label: "XS" },
    { label: "S" },
    { label: "M" },
    { label: "L" },
    { label: "XL" },
    { label: "2XL" },
    { label: "3XL" }
  ],
  colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"], // رنگ‌های موجود
  stock: 8, // موجودی
  category: "mens-clothes" // این ویژگی جدید برای فیلتر کردن
};

// تولید ۱۰ محصول با دسته‌های مختلف
const products = Array.from({ length: 10 }, (_, i) => {
  const categories = ["all", "mens-clothes", "womens-clothes", "kids-clothes", "accessory"];
  const randomCategory = categories[i % categories.length];

  return {
    ...mockProduct,
    id: i + 1,
    name: `${mockProduct.name} ${i + 1}`,
    price: mockProduct.price - (i * 1000),
    discountedPrice: mockProduct.discountedPrice - (i * 1000),
    category: randomCategory
  };
});

// کامپوننت FilterOptions
interface FilterOption {
  value: string;
  label: string;
}

interface FilterOptionsProps {
  options: FilterOption[];
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

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

const BrandProductsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentSort, setCurrentSort] = useState<SortOption | null>(null);

  // لیست دسته‌ها
  const categories = [
    { value: "all", label: "همه محصولات" },
    { value: "mens-clothes", label: "لباس مردانه" },
    { value: "womens-clothes", label: "لباس زنانه" },
    { value: "kids-clothes", label: "لباس بچه‌گانه" },
    { value: "accessory", label: "اکسسوری" }
  ];

  // فیلتر محصولات بر اساس دسته
  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  // مرتب‌سازی محصولات
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (currentSort) {
      case 'newest':
        return b.id - a.id; // جدیدترین اول
      case 'cheapest':
        return a.discountedPrice - b.discountedPrice; // ارزان‌ترین اول
      case 'expensive':
        return b.discountedPrice - a.discountedPrice; // گران‌ترین اول
      case 'most-salled':
        // فرض می‌کنیم یک فیلد فروش داریم
        return (b.sales || 0) - (a.sales || 0); // پرفروش‌ترین اول
      case 'most-revelent':
      default:
        return 0; // بدون تغییر
    }
  });

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

      {/* <div className="px-10">
        <SortOptions currentSort={currentSort} onSortChange={handleSortChange} />
      </div> */}

      <div className="px-10 grid grid-cols-2 md:grid-cols-5 gap-3">
        {sortedProducts.map((product) => (
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