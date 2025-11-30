import React from 'react';
import type { Color } from '@/types/productCardTypes';
import type { ColorSelectorProps } from '@/types/productCardTypes';

const ColorSelector: React.FC<ColorSelectorProps> = ({ product }) => {
  return (
    <div className="flex justify-end space-x-2"> {/* space-x-3 → space-x-2 = 0.5rem */}
      {product.colors.map((color: Color) => (
        <button
          key={color.hex}
          className="w-product-color-dot h-product-color-dot rounded-full border-2 border-border transition duration-200"
          style={{ backgroundColor: color.hex }}
        />
      ))}
    </div>
  );
};

export default ColorSelector;