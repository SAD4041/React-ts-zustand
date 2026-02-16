// import { number } from "framer-motion";

export interface Size {
  label: string;
}

export interface Color {
  hex: string;
  label: string;
}

export interface Product {
  id: number | string;
  discount: number;
  hasDiscount: boolean;
  image: string;
  model: string;             // = brand name
  brandSlug?: string;        // normalized brand key
  name: string;
  price: number;
  sizes: Size[];
  colors: Color[];
  rating: number;            // rating value
  stock: number;             // = inventory_Count
  ratingCount: number;
  sales: number;
  category: string;
  discountedPrice: number;
  subCategory?: string;
  modelStyle?: string;
  gender?: string;
}

export interface ImageData {
  title: string;
  image: string;
}

export interface ColorSelectorProps {
  product: Product;
}

export interface ProductProps {
  product: Product;
}

export interface ProductImageProps {
  imageUrl: string;
  discount: number;
}

export interface SizeSelectorProps {
  product: Product;
}

export interface ProductCardProps {
  Product: Product;
}
