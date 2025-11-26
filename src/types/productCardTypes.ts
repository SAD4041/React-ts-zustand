
export interface Size {
  label: string;
}

export interface Color {
  hex: string;
  label: string;
}

export interface ProductData {
  discount: number;
  hasDiscount: boolean;
  image: string;
  model: string;
  name: string;
  price: number;
  discountedPrice: number;
  sizes: Size[];
  colors: Color[];
  rating: number;
  stock: number;
  ratingCount: number;
  sales: number;
}

export interface ImageData {
  title: string;
  image: string;
}