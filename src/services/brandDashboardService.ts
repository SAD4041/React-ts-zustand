import { getData } from "./services";
import type { BrandDashboardResponse } from "@/types/brandDashTypes";
import { mockBrandDashboardResponse } from "./brandDashboardMock";

interface BrandDashboardParams {
  brandId?: string | number;
  brandSlug?: string;
}

export const fetchBrandDashboard = async ({
  brandId,
  brandSlug,
}: BrandDashboardParams = {}): Promise<BrandDashboardResponse> => {
  const params: Record<string, string> = {};
  if (brandId !== undefined && brandId !== null) params.brand_id = String(brandId);
  if (brandSlug) params.brand_slug = brandSlug;

  try {
    const data = await getData({
      endPoint: "/api/brand/dashboard",
      params: Object.keys(params).length ? params : undefined,
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache", Accept: "*/*" },
    });

    return data;
  } catch (error) {
    const isDev = typeof import.meta !== "undefined" && import.meta.env?.DEV;
    if (isDev) return mockBrandDashboardResponse;
    throw error;
  }
};
