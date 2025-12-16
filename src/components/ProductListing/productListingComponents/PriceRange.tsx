import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { formatPrice } from '@/utils/FormatPrice';
import { toPersianDigits } from '@/utils/PersianDigits';
import type { PriceRangeFilterProps } from '@/types/productListingTypes';

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
  onPriceChange,
  globalMaxPrice,
}) => {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  useEffect(() => {
    const timer = setTimeout(() => {
      onPriceChange({ min: localMin, max: localMax });
    }, 300);
    return () => clearTimeout(timer);
  }, [localMin, localMax, onPriceChange]);

  return (
<<<<<<< HEAD
    <div className="mb-6 ml-4">
      <h3 className="font-bold mb-3">محدوده قیمت</h3>
      
      <div className="px-2 py-4">
=======
    <div className="mb-10 ml-4">
      <h3 className="font-bold mb-3">محدوده قیمت</h3>

      <div className="px-2 py-2">
>>>>>>> origin/develop
        <Slider
          range
          min={0}
          max={globalMaxPrice}
          value={[localMin, localMax]}
          onChange={(value) => {
            if (Array.isArray(value)) {
              setLocalMin(value[0]);
              setLocalMax(value[1]);
            }
          }}
<<<<<<< HEAD
          trackStyle={[{ backgroundColor: '#F97316', height: 6 }]}
          handleStyle={[
            { borderColor: '#F97316', height: 20, width: 20, marginLeft: -10, marginTop: -7 },
            { borderColor: '#F97316', height: 20, width: 20, marginLeft: -10, marginTop: -7 }
=======
          trackStyle={[{ backgroundColor: 'var(--slider-track)', height: 6 }]}
          handleStyle={[
            { borderColor: 'var(--slider-handle)', height: 20, width: 20, marginLeft: -8, marginTop: -7 },
            { borderColor: 'var(--slider-handle)', height: 20, width: 20, marginLeft: -10, marginTop: -7 }
>>>>>>> origin/develop
          ]}
        />
      </div>

<<<<<<< HEAD
      <div className="flex justify-between text-sm mt-2">
        <span className="bg-gray-100 px-2 py-1 rounded">
          {toPersianDigits(formatPrice(localMax))}
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded">
=======
      <div className="flex justify-between text-sm mt-0">
        <span className="bg-muted px-2 py-1 rounded">
          {toPersianDigits(formatPrice(localMax))}
        </span>
        <span className="bg-muted px-2 py-1 rounded">
>>>>>>> origin/develop
          {toPersianDigits(formatPrice(localMin))}
        </span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;