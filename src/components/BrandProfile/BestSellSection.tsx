import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../Product/ProductCard';
import type { BestSellProps } from "@/types/homeTypes";


const BestSell: React.FC<BestSellProps> = ({ brandData, products }) => {
  const displayProducts = products.slice(0, 3);

  if (!brandData?.promotion || displayProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-component mx-section p-4 bg-gradient-to-r from-promo-gradient-from to-promo-gradient-to rounded-2xl text-white">
      <div className='flex'>
        <div className="items-start my-3 mx-7">
          <div className="mb-4 w-25 bg-promo-badge-bg text-promo-badge-text text-lg font-bold px-2 py-2 rounded-full">
            فروش ویژه!
          </div>
          <div className="my-4 text-xl font-bold">{brandData.promotion.title}</div>
          <div className="my-4 text-2xl mt-1">{brandData.promotion.subtitle}</div>
        </div>

        <div className="relative mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {displayProducts.map((product) => (
              <div key={product.id} className="inline-block mx-3 cursor-pointer">
                <Link to={`/products/${product.id}`}>
                {/* change it to product detail */}
                  <ProductCard product={product} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Link to={`/brands/${brandData.id}/products`}>
      {/* change it to brand's products offer */}
        <button className="w-3/4 mt-3 mx-auto block bg-promo-button-bg text-promo-button-text font-medium py-2 rounded-md hover:bg-promo-button-hover transition-colors text-center cursor-pointer">
          مشاهده محصولات
        </button>
      </Link>
    </div>
  );
};

export default BestSell;