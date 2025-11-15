import React from 'react';
import ProductCard from '@/components/Product/ProductCard';
import { products } from '@/data/data';

const ProductGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;