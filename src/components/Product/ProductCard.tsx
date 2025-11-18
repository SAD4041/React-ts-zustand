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
<div className="w-full max-w-[220px] bg-white rounded-xl shadow-sm overflow-hidden transition hover:shadow-md border border-gray-100 p-2 flex flex-col">
      <div className="flex-shrink-0 mb-2">
        <ProductImage
          key={product.id}
          imageUrl={product.image}
          discount={product.discount ?? 0}
        />
      </div>

      <div className="flex-grow overflow-hidden">
        <ProductDetails product={product} />
      </div>

      <div className="mt-0 ">
        <SizeSelector product={product} />
      </div>

      <div dir='rtl' className="mt-1 flex items-center justify-between text-[10px] ">
        <ColorSelector product={product} />
        {product.stock < 10 && (
          <p className="text-[#FE621F] font-medium truncate">
           ⚠️ تنها  {toPersianDigits(product.stock.toString())} عدد باقی مانده 
          </p>
        )}
        
      </div>
    </div>
  );
};

export default ProductCard;