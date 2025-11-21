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

export interface Product {
  id: number;
  name: string;
  price: number;
  original_price?: number;
  discount_percent?: number;
  image_url: string;
  category: string;
  in_stock: boolean;
  brand_name?: string;
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

export interface HomePageResponse {
  banner: Banner;
  categories: Category[];
  amazing_products: Product[];
  best_selling_brands: Brand[];
  style_palettes: StylePalette[];
}