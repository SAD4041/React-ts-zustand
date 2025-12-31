// src/pages/BrandProfileEditPage.tsx

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BrandProfileEdit from "@/components/BrandInfo/BrandProfileEdit";
import { getBrandProfile, updateBrandProfile } from "@/services/brandService";
import type { BrandData } from "@/types/brandProfileTypes";
import { resolveImageUrl } from "@/utils/imageUrl";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const BrandProfileEditPage = () => {
  const [brand, setBrand] = useState<BrandData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchBrandProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getBrandProfile();

      if (res?.manager_id !== undefined && res?.manager_id !== null) {
        localStorage.setItem("marketId", String(res.manager_id));
      } else if (res?.market_id !== undefined && res?.market_id !== null) {
        localStorage.setItem("marketId", String(res.market_id));
      } else if (res?.id !== undefined && res?.id !== null) {
        localStorage.setItem("marketId", String(res.id));
      }

      const logoUrl =
        resolveImageUrl(res.logo) || "/placeholder-logo.png";
      const bannerUrl =
        resolveImageUrl(res.baner || res.banner) || "/placeholder-banner.png";

      setBrand({
        brand: res.brand || "",
        description: res.description || "",
        mobile: res.mobile || "",
        email: res.email || "",
        address: res.address || "",
        logoUrl,
        bannerUrl,
      });
    } catch (err) {
      console.error("Error fetching brand profile:", err);
      navigate("/error500");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchBrandProfile();
  }, [fetchBrandProfile]);

  const handleSave = async (updatedData: BrandData) => {
    try {
      const payload = {
        brand: updatedData.brand,
        description: updatedData.description,
        mobile: updatedData.mobile,
        email: updatedData.email,
        address: updatedData.address,
      };

      await updateBrandProfile(payload);

      setBrand({
        ...updatedData,
        logoUrl: updatedData.logoUrl,
        bannerUrl: updatedData.bannerUrl,
      });

    } catch (err) {
      console.error("Error saving brand profile:", err);
      setError("خطا در ذخیره تغییرات. لطفاً دوباره تلاش کنید.");
    }
  };

  if (loading)
    return (
      <div className="w-full max-w-3xl mx-auto p-6">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="w-full max-w-3xl mx-auto p-6 text-destructive text-center">
        {error}
      </div>
    );

  if (!brand)
    return (
      <div className="w-full max-w-3xl mx-auto p-6 text-center text-muted-foreground">
        بدون داده
      </div>
    );

  return <BrandProfileEdit brandData={brand} onSave={handleSave} />;
};

export default BrandProfileEditPage;
