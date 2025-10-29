import React from 'react';
import { Star } from "lucide-react";
import { productData } from '../../data/data.ts';
import tuman from "../../assets/tuman.png"

const ProductDetails: React.FC = () => {
const toPersianDigits = (str: string): string =>
  str.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
  return (
    <div className="text-right mt-3">
      <p dir="rtl" className="text-sm text-gray-500 font-semibold mb-1">
        تیشرت {productData.model} مدل
      </p>

      <h3 className="text-lg font-extrabold text-gray-800 mb-2">
        {productData.name}
      </h3>

      <div className="flex items-center space-x-1">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span className="text-sm text-gray-700 font-medium">{productData.rating}</span>
        <span className="text-xs text-gray-500">({productData.ratingCount})</span>
      </div>

      <div className="flex justify-end items-baseline space-x-2">
        {productData.hasDiscount ? (
          <>
            <div className="font-vazirmatn font-semibold flex flex-row-reverse items-center text-xl text-gray-800 gap-1.5">
            <span>{toPersianDigits(productData.discountedPrice.toString())}</span>
             <span className="ml-1">
              <img
                src={tuman}
                alt="تومان"
                className="w-4.5 h-4.5"
              />
              </span>
            </div>

            <span className="text-sm text-gray-400 line-through decoration-[#FE621F] decoration-2">
              {toPersianDigits(productData.price.toString())} 
            </span>
          </>
        ) : (
          <div className="font-vazirmatn flex flex-row-reverse items-center text-xl text-gray-800 gap-1.5">
            <span>{toPersianDigits(productData.price.toString())}</span>
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
