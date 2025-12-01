import React from 'react';
import { Star } from "lucide-react";
import tuman from "../../../assets/tuman.png";
import { toPersianDigits } from "../../../utils/PersianDigits.tsx";
import type { Product } from '@/types/productListingTypes';
import type { ProductProps } from '@/types/productCardTypes.ts';



const ProductDetails: React.FC<ProductProps> = ({product}) => {
  
    const formatPrice = (num: number): string => {
    return toPersianDigits(num.toLocaleString('en-US'));
  };

  return (
    <div className="text-right mt-3">
      <p dir="rtl" className="text-sm text-gray-800 font-semibold mb-1">
        تیشرت {product.model} مدل
      </p>

      <h3 className="text-sm   font-semibold text-gray-800 mb-2">
        {product.name}
      </h3>

      <div className="flex items-center justify-end space-x-1">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span className="text-sm text-gray-700 font-medium">{toPersianDigits(product.rating)}</span>
        <span className="text-xs text-gray-500">({toPersianDigits(product.ratingCount)})</span>
      </div>

      <div className="flex flex-grow  justify-end items-baseline space-x-2 flex-row-reverse">
        {product.hasDiscount ? (
          <>
            <div className=" font-semibold flex items-center text-sm text-gray-800 gap-2 mr-3">
            <span className="tight-digits">{formatPrice(product.discountedPrice)}</span>
             <span className="ml-1">
              <img
                src={tuman}
                alt="تومان"
                className="w-4.5 h-4.5"
              />
              </span>
            </div>

            <span className="text-sm text-gray-400 line-through decoration-[#FE621F] decoration-2">
              {formatPrice(product.price)} 
            </span>
          </>
        ) : (
          <div className="flex flex-row-reverse items-center text-xl text-gray-800 gap-1.5">
            <span>{formatPrice(product.price)}</span>
             <span className="ml-1">
              <img
                src={tuman}
                alt="تومان"
                className="w-4.5 h-4.5"
              />
              </span>
          </div>
        )}
      </div>
    </div>

  );
};

export default ProductDetails;
