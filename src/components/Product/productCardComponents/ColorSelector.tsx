import React from 'react';
import type { Color } from '@/types/productCardTypes.ts'
import type { Product } from '@/types/productListingTypes.ts';

interface ColorSelectorProps {
  product:Product
}

const ColorSelector: React.FC<ColorSelectorProps> = ({product}) => {

  return (
    <div className="flex justify-end space-x-3">
      {product.colors.map((color: Color) => (
        <button
          key={color.hex}
          className='w-7 h-7 rounded-full border-2 transition duration-200 '
          style={{backgroundColor: color.hex,}}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
