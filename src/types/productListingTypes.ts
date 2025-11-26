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

