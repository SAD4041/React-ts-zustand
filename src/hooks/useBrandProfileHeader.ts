import { useCallback, useEffect, useState } from "react";
import { getBrandProfile } from "@/services/brandService";
import { resolveImageUrl } from "@/utils/imageUrl";

type BrandHeaderData = {
  brandName: string;
  logoUrl: string;
};

export const useBrandProfileHeader = () => {
  const [data, setData] = useState<BrandHeaderData>({
    brandName: "",
    logoUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBrandProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getBrandProfile();
      const logoUrl = resolveImageUrl(res?.logo) || "/avatar.png";

      setData({
        brandName: res?.brand || "",
        logoUrl,
      });
    } catch (err) {
      console.error("Error fetching brand profile:", err);
      setError("Failed to load brand profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrandProfile();
  }, [fetchBrandProfile]);

  return { ...data, loading, error };
};
