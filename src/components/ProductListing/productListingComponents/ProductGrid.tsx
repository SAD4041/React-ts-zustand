import React from 'react';
import ProductCard from '@/components/Product/ProductCard';
import type { Product } from '@/types/productListingTypes';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {

  return (
    <div className="grid grid-cols-5 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;