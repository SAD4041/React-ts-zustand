import React ,{useState} from 'react';
import type { Brand } from '@/types/productListingTypes';

interface BrandFilterProps {
  brands: Brand[];
  selectedBrands: string[];
  onToggleBrand: (slug: string) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({ brands, selectedBrands, onToggleBrand }) => {


  const [showAllBrands, setShowAllBrands] = useState(false);

  const visibleCount = showAllBrands ? brands.length : 5;

  return (
    <div className="mb-6">
      <h3 className="font-bold mb-3">برند ها</h3>
      <div className="space-y-2">
        {brands.slice(0, visibleCount).map(brand => (
          <label key={brand.id} className="flex items-center cursor-pointer">
            <span
              onClick={(e) => {
                e.stopPropagation();
                onToggleBrand(brand.name);
              }}
              className={`w-4 h-4 border rounded flex items-center justify-center mr-2 transition ${
                selectedBrands.includes(brand.name)
                  ? 'bg-[#FE621F] border-[#FE621F]'
                  : 'border-gray-300 hover:border-[#FE621F]'
              }`}
            >
              {selectedBrands.includes(brand.name) && (
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

      {brands.length > 5 && (
        <button
          type="button"
          onClick={() => setShowAllBrands(!showAllBrands)}
          className="mt-2 flex items-center text-xs text-gray-600 hover:text-gray-800 transition"
        >
          {showAllBrands ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default BrandFilter;