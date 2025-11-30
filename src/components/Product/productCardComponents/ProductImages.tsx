import React from 'react';
import { toPersianDigits } from "../../../utils/PersianDigits";
import type { ProductImageProps } from "@/types/productCardTypes"

const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, discount }) => {
  return (
    <div className="relative">
      {discount > 0 && (
        <div className="absolute bg-primary top-2 left-2 text-primary-foreground text-xs font-bold px-2 py-1 rounded-lg z-10">
          {toPersianDigits(discount.toString())}%
        </div>
      )}
      <img
        src={imageUrl}
        alt="Product Picture"
        className="w-product-image h-auto object-cover rounded-lg"
      />
    </div>
  );
};

export default ProductImage;