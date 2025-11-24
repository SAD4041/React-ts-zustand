import React, { useState } from 'react';
import type { ColorFilterProps } from '@/types/productListingTypes';

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
            className={`w-6 h-6 rounded-full border-2 transition ${
              selectedColors.includes(color.code)
                ? 'border-border ring-1 ring-offset-1 ring-primary'
                : 'border-border hover:border-primary'
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default ColorFilter;