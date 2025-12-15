import React from "react";
import { toPersianDigits } from "../../../utils/PersianDigits";
import type { ProductImageProps } from "@/types/productCardTypes";


const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, discount }) => {
    return (
        <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden">
            {discount > 0 && (
                <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-lg">
                    {toPersianDigits(discount.toString())}%
                </div>
            )}
            <img src={imageUrl} alt="Product" className="absolute inset-0 w-full h-full object-cover" />
        </div>
    );
};


export default ProductImage;