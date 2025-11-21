import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/ui/button";
import ProductCard from "@/components/Product/ProductCard";
import { fetchHomePageData, sendUserAction, type UserAction } from "@/services/homeService";
import type { HomePageResponse } from "@/types/homeTypes";
import SliderSection from "@/components/Home/SliderSection";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SurpriseSection from "@/components/Home/SupriseSection";
import BestBrandsSection from "@/components/Home/BestBrand";
import BrandSlider from "@/components/Home/BrandSlider";

import bannerFallback from "@/assets/banner.jpg";
import category1 from "@/assets/category1.png";
import category2 from "@/assets/category2.png";
import category3 from "@/assets/category3.png";
import category4 from "@/assets/category4.png";
import category5 from "@/assets/category5.png";
import category6 from "@/assets/category6.png";
import style1 from "@/assets/style1.jpg";
import style2 from "@/assets/style2.jpg";
import style3 from "@/assets/style3.jpg";
import style4 from "@/assets/style4.jpg";
import poshtibani from "@/assets/poshtibani.png"

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
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        <div className="text-lg font-medium text-gray-600">در حال بارگذاری صفحه اصلی...</div>
      </div>
    );
  }

  if (error) {
    console.warn("Home page error fallback activated");
  }

  // داده‌های واقعی یا فیک در صورت خطا
  const data = homeData || {
    banner: { id: 1, image_url: bannerFallback },
    categories: [
      { id: 1, name: "اکسسوری", slug: "accessories", image_url: category1 },
      { id: 2, name: "لباس گرم", slug: "winter-wear", image_url: category2 },
      { id: 3, name: "شلوار", slug: "pants", image_url: category3 },
      { id: 4, name: "لباس زنانه", slug: "women", image_url: category4 },
      { id: 5, name: "پلیور", slug: "sweater", image_url: category5 },
      { id: 6, name: "تیشرت", slug: "tshirt", image_url: category6 },
    ],
    amazing_products: [],
    best_selling_brands: [],
    style_palettes: [
      { id: 1, title: "کلاسیک", slug: "classic", image_url: style1 },
      { id: 2, title: "اسپرت", slug: "sport", image_url: style2 },
      { id: 3, title: "وینتیج", slug: "vintage", image_url: style3 },
      { id: 4, title: "بوهو", slug: "boho", image_url: style4 },
    ],
  };

  const { banner, categories, amazing_products, best_selling_brands, style_palettes } = data;

  const logUserAction = (action: Omit<UserAction, 'timestamp'>) => {
    const userAction: UserAction = {
      ...action,
      timestamp: new Date().toISOString(),
    };
    sendUserAction(userAction);
  };

  return (
    <div className="w-full min-h-screen bg-white font-vazir">

      <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 rounded-b-[50px] overflow-hidden">
          <img
            src={banner.image_url || bannerFallback}
            alt="فروش ویژه"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-6 left-6 z-10">
          <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white shadow-md">
            ←
          </Button>
        </div>
        <div className="absolute bottom-6 right-6 z-10">
          <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white shadow-md">
            →
          </Button>
        </div>
      </div>

      <div className="py-8 px-4 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-right">خرید بر اساس دسته‌بندی</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-2 group cursor-pointer"
              onClick={() => logUserAction({ action: "click", target_type: "category", target_id: cat.id })}
            >
              <div className="w-20 h-20 rounded-full p-2 flex items-center justify-center transition-colors">
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

      <SurpriseSection />

      <div className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-2">!استایل خود را، مجازی پرو کنید</h2>
          <p className="text-sm text-pink-600 mb-6">
            .تجربه‌ی خرید از آینده. لباس‌ها را قبل از خرید، آنلاین استایل کنید
          </p>
          <Link to="/style-pro">
            <Button variant="primary" size="sm" className="bg-pink-600 hover:bg-pink-700 rounded-full text-white cursor-pointer">
              شروع استایل
            </Button>
          </Link>
        </div>
      </div>

      <BestBrandsSection brands={best_selling_brands} onBrandClick={logUserAction} />

      <BrandSlider brands={best_selling_brands} onBrandClick={logUserAction} />

      <div className="py-12 px-4 from-pink-50 to-white">
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
                <p className="absolute bottom-4 right-4 text-black text-xl font-bold">کلاسیک</p>
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
                    <p className="absolute bottom-4 right-4 text-black text-lg font-bold">اسپرت</p>
                  </Link>
                </div>
                <div className="w-1/2 relative group cursor-pointer overflow-hidden rounded-xl">
                  <Link to={`/style/street`} className="block aspect-square">
                    <img
                      src={style_palettes[2]?.image_url || style3}
                      alt="استریت"
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <p className="absolute bottom-4 right-4 text-black text-lg font-bold">استریت</p>
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
                  <p className="absolute bottom-4 right-4 text-black text-xl font-bold">وینتیج</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 mx-6 flex justify-end">
        <a
          href="/support"
          className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-gray-800 bg-white shadow-lg cursor-pointer hover:shadow-xl transition"
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