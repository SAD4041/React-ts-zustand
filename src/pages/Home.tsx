import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchHomePageData, sendUserAction, type UserAction } from "@/services/homeService";
import type { HomePageResponse, Banner } from "@/types/homeTypes";
import BannerSecton from "@/components/Home/BannerSection";
import SurpriseSection from "@/components/Home/SupriseSection";
import BestBrandsSection from "@/components/Home/BestBrand";
import BrandSlider from "@/components/Home/BrandSlider";
import {fallbackCategories, fallbackBanners, fallbackStylePalettes} from "@/data/homePageData";
import poshtibani from "@/assets/poshtibani.png";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Home() {
  const [homeData, setHomeData] = useState<HomePageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  if (error || !homeData) {
    return (
      <div className="w-full min-h-screen bg-white font-vazir text-center py-8 text-red-500">
        {error || "داده‌ای موجود نیست"}
      </div>
    );
  }


  const banners = homeData.banners ?? fallbackBanners;
  const categories = fallbackCategories; // همیشه از mock استفاده می‌شود
  const style_palettes = fallbackStylePalettes; // همیشه از mock استفاده می‌شود
  const amazing_products = homeData.special_offers ?? [];
  const best_selling_brands = homeData.best_selling_brands ?? [];

  const logUserAction = (action: Omit<UserAction, 'timestamp'>) => {
    const userAction: UserAction = {
      ...action,
      timestamp: new Date().toISOString(),
    };
    sendUserAction(userAction);
  };

  return (
    <div className="w-full min-h-screen bg-white font-vazir">
      <BannerSecton banners={banners} />

      <div className="mx-8 py-8 px-[40px] max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-right">خرید بر اساس دسته‌بندی</h2>
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
              <div className="w-25 h-25 rounded-full p-2 flex items-center justify-center transition-colors">
                <img
                  src={cat.image_url || bannerFallback}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-xs sm:text-sm text-[#C57265] font-medium text-center group-hover:text-black transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <SurpriseSection products={amazing_products}/>

      <div className="py-12 px-4 mb-10 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-2">!استایل خود را، مجازی پرو کنید</h2>
          <p className="text-sm text-pink-600 mb-6">
            .تجربه‌ی خرید از آینده. لباس‌ها را قبل از خرید، آنلاین استایل کنید
          </p>
          <Link to="/style-pro">
            <Button
              variant="default"
              size="sm"
              className="bg-pink-600 hover:bg-pink-700 rounded-full text-white cursor-pointer"
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

      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">خرید بر اساس استایل</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-2/3 relative group cursor-pointer overflow-hidden rounded-xl">
              <Link to={`/style/classic`} className="block aspect-square">
                <img
                  src={style_palettes[0]?.image_url || style1}
                  alt="کلاسیک"
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                <p className="absolute bottom-4 right-4 text-black text-xl font-bold">
                  کلاسیک
                </p>
              </Link>
            </div>
            <div className="md:w-1/2 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="w-1/2 relative group cursor-pointer overflow-hidden rounded-xl">
                  <Link to={`/style/sport`} className="block aspect-square">
                    <img
                      src={style_palettes[1]?.image_url || style2}
                      alt="اسپرت"
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <p className="absolute bottom-4 right-4 text-black text-lg font-bold">
                      اسپرت
                    </p>
                  </Link>
                </div>
                <div className="w-1/2 relative group cursor-pointer overflow-hidden rounded-xl">
                  <Link to={`/style/street`} className="block aspect-square">
                    <img
                      src={style_palettes[2]?.image_url || style3}
                      alt="استریت"
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <p className="absolute bottom-4 right-4 text-black text-lg font-bold">
                      استریت
                    </p>
                  </Link>
                </div>
              </div>
              <div className="relative group cursor-pointer overflow-hidden rounded-xl">
                <Link to={`/style/vintage`} className="block aspect-square">
                  <img
                    src={style_palettes[3]?.image_url || style4}
                    alt="وینتیج"
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  <p className="absolute bottom-4 right-4 text-black text-xl font-bold">
                    وینتیج
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BrandSlider />

      <div className="py-8 mx-6 flex justify-end">
        <a
          href="/support"
          className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-border bg-white shadow-lg cursor-pointer hover:shadow-xl transition"
          aria-label="پشتیبانی"
        >
          <img src={poshtibani} alt="پشتیبانی" className="w-10 h-10 object-contain" />
        </a>
      </div>
    </div>
  );
}