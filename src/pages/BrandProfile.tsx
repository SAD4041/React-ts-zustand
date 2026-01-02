// BrandProfile.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBrandProfile, getBrandProducts } from '@/services/brandProfileService';
import useUserStore from '@/store/userStore/userStore';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import BrandHeader from '@/components/BrandProfile/BrandHeaderSection';
import BrandInfo from '@/components/BrandProfile/BrandInfoSection';
import BestSell from '@/components/BrandProfile/BestSellSection';
import BrandProductsSection from '@/components/BrandProfile/BrandProductSection';
import ReviewsSection from '@/components/BrandProfile/CommentsSection';
import Error404 from './Error404';

const BrandProfile = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();
  const [brandData, setBrandData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // دریافت اطلاعات کاربر فعلی از store
  const currentUser = useUserStore((state) => state.user);
  const getUserId = useUserStore((state) => state.getUserId);

  // تشخیص اینکه آیا در حال نمایش پروفایل خودمون هستیم
  const isOwnProfile = brandId === 'me' || brandId === getUserId();

  useEffect(() => {
    // اگر brandId برابر 'me' باشه، از userId خودمون استفاده می‌کنیم
    const actualBrandId = brandId === 'me' ? getUserId() : brandId;

    if (!actualBrandId) {
      navigate('/not-found');
      return;
    }

    const fetchData = async () => {
      try {
        const [brandRes, productsRes] = await Promise.allSettled([
          getBrandProfile(actualBrandId),
          getBrandProducts(actualBrandId)
        ]);

        if (brandRes.status === 'fulfilled') {
          setBrandData(brandRes.value);
        } else {
          console.error('❌ Brand data fetch failed:', brandRes.reason);
          setError('اطلاعات برند در دسترس نیست.');
        }

        if (productsRes.status === 'fulfilled') {
          setProducts(productsRes.value);
        } else {
          console.error('❌ Products fetch failed:', productsRes.reason);
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [brandId, navigate, getUserId]);

  if (!brandId) {
    return <Error404 />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  // اگر brandData null باشه و error داشته باشیم، یک پیام خطا نشون بدیم
  if (!brandData && error) {
    return (
      <div dir="rtl" className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-red-50 rounded-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-700 mb-4">خطا در بارگذاری</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            بازگشت
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="bg-white rounded-lg shadow-sm overflow-hidden">
      {error && (
        <div className="p-3 bg-yellow-50 text-yellow-700 text-sm text-center">
          {error}
        </div>
      )}

      {/* اگر پروفایل خودمون باشه، یک دکمه ویرایش نشون می‌دیم */}
      {isOwnProfile && (
        <div className="p-4 bg-blue-50 border-b">
          <button
            onClick={() => navigate('/brandProfileEdit')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            ویرایش پروفایل
          </button>
        </div>
      )}

      {brandData && (
        <>
          <BrandHeader brandData={brandData} />
          <BrandInfo brandData={brandData} />
          {products.length > 0 && <BestSell brandData={brandData} products={products} />}
        </>
      )}
      
      <BrandProductsSection products={products} brandId={brandId} />
      <ReviewsSection entityId={brandId!} reviewType="brand" />
    </div>
  );
};

export default BrandProfile;