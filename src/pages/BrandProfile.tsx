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
import Error404 from './Error404';

const BrandProfile = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();
  const [brandData, setBrandData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // فقط برای لاگ/توست — صفحه crash نمی‌کند

  useEffect(() => {
    if (!brandId) {
      // ❗ فقط redirect یا نمایش صفحه 404 برای عدم وجود brandId
      navigate('/not-found'); // یا نمایش <Error404 /> در render
      return;
    }

    const fetchData = async () => {
      try {
        // ✅ درخواست‌ها parallel اما مستقل
        const [brandRes, productsRes] = await Promise.allSettled([
          getBrandProfile(brandId),
          getBrandProducts(brandId)
        ]);

        if (brandRes.status === 'fulfilled') {
          setBrandData(brandRes.value);
        } else {
          console.error('❌ Brand data fetch failed:', brandRes.reason);
          setError('اطلاعات برند در دسترس نیست.');
          // ولی brandData = null می‌ماند → کامپوننت‌ها باید با این حالت کار کنند
        }

        if (productsRes.status === 'fulfilled') {
          setProducts(productsRes.value);
        } else {
          console.error('❌ Products fetch failed:', productsRes.reason);
          setProducts([]); // خالی بماند
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [brandId, navigate]);

  // 🔹 فقط در صورت عدم وجود brandId اصلاً — نه خطای API — 404 نشان داده شود
  if (!brandId) {
    return <Error404 />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  // ✅ اینجا دیگر error منجر به render کردن صفحه خطا نمی‌شود
  // فقط می‌توانید یک توست/پیام هشدار نمایش دهید (اختیاری)
  return (
    <div dir="rtl" className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* مثلاً یک پیام خطا در بالای صفحه (اختیاری) */}
      {error && (
        <div className="p-3 bg-yellow-50 text-yellow-700 text-sm text-center">
          {error}
        </div>
      )}

      {/* همیشه رندر شوند — حتی اگر brandData null باشد */}
      <BrandHeader brandData={brandData} />
      <BrandInfo brandData={brandData} />
      
      {/* فقط اگر محصولی وجود داشت */}
      {products.length > 0 && <BestSell brandData={brandData} products={products} />}
      
      <BrandProductsSection products={products} brandId={brandId} />
      <Comments brandId={brandId} />
    </div>
  );
};

export default BrandProfile;