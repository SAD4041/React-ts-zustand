// src/pages/BrandProfileEditPage.tsx
import { useState, useEffect, useCallback } from "react"; 
import BrandProfileEdit from "@/components/BrandInfo/BrandProfileEdit";
import { getBrandProfile, updateBrandProfile } from "@/services/brandService";
import { Spinner } from "@/components/ui/Spinner";

// Define brand type
interface BrandData {
  maket_name: string;
  description: string;
  mobile: string;
  email: string;
  address: string;
  logo: string;
  banner: string;
}

const BrandProfileEditPage = () => {
  const [brand, setBrand] = useState<BrandData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBrandProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getBrandProfile();
      setBrand({
        maket_name: res.maket_name || "",
        description: res.description || "",
        mobile: res.mobile || "",
        email: res.email || "",
        address: res.address || "",
        logo: res.logo || "/placeholder-logo.png", // ⚠️ placeholder
        banner: res.banner || "/placeholder-banner.png", // ⚠️ placeholder
      });
    } catch (err) {
      console.error("Error fetching brand profile:", err);
      setError("خطا در دریافت اطلاعات فروشگاه. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrandProfile();
  }, [fetchBrandProfile]);

  const handleSave = async (updatedData: BrandData) => {
    try {
      const res = await updateBrandProfile(updatedData);
      setBrand(res);
    } catch (err) {
      console.error("Error saving brand profile:", err);
      setError("خطا در ذخیره تغییرات. لطفاً دوباره تلاش کنید.");
    }
  };

  if (loading) return <div className="w-full max-w-3xl mx-auto p-6"><Spinner /></div>;
  if (error) return <div className="w-full max-w-3xl mx-auto p-6 text-destructive text-center">{error}</div>;
  if (!brand) return <div className="w-full max-w-3xl mx-auto p-6 text-center text-muted-foreground">بدون داده</div>;

  return <BrandProfileEdit brandData={brand} onSave={handleSave} />;
};

export default BrandProfileEditPage;