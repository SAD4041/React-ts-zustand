import React from 'react';
import { Star } from "lucide-react";
import tuman from "../../../assets/tuman.png";
import { toPersianDigits } from "../../../utils/PersianDigits";
import type { ProductProps } from '@/types/productCardTypes';

const ProductDetails: React.FC<ProductProps> = ({ product }) => {
  const formatPrice = (num: number): string => {
    return toPersianDigits(num.toLocaleString('en-US'));
  };

  return (
    <div className="text-right mt-product-details-gap">
      <p dir="rtl" className="text-product-title text-foreground font-semibold mb-1">
        تیشرت {product.model} مدل
      </p>

      <h3 className="text-product-title font-semibold text-foreground mb-2">
        {product.name}
      </h3>

      <div className="flex items-center justify-end space-x-1">
        <Star className="w-4 h-4 text-chart-4 fill-chart-4" />
        <span className="text-product-rating text-foreground font-medium">{toPersianDigits(product.rating)}</span>
        <span className="text-product-rating-count text-muted-foreground">({toPersianDigits(product.ratingCount)})</span>
      </div>

      <div className="flex flex-grow justify-end items-baseline space-x-2 flex-row-reverse">
        {product.hasDiscount ? (
          <>
            <div className="font-semibold flex items-center text-product-discounted text-foreground gap-2 mr-3">
              <span className="tight-digits">{formatPrice(product.discountedPrice)}</span>
              <span className="ml-1">
                <img src={tuman} alt="تومان" className="w-product-tuman-icon h-product-tuman-icon" />
              </span>
            </div>

            <span className="text-product-price text-muted-foreground line-through decoration-primary decoration-2">
              {formatPrice(product.price)} 
            </span>
          </>
        ) : (
          <div className="flex flex-row-reverse items-center text-product-price text-foreground gap-1.5">
            <span>{formatPrice(product.price)}</span>
            <span className="ml-1">
              <img src={tuman} alt="تومان" className="w-product-tuman-icon h-product-tuman-icon" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;