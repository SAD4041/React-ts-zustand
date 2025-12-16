import React, { useState } from 'react';
import type { ColorFilterProps } from '@/types/productListingTypes';
import ExtendIcon from '../icon loader/extended';
import ShortenIcon from '../icon loader/shorten';

const ColorFilter: React.FC<ColorFilterProps> = ({ colors, selectedColors, onToggleColor }) => {
  const [showAllColors, setShowAllColors] = useState(false);

  const visibleCount = showAllColors ? colors.length : 6;

  return (
    <div className="mb-6">
      <h3 className="font-bold mb-3">رنگ ها</h3>
      <div className="flex flex-wrap gap-2">
        {colors.slice(0, visibleCount).map(color => (
          <button
            key={color.code}
            type="button"
            onClick={() => onToggleColor(color.code)}
            className={`w-6 h-6 rounded-full border-2 transition ${selectedColors.includes(color.code)
              ? 'border-border ring-1 ring-offset-1 ring-primary'
              : 'border-border hover:border-primary-border-hover'
              }`}
            style={{ backgroundColor: color.code }}
            title={color.name}
          />
        ))}
      </div>

      {colors.length > 6 && (
        <button
          type="button"
          onClick={() => setShowAllColors(!showAllColors)}
          className="mt-2 flex justify-center w-full text-xs text-muted-foreground hover:text-foreground transition"
        >
          {showAllColors ? (
            <>
              <ExtendIcon />
            </>
          ) : (
            <>
              <ShortenIcon />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ColorFilter;