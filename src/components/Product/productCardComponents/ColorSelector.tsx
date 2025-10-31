import React from 'react';
import { productData } from '../../../data/data.ts';
import type { Color } from '../../../data/data.ts'

interface ColorSelectorProps {}

const ColorSelector: React.FC<ColorSelectorProps> = () => {

  return (
    <div className="flex justify-end space-x-3">
      {productData.colors.map((color: Color) => (
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
