// types/productCardTypes.ts

export interface Size {
  label: string;
}

export interface Color {
  hex: string;
  label: string;
}

export interface Product {
  id: number;
  discount: number;
  hasDiscount: boolean;
  image: string;
  model: string;             // = brand
  name: string;
  price: number;
  discountedPrice: number;
  sizes: Size[];
  colors: Color[];
  rating: number;            // ✅ وجود دارد
  stock: number;             // = inventory_Count
  ratingCount: number;
  sales: number;
}

// --- Props برای کامپوننت‌ها ---
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
  product: Product;
}