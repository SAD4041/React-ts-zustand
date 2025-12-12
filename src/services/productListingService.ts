import { getData } from "@/services/services";
import type { Product } from "@/types/productListingTypes";


export const fetchProductsByCategory = async (categorySlug: string): Promise<Product[]> => {
  const data = await getData({
    endPoint: "/api/category/",
    params: { category: categorySlug },
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Accept: "*/*",
    },
  });
  return data;
};

export const fetchProductsByBrand = async (brandSlug: string): Promise<Product[]> => {
  const data = await getData({
    endPoint: "/api/brand/",
    params: { brand: brandSlug },
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Accept: "*/*",
    },
  });
  return data;
};

export const fetchProductsBySearch = async (query: string): Promise<Product[]> => {
  const data = await getData({
    endPoint: "/api/search/",
    params: { q: query },
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Accept: "*/*",
    },
  });
  return data;
};