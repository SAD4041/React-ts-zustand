import ProductImage from './productCardComponents/ProductImages';
import ProductDetails from './productCardComponents/ProductDetails';
import SizeSelector from './productCardComponents/SizeSelector';
import ColorSelector from './productCardComponents/ColorSelector';
import { toPersianDigits } from "../../utils/PersianDigits";
import type { Product } from '@/types/productListingTypes';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-full max-w-[220px] bg-card rounded-xl shadow-sm overflow-hidden transition hover:shadow-md border border-border p-2 flex flex-col">
      <div className="flex-shrink-0 mb-2">
        <ProductImage
          key={product.id}
          imageUrl={product.image}
          discount={product.discount}
        />
      </div>

      <div className="flex-grow overflow-hidden">
        <ProductDetails product={product} />
      </div>

      <div className="mt-0">
        <SizeSelector product={product} />
      </div>

      <div dir="rtl" className="mt-1 flex items-center justify-between text-2xs">
        <ColorSelector product={product} />
        {product.stock < 10 && (
          <p className="text-primary font-medium truncate">
            ⚠️ تنها {toPersianDigits(product.stock.toString())} عدد باقی مانده 
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;