// BrandProfile.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBrandProfile, getBrandProducts } from '@/services/brandProfile';

import LoadingSpinner from '@/components/Custom/LoadingSpinner';
import BrandHeader from '@/components/BrandProfile/BrandHeaderSection';
import BrandInfo from '@/components/BrandProfile/BrandInfoSection';
import BestSell from '@/components/BrandProfile/BestSellSection';
import BrandProductsSection from '@/components/BrandProfile/BrandProductSection';
import Comments from '@/components/BrandProfile/CommentsSection';


const BrandProfile = () => {
  const { brandId, brandName } = useParams<{ brandId: string; brandName: string }>();
  const [brandData, setBrandData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const brand = await getBrandProfile(brandId, brandName);
        setBrandData(brand);
      } catch (error) {
        console.error("Error fetching brand data:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const prods = await getBrandProducts(brandId, brandName);
        setProducts(prods);
      } catch (error) {
        console.error("Error fetching brand products:", error);
      }
    };

    if (brandId) {
      Promise.all([fetchBrandData(), fetchProducts()]).finally(() => setLoading(false));
    }
  }, [brandId, brandName]);

  if (loading) return <LoadingSpinner />;

  if (!brandData) return <div>.داده‌ای یافت نشد</div>;


  return (
    <div dir="rtl" className="bg-white rounded-lg shadow-sm overflow-hidden">
      
      <BrandHeader />

      <BrandInfo />
      
      <BestSell />
      
      <BrandProductsSection />

      <Comments />

    </div>
  );
};

export default BrandProfile;