// src/components/ProductCard.tsx
import ProductImage from './productCardComponents/ProductImages.tsx';
import ProductDetails from './productCardComponents/ProductDetails.tsx';
import SizeSelector from './productCardComponents/SizeSelector.tsx';
import ColorSelector from './productCardComponents/ColorSelector.tsx';
import { toPersianDigits } from "../../utils/PersianDigits.tsx";
import type { Product } from '@/types/productListingTypes';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden transition hover:shadow-md border border-gray-100 p-2 flex flex-col">
      {/* تصویر — انعطاف‌پذیر */}
      <div className="flex-shrink-0 mb-2">
        <ProductImage
          key={product.id}
          imageUrl={product.image}
          discount={product.discount}
        />
      </div>

      {/* جزئیات — پر کننده فضای باقی‌مانده */}
      <div className="flex-grow overflow-hidden">
        <ProductDetails product={product} />
      </div>

      {/* سایز — کوچک */}
      <div className="mt-1">
        <SizeSelector product={product} />
      </div>

      {/* هشدار + رنگ */}
      <div className="mt-1 flex items-center justify-between text-[10px]">
        {product.stock < 10 && (
          <p className="text-[#FE621F] font-medium truncate">
            تنها {toPersianDigits(product.stock.toString())} عدد باقی مانده ⚠️
          </p>
        )}
        <ColorSelector product={product} />
      </div>
    </div>
  );
};

export default ProductCard;