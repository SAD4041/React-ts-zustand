import React, { useState, useEffect } from "react";
import ProductImage from "./productCardComponents/ProductImages";
import ProductDetails from "./productCardComponents/ProductDetails";
import SizeSelector from "./productCardComponents/SizeSelector";
import ColorSelector from "./productCardComponents/ColorSelector";
import { toPersianDigits } from "../../utils/PersianDigits";
import type { ProductCardProps } from "@/types/productCardTypes";
import { Heart } from "lucide-react";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setIsWishlisted(wishlist.includes(product.id));
    }, [product.id]);

    const handleToggleWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        let newWishlist: number[];

        if (isWishlisted) {
            newWishlist = wishlist.filter((id: number) => id !== product.id);
        } else {
            newWishlist = [...wishlist, product.id];
        }

        localStorage.setItem("wishlist", JSON.stringify(newWishlist));
        setIsWishlisted(!isWishlisted);
    };

    return (
        <div className="
        w-full bg-card rounded-xl shadow-sm border border-border
        p-3 flex flex-col gap-3 transition hover:shadow-md relative
        ">
            <button
                onClick={handleToggleWishlist}
                className="absolute top-2 right-2 z-10 p-1 bg-background rounded-full"
                aria-label={isWishlisted ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
            >
                <Heart
                    className={`w-5 h-5 transition-colors ${isWishlisted
                        ? "fill-primary text-primary"
                        : "fill-none text-muted-foreground"
                        }`}
                />
            </button>

            <ProductImage imageUrl={product.image} discount={product.discount} />
            <ProductDetails product={product} />
            <SizeSelector product={product} />

            <div
                dir="rtl"
                className="flex flex-wrap items-center justify-between gap-2 text-xs"
            >
                <ColorSelector product={product} />

                {product.stock < 10 && (
                    <p className="text-primary font-medium whitespace-normal leading-tight">
                        ⚠️ تنها {toPersianDigits(product.stock.toString())} عدد باقی مانده
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;