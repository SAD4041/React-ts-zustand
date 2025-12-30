import type { Product } from "@/types/productListingTypes";
import { getMockProducts } from "@/data/productList.mock";

export const fetchAllProducts = async (): Promise<Product[]> => {
  return getMockProducts();
};
