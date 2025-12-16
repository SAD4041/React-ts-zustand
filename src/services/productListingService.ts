// src/services/productListingService.ts
import { getData } from "@/services/services";
import type { Product } from "@/types/productListingTypes";

const END_POINT = "/products";

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const data = await getData({
      endPoint: END_POINT,
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Accept: "*/*",
      },
    });
    console.log("✅ PROFILE RESPONSE 👉", data);
    console.log("✅ RAW API RESPONSE 👉", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
};