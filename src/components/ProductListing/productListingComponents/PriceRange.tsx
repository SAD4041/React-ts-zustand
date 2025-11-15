import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { formatPrice } from '@/utils/FormatPrice';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (range: { min: number; max: number }) => void;
  globalMaxPrice: number; 
}

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
    <div className="mb-6">
      <h3 className="font-bold mb-3">محدوده قیمت</h3>
      
      <div className="px-2 py-4">
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
          trackStyle={[{ backgroundColor: '#F97316', height: 6 }]}
          handleStyle={[
            { borderColor: '#F97316', height: 20, width: 20, marginLeft: -10, marginTop: -7 },
            { borderColor: '#F97316', height: 20, width: 20, marginLeft: -10, marginTop: -7 }
          ]}
        />
      </div>

      <div className="flex justify-between text-sm mt-2">
        <span className="bg-gray-100 px-2 py-1 rounded">
          {formatPrice(localMax)}
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded">
          {formatPrice(localMin)}
        </span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;