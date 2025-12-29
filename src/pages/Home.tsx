import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchHomePageData, sendUserAction, type UserAction } from "@/services/homeService";
import { checkProfileCompletion } from "@/services/profileService";
import type { HomePageResponse } from "@/types/homeTypes";
import BannerSecton from "@/components/Home/BannerSection";
import SurpriseSection from "@/components/Home/SupriseSection";
import BestBrandsSection from "@/components/Home/BestBrand";
import BrandSlider from "@/components/Home/BrandSlider";
import { fallbackCategories, fallbackBanners } from "@/data/homePageData";
import poshtibani from "@/assets/poshtibani.png";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import StyleSection from "@/components/Home/StyleSection";
import CompleteProfileDialog from "@/components/Home/CompleteProfileDialog";
import useUserStore from "@/store/userStore/userStore";

export default function Home() {
  const location = useLocation();
  const [homeData, setHomeData] = useState<HomePageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const profileCompleted = useUserStore((state) => state.profileCompleted);

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHomePageData();
        setHomeData(data);
      } catch (err) {
        console.error("Failed to load home page data:", err);
        setError("خطا در دریافت اطلاعات صفحه اصلی");
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  // چک کردن اینکه از validation اومدیم و پروفایل تکمیل نشده
  useEffect(() => {
    const checkAndShowDialog = async () => {
      // فقط اگر کاربر لاگین باشه
      if (!isAuthenticated) return;

      // چک کنیم که از validation اومدیم
      const fromValidation = location.state?.fromValidation === true;
      if (!fromValidation) return;

      // چک کنیم پروفایل تکمیل شده یا نه (فعلاً از store)
      // بعداً می‌تونیم از API هم بخونیم
      if (!profileCompleted) {
        // اگر پروفایل تکمیل نشده، دیالوگ رو نشون بده
        setShowProfileDialog(true);
      }

      // پاک کردن state تا دفعه بعد که به home میایم دیالوگ نشون نده
      window.history.replaceState({}, document.title);
    };

    checkAndShowDialog();
  }, [location, isAuthenticated, profileCompleted]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !homeData) {
    return (
      <div className="w-full min-h-screen bg-white font-vazir text-center py-8 text-red-500">
        {error || "داده‌ای موجود نیست"}
      </div>
    );
  }

  const banners = homeData.banners ?? fallbackBanners;
  const categories = fallbackCategories;
  const amazing_products = homeData.special_offers ?? [];
  const best_selling_brands = homeData.best_selling_brands ?? [];

  const logUserAction = (action: Omit<UserAction, "timestamp">) => {
    const userAction: UserAction = {
      ...action,
      timestamp: new Date().toISOString(),
    };
    sendUserAction(userAction);
  };

  return (
    <div className="w-full min-h-screen bg-white font-vazir">
      {/* دیالوگ تکمیل پروفایل */}
      <CompleteProfileDialog
        isOpen={showProfileDialog}
        onClose={() => setShowProfileDialog(false)}
      />

      <BannerSecton banners={banners} />

      <div className="mx-8 py-8 px-[40px] max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-right">
          خرید بر اساس دسته‌بندی
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-2 group cursor-pointer"
              onClick={() =>
                logUserAction({
                  action: "click",
                  target_type: "category",
                  target_id: cat.id,
                })
              }
            >
              <div className="w-25 h-25 rounded-full p-2 flex items-center justify-center transition-colors bg-bg-section1 border-2 border-border">
                <img
                  src={cat.image_url || bannerFallback}
                  alt={cat.name}
                  className="w-[85%] h-[85%] object-contain rounded-full transition-transform group-hover:scale-105"
                />
              </div>
              <span className="text-xs sm:text-sm text-bg-section1 font-medium text-center group-hover:text-black transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <SurpriseSection products={amazing_products} />

      <div className="py-12 px-4 mb-10 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-2">
            !استایل خود را، مجازی پرو کنید
          </h2>
          <p className="text-xl text-text mb-6">
            .تجربه‌ی خرید از آینده. لباس‌ها را قبل از خرید، آنلاین استایل کنید
          </p>
          <Link to="/style-pro">
            <Button
              variant="default"
              size="sm"
              className="bg-bg-section2 hover:bg-bg-section1 rounded-full text-white cursor-pointer"
            >
              شروع استایل
            </Button>
          </Link>
        </div>
      </div>

      <BestBrandsSection
        brands={best_selling_brands}
        onBrandClick={logUserAction}
      />

      <StyleSection />

      <BrandSlider />

      <div className="py-8 mx-6 flex justify-end">
        <a
          href="/support"
          className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-border bg-white shadow-lg cursor-pointer hover:shadow-xl transition"
          aria-label="پشتیبانی"
        >
          <img
            src={poshtibani}
            alt="پشتیبانی"
            className="w-10 h-10 object-contain"
          />
        </a>
      </div>
    </div>
  );
}