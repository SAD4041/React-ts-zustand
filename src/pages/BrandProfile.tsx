// BrandProfile.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBrandProfile, getBrandProducts } from '@/services/brandProfileService';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import BrandHeader from '@/components/BrandProfile/BrandHeaderSection';
import BrandInfo from '@/components/BrandProfile/BrandInfoSection';
import BestSell from '@/components/BrandProfile/BestSellSection';
import BrandProductsSection from '@/components/BrandProfile/BrandProductSection';
import Comments from '@/components/BrandProfile/CommentsSection';
import Error500 from './Error500';
import Error404 from './Error404';

const BrandProfile = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();
  const [brandData, setBrandData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ type: '404' | '500' | null; message: string }>({
    type: null,
    message: ''
  });

  useEffect(() => {
    // ✅ بررسی اولیه brandId
    if (!brandId) {
      setError({
        type: '404',
        message: 'شناسه برند یافت نشد'
      });
      setLoading(false);
      return;
    }

    const fetchBrandData = async () => {
      try {
        console.log('🔄 Fetching brand profile for ID:', brandId);
        const brand = await getBrandProfile(brandId); // ✅ حذف ! چون بالا چک شد
        console.log('✅ Brand data received:', brand);
        setBrandData(brand);
      } catch (error: any) {
        console.error("❌ Error fetching brand data:", error);
        
        const statusCode = error.response?.status;
        
        if (statusCode === 404 || statusCode === 500) {
          setError({
            type: '404',
            message: 'برند مورد نظر یافت نشد!'
          });
        } else {
          setError({
            type: '500',
            message: 'خطا در دریافت اطلاعات برند'
          });
        }
      }
    };

    const fetchProducts = async () => {
      try {
        console.log('🔄 Fetching brand products for ID:', brandId);
        const prods = await getBrandProducts(brandId); // ✅ حذف ! چون بالا چک شد
        console.log('✅ Products received:', prods);
        setProducts(prods);
      } catch (error: any) {
        console.error("❌ Error fetching brand products:", error);
      }
    };

    // ✅ حالا مطمئنیم brandId وجود دارد
    Promise.all([fetchBrandData(), fetchProducts()]).finally(() => setLoading(false));
  }, [brandId]);

  if (loading) return <LoadingSpinner />;

  if (error.type === '404') {
    return (
      <Error404 />
    );
  }

  if (error.type === '500' || !brandData) {
    return <Error500 message={error.message} />;
  }

  return (
    <div dir="rtl" className="bg-white rounded-lg shadow-sm overflow-hidden">
      <BrandHeader brandData={brandData} />
      <BrandInfo brandData={brandData} />
      {products.length > 0 && <BestSell brandData={brandData} products={products} />}
      <BrandProductsSection products={products} brandId={brandId} />
      <Comments brandId={brandId!} />
    </div>
  );
};

export default BrandProfile;