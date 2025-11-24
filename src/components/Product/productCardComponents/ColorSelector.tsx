import React from 'react';
import type { Color } from '@/types/productCardTypes';
import type { Product } from '@/types/productListingTypes';

interface ColorSelectorProps {
  product: Product;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ product }) => {
  return (
    <div className="flex justify-end space-x-3">
      {product.colors.map((color: Color) => (
        <button
          key={color.hex}
          className="w-6.5 h-6.5 rounded-full border-2 border-border transition duration-200"
          style={{ backgroundColor: color.hex }}
        />
      ))}
    </div>
  );
};

export default ColorSelector;