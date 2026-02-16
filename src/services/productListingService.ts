import { getData } from "@/services/services";
import type { Product } from "@/types/productCardTypes";

const END_POINT = "/products";

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const data = await getData({
      endPoint: END_POINT,
    });
    console.log("✅ MOCK API DATA ✅", data);

    return data;
  } catch (error) {
    console.error("⚠️ Error fetching products:", error);
    return [];
  }
};
