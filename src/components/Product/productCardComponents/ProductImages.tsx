import React from 'react';
import { productData } from '@/data/data';
import { toPersianDigits } from "../../../utils/PersianDigits.tsx";
import type { ProductImageProps } from '@/types/productCardTypes.ts'


const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, discount }) => {

  return (
    <div className="relative">
      {productData.hasDiscount && (
        <div 
          className="absolute bg-[#FE621F] top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-lg z-10">
          {toPersianDigits(discount.toString())}%
        </div>
      )}
      <img
        src={imageUrl}
        alt="Product Picture"
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>
  );
};

export default ProductImage;
