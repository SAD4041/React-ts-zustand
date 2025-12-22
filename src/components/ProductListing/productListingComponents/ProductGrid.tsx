import React from 'react';
import ProductCard from '@/components/Product/ProductCard';
import type { ProductGridProps } from '@/types/productListingTypes';

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 gap-4 cursor-pointer sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;