// src/pages/BrandProfileEditPage.tsx
import { useEffect, useState } from "react";
import BrandProfileEdit from "@/components/BrandInfo/BrandProfileEdit";
import { getBrandProfile, updateBrandProfile } from "@/services/brandService";

const BrandProfileEditPage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await getBrandProfile();
        setData(res);
      } catch (err) {
        console.log("Error fetching brand profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, []);

  const handleSave = async (updatedData: any) => {
    try {
      const res = await updateBrandProfile(updatedData);
      setData(res);
      console.log("Saved:", res);
    } catch (err) {
      console.log("Error saving:", err);
    }
  };

  if (loading) return <div>در حال بارگذاری...</div>;

  return <BrandProfileEdit brandData={data} onSave={handleSave} />;
};

export default BrandProfileEditPage;
