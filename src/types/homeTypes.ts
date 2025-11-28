export interface Banner {
  id: number;
  title?: string;
  image_url: string;
  link?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string;
}

export interface Brand {
  id: number;
  name: string;
  logo_url: string;
  slug: string;
}

export interface StylePalette {
  id: number;
  title: string;
  slug: string;
  image_url: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  original_price?: number;
  discount_percent?: number;
  image_url: string;
  category: string;
  in_stock: boolean;
}

export interface HomePageResponse {
  banner: Banner;
  categories: Category[];
  amazing_products: Product[];
  best_selling_brands: Brand[];
  style_palettes: StylePalette[];
}

export interface Timer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface SurpriseSectionProps {
  products: Product[];
}

export interface SliderItem {
  id: number;
  name: string;
  logo_url?: string;
  slug: string;
}

export interface SliderSectionProps {
  title: string;
  link: string;
  items: any[];
  currentIndex: number;
  setIndex: (index: number) => void;
  itemsPerView: number;
  isAmazing?: boolean;
  isBrandSlider?: boolean;
}


export interface BrandSliderProps {
  brands: Brand[];
  onBrandClick: (action: Omit<UserAction, 'timestamp'>) => void;
}


export interface BestBrandsSectionProps {
  brands: Brand[];
  onBrandClick: (action: Omit<UserAction, 'timestamp'>) => void;
}