export interface Product {
  id: number;
  image: string;
  discount: number;
  hasDiscount?: boolean; 
  model: string;
  stock: number;
  name: string;
  price: number;
  original_price?: number;
  sizes: string[];
  colors: string[];
  slug?: string;
  brand?: string;
  rating?: number;
}

export interface HomePageResponse {
  banners?: Banner[];
  categories?: Category[];
  style_palettes?: StylePalette[];
  special_offers?: Product[];
  best_selling_brands?: Brand[];
  discount_ad?: any[];
  market_ad_packages?: any[];
}

export interface UserAction {
  action: "click" | "search" | "view";
  target_type: "product" | "brand" | "category";
  target_id: number;
  query?: string;
  timestamp: string;
}

export interface BestBrandsSectionProps {
  brands: Brand[];
  onBrandClick: (action: Omit<UserAction, 'timestamp'>) => void;
}

export interface SurpriseSectionProps {
  products: Product[];
}
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


export interface Timer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
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