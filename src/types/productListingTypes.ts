import type {ProductData} from './productCardTypes';

export interface SubCategory {
  id: number;
  title: string;
  image: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
}

export interface ColorOption {
  name: string;
  code: string;
}

export interface Filters {
  brands: string[];
  sizes: string[];
  colors: string[];
  price: {
    min: number;
    max: number;
  };
}

export interface Product extends ProductData {
  id: number;
}

export type SortOption = 'newest' | 'cheapest' | 'expensive' | 'most-salled' | 'most-revelent';

export interface SortOptionsProps {
  currentSort: SortOption | null;
  onSortChange: (sort: SortOption) => void;
}

export interface BrandFilterProps {
  brands: Brand[];
  selectedBrands: string[];
  onToggleBrand: (slug: string) => void;
}

export interface ColorFilterProps {
  colors: ColorOption[];
  selectedColors: string[];
  onToggleColor: (code: string) => void;
}

export interface FilterSidebarProps {
  selectedBrands: string[];
  selectedSizes: string[];
  selectedColors: string[];
  priceRange: { min: number; max: number };
  globalMaxPrice: number;
  onBrandToggle: (slug: string) => void;
  onSizeToggle: (size: string) => void;
  onColorToggle: (code: string) => void;
  onPriceChange: (range: { min: number; max: number }) => void;
  onClearFilters: () => void;
}

export interface PaginationProps {
  currentGroup: number;
  totalGroups: number;
  onGroupChange: (group: number) => void;
  pagesPerGroup: number;
}

export interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (range: { min: number; max: number }) => void;
  globalMaxPrice: number; 
}

export interface ProductGridProps {
  products: Product[];
}

export interface SizeFilterProps {
  sizes: string[];
  selectedSizes: string[];
  onToggleSize: (size: string) => void;
}

export interface SubCategoryProps {
  category: SubCategory;
}
