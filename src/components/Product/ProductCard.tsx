import { images, productData } from '../../data/data.ts';
import ProductImage from './ProductImages';
import ProductDetails from './ProductDetails';
import SizeSelector from './SizeSelector';
import ColorSelector from './ColorSelector';

const ProductCard: React.FC = () => {
  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl border border-gray-100 p-4 mx-2 my-4">
      {images.map((coreImage) => (
        <ProductImage
          key={coreImage.title}
          imageUrl={coreImage.image}
          discount={productData.discount}
        />
      ))}

      <ProductDetails />

      <div className="mt-3">
        <SizeSelector/>
      </div>

      <div className="mt-3 flex items-center justify-between">
              {productData.stock < 10 && (
      <p className="text-[#FE621F] text-xs font-medium mt-1">
      تنها {productData.stock} عدد باقی مانده ⚠️
      </p>
        )}
  
        <ColorSelector/>
      </div>
    </div>
  );
};

export default ProductCard;
