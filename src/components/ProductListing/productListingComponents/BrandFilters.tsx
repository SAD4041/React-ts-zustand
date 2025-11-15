import React from 'react';
import type { Brand } from '@/types/productListingTypes';

interface BrandFilterProps {
  brands: Brand[];
  selectedBrands: string[];
  onToggleBrand: (slug: string) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({ brands, selectedBrands, onToggleBrand }) => {
  return (
    <div className="mb-6">
      <h3 className="font-bold mb-3">برند ها</h3>
      <div className="space-y-2">
        {brands.map(brand => (
          <label key={brand.id} className="flex items-center cursor-pointer">
            <span
              onClick={(e) => {
                e.stopPropagation();
                onToggleBrand(brand.slug);
              }}
              className={`w-4 h-4 border rounded flex items-center justify-center mr-2 transition ${
                selectedBrands.includes(brand.slug)
                  ? 'bg-[#FE621F] border-[#FE621F]'
                  : 'border-gray-300 hover:border-[#FE621F]'
              }`}
            >
              {selectedBrands.includes(brand.slug) && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414l4 4a1 1 0 011.414 0l8-8a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </span>
            <span className="text-sm ml-auto mr-1">{brand.slug}</span>
            <span className="text-xs text-gray-500 mr-2">{brand.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;