import React, { useState, useEffect } from "react";
import ProductImage from "./productCardComponents/ProductImages";
import ProductDetails from "./productCardComponents/ProductDetails";
import SizeSelector from "./productCardComponents/SizeSelector";
import ColorSelector from "./productCardComponents/ColorSelector";
import { toPersianDigits } from "../../utils/PersianDigits";
import type { ProductCardProps } from "@/types/productCardTypes";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard: React.FC<ProductCardProps> = ({ Product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setIsWishlisted(wishlist.includes(Product.id));
    }, [Product.id]);

    const handleToggleWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        let newWishlist: number[];

        if (isWishlisted) {
            newWishlist = wishlist.filter((id: string) => Number(id) !== Product.id);
        } else {
            newWishlist = [...wishlist, Product.id];
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

            <ProductImage imageUrl={Product.image} discount={Product.discount} />
            <ProductDetails product={Product} />
            <SizeSelector product={Product} />

            <div
                dir="rtl"
                className="flex flex-wrap items-center justify-between gap-2 text-xs"
            >
                <ColorSelector product={Product} />

                {Product.stock < 10 && (
                    <p className="text-primary font-medium whitespace-normal leading-tight">
                        ⚠️ تنها {toPersianDigits(Product.stock.toString())} عدد باقی مانده
                    </p>
                )}
            </div>

            <Link
                to={`/product-page/${Product.id}`}
                className="block w-full"
            >
                <button
                    className="mt-2 w-full rounded-md bg-primary text-primary-foreground py-2 text-sm font-semibold hover:bg-primary/90 transition"
                    type="button"
                >
                    مشاهده محصول
                </button>
            </Link>
        </div>
    );
};

export default ProductCard;
