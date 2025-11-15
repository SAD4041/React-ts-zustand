import React from 'react';
import type { Size } from '@/types/productCardTypes.ts'
import type { Product } from '@/types/productListingTypes.ts';

interface SizeSelectorProps {
  product : Product
}

const SizeSelector: React.FC<SizeSelectorProps> = ({product}) => {

  return (
    <div className="flex justify-end space-x-2">
      {product.sizes.map((size: Size) => (
        <button
          key={size.label}
          className='border-gray-300 bg-white text-gray-700 px-3 py-1 text-sm font-medium rounded-lg border transition-all duration-200'>
          {size.label}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;
