// services/productListingServices.ts

import { getData } from "@/services/services";
import type { Product as RawProduct } from "@/types/productListingTypes";
import type { Product as AdaptedProduct } from "@/types/productCardTypes";
import { transformProducts } from "@/utils/transformproduct";

export const fetchProductsByCategory = async (
  categorySlug: string
): Promise<AdaptedProduct[]> => {
  const data: RawProduct[] = await getData({
    endPoint: "/api/category/",
    params: { category: categorySlug },
  });
  return transformProducts(data);
};

export const fetchProductsByBrand = async (
  brandSlug: string
): Promise<AdaptedProduct[]> => {
  const data: RawProduct[] = await getData({
    endPoint: "/api/brand/",
    params: { brand: brandSlug },
  });
  return transformProducts(data);
};

export const fetchProductsBySearch = async (
  query: string
): Promise<AdaptedProduct[]> => {
  const data: RawProduct[] = await getData({
    endPoint: "/api/search/",
    params: { q: query },
  });
  return transformProducts(data);
};