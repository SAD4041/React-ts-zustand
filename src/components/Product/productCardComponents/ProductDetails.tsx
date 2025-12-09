import React from "react";
import { Star } from "lucide-react";
import tuman from "../../../assets/tuman.png";
import { toPersianDigits } from "../../../utils/PersianDigits";
import type { ProductProps } from "@/types/productCardTypes";


const ProductDetails: React.FC<ProductProps> = ({ product }) => {
    const formatPrice = (num: number): string => {
        return toPersianDigits(num.toLocaleString("en-US"));
    };


    return (
        <div dir="rtl" className="flex flex-col gap-2 text-right select-none">
            <p className="text-sm font-semibold text-foreground truncate">
                تیشرت {product.model} مدل
            </p>


            <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
                {product.name}
            </h3>


            <div className="flex flex-wrap items-center justify-end gap-1 text-xs">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{toPersianDigits(product.rating)}</span>
                <span className="text-muted-foreground">({toPersianDigits(product.ratingCount)})</span>
            </div>



            <div className="flex flex-wrap justify-end items-baseline gap-2">
                {product.hasDiscount ? (
                    <>
                        <div className="flex items-center gap-1 font-semibold text-foreground whitespace-nowrap">
                            <span className="text-base">{formatPrice(product.discountedPrice)}</span>
                            <img src={tuman} alt="تومان" className="w-3 h-3 object-contain" />
                        </div>


                        <span className="text-xs text-muted-foreground line-through decoration-primary whitespace-nowrap">
                            {formatPrice(product.price)}
                        </span>
                    </>
                ) : (
                    <div className="flex items-center gap-1 font-semibold text-foreground whitespace-nowrap">
                        <span className="text-base">{formatPrice(product.price)}</span>
                        <img src={tuman} alt="تومان" className="w-3 h-3 object-contain" />
                    </div>
                )}
            </div>
        </div>
    );
};


export default ProductDetails;