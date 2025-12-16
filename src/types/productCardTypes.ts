// import { number } from "framer-motion";
import type { Product } from "./productListingTypes";

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
  sizes: Size[];
  colors: Color[];
  rating: number;
  stock: number;
  ratingCount: number;
  sales: number;
  category: string;
  discountedPrice: number;
}

export interface ImageData {
  title: string;
  image: string;
}

export interface ColorSelectorProps {
  product:Product
}

export interface ProductProps {
  product: Product;
}

export interface ProductImageProps {
  imageUrl: string;
  discount: number;
}

export interface SizeSelectorProps {
  product : Product
}

export interface ProductCardProps {
  product: Product;
}
