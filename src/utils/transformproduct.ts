// utils/transformProduct.ts

import type { Product as RawProduct } from "@/types/productListingTypes";
import type { Product as AdaptedProduct } from "@/types/productCardTypes";

export const transformProduct = (raw: RawProduct): AdaptedProduct => {
  const hasDiscount = raw.discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round(raw.price * (1 - raw.discount / 100))
    : raw.price;

  // ✅ raw.color: string[] → map به { hex: string, label: string }
  const colors = raw.color.map(hex => ({
    hex,        // string
    label: hex, // string
  }));

  // ✅ raw.size: string[] → map به { label: string } 
  const sizes = raw.size.map(label => ({ label })); // label is string

  return {
    id: raw.id,
    image: raw.image,
    name: raw.name,
    model: raw.brand,              // string → string
    price: raw.price,
    discountedPrice,
    hasDiscount,
    discount: raw.discount,
    stock: raw.inventory_Count,    // number → number
    rating: raw.rating,
    ratingCount: raw.ratingCount,
    sales: raw.sales,
    colors,
    sizes,
  };
};

export const transformProducts = (rawProducts: RawProduct[]): AdaptedProduct[] =>
  rawProducts.map(transformProduct);