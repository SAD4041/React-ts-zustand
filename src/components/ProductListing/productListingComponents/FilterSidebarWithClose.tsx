// src/components/productListingComponents/FilterSidebarWithClose.tsx
import React from 'react';
import FilterSidebar from './FilterSidebar';
import { X } from 'lucide-react';

interface FilterSidebarWithCloseProps {
    onClose: () => void;
    // تمام propsهای FilterSidebar
    selectedBrands: string[];
    selectedSizes: string[];
    selectedColors: string[];
    priceRange: { min: number; max: number };
    globalMaxPrice: number;
    onBrandToggle: (name: string) => void;
    onSizeToggle: (size: string) => void;
    onColorToggle: (code: string) => void;
    onPriceChange: (range: { min: number; max: number }) => void;
    onClearFilters: () => void;
}

const FilterSidebarWithClose: React.FC<FilterSidebarWithCloseProps> = ({
    onClose,
    ...filterProps
}) => {
    return (
        <div dir="rtl" className="w-68 bg-muted p-3 rounded-lg shadow-sm h-full flex flex-col">
            {/* دکمه بستن */}
            <button
                onClick={onClose}
                className="self-start mb-3 p-1 rounded-full hover:bg-border"
                aria-label="بستن"
            >
                <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* فیلترها */}
            <FilterSidebar {...filterProps} />
        </div>
    );
};

export default FilterSidebarWithClose;