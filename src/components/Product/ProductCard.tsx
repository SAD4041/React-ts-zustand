import ProductImage from "./productCardComponents/ProductImages";
import ProductDetails from "./productCardComponents/ProductDetails";
import SizeSelector from "./productCardComponents/SizeSelector";
import ColorSelector from "./productCardComponents/ColorSelector";
import { toPersianDigits } from "../../utils/PersianDigits";
import type { ProductCardProps } from "@/types/productCardTypes";


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="
            w-full bg-card rounded-xl shadow-sm border border-border
            p-3 flex flex-col gap-3 transition hover:shadow-md
            ">
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