import React from 'react';
import type { Size } from '@/types/productCardTypes';
import type { Product } from '@/types/productListingTypes';

interface SizeSelectorProps {
  product: Product;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ product }) => {
  return (
    <div className="justify-end space-x-2 mt-1">
      {product.sizes.map((size: Size) => (
        <button
          key={size.label}
          className="border-border bg-background text-foreground px-3 py-1 text-[10px] font-medium rounded-lg border transition-all duration-200"
        >
          {size.label}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;