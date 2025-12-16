import { getData } from "@/services/services";
import type { Product } from "@/types/productListingTypes";

export const fetchProductsByCategory = async (categorySlug: string): Promise<Product[]> => {
  return await getData({
    endPoint: `/api/product/CA/${categorySlug}`,
  });
};

export const fetchProductsByBrand = async (brandSlug: string): Promise<Product[]> => {
  return await getData({
    endPoint: `/api/product/BR/${brandSlug}`,
  });
};

export const fetchProductsBySearch = async (searchSlug: string): Promise<Product[]> => {
  return await getData({
    endPoint: `/api/product/SE/${searchSlug}`,
  });
};

export const fetchProductsByStyle = async (styleSlug: string): Promise<Product[]> => {
  return await getData({
    endPoint: `/api/product/CM/${styleSlug}`,
  });
};
