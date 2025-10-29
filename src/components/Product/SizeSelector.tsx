import React from 'react';
import { productData } from '../../data/data.ts';
import type { Size } from '../../data/data.ts'

interface SizeSelectorProps {}

const SizeSelector: React.FC<SizeSelectorProps> = () => {

  return (
    <div className="flex justify-end space-x-2">
      {productData.sizes.map((size: Size) => (
        <button
          className='border-gray-300 bg-white text-gray-700 px-3 py-1 text-sm font-medium rounded-lg border transition-all duration-200'>
          {size.label}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;
