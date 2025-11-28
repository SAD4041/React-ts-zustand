// BrandProductsSection.jsx

import React from 'react';
import ProductCard from '@/components/Product/ProductCard';
import filterIcon from '@/assets/brand-profile/Filter_alt.png'; 

// فرض می‌کنیم این تصویر رو از مسیر @/assets/... داری
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
  category: "پوشاک"
};

const products = Array.from({ length: 10 }, (_, i) => ({
  ...mockProduct,
  id: i + 1,
  name: `${mockProduct.name} ${i + 1}`,
  price: mockProduct.price - (i * 1000),
  discountedPrice: mockProduct.discountedPrice - (i * 1000),
}));

const BrandProductsSection = () => {
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

      {/* دکمه‌های فیلتر */}
      <div className="px-10 flex flex-wrap gap-2 mb-4">
        <button className="bg-black text-white text-sm font-medium py-2 px-4 rounded-md cursor-pointer">
          همه محصولات
        </button>
        <button className="bg-white text-gray-800 border border-gray-300 text-sm font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition cursor-pointer">
          سالب نانه
        </button>
        <button className="bg-white text-gray-800 border border-gray-300 text-sm font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition cursor-pointer">
          سالب نگاهچی
        </button>
        <button className="bg-white text-gray-800 border border-gray-300 text-sm font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition cursor-pointer">
          اکسسوری
        </button>
      </div>

      {/* لیست محصولات - ۲ ردیف × ۵ ستون */}
      <div className="px-10 grid grid-cols-2 md:grid-cols-5 gap-3">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 cursor-pointer">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* دکمه مشاهده محصولات بیشتر */}
      <div className="mt-[60px] text-center">
        <button className="border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-xl hover:bg-gray-100 transition cursor-pointer">
          مشاهده محصولات بیشتر
        </button>
      </div>
    </div>
  );
};

export default BrandProductsSection;