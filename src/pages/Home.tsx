import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/ui/button";
import ProductCard from "@/components/Product/ProductCard";
import { fetchHomePageData } from "@/services/homeService";
import type { HomePageResponse } from "@/types/homeTypes";
import SliderSection from "@/components/Home/SliderSection";
import Header from "@/components/Header/Header";

import bannerFallback from "@/assets/banner.jpg";
import adidasFallback from "@/assets/shortTshirt.jpg";
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

export default function Home() {
  const [homeData, setHomeData] = useState<HomePageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [amazingIndex, setAmazingIndex] = useState(0);
  const [bestIndex, setBestIndex] = useState(0);

  const getItemsPerView = (section: "amazing" | "best") => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width >= 1280) return section === "amazing" ? 5 : 4;
    if (width >= 1024) return section === "amazing" ? 4 : 3;
    if (width >= 768) return 3;
    if (width >= 640) return 2;
    return 1;
  };

  const [amazingPerView, setAmazingPerView] = useState(getItemsPerView("amazing"));
  const [bestPerView, setBestPerView] = useState(getItemsPerView("best"));

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

  useEffect(() => {
    const handleResize = () => {
      const newAmazing = getItemsPerView("amazing");
      const newBest = getItemsPerView("best");
      setAmazingPerView(newAmazing);
      setBestPerView(newBest);

      if (homeData) {
        setAmazingIndex((i) => Math.min(i, Math.max(0, homeData.amazing_products.length - newAmazing)));
        setBestIndex((i) => Math.min(i, Math.max(0, homeData.best_selling_brands.length - newBest)));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [homeData]);


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

  const data = homeData || {
    banner: { image_url: bannerFallback },
    categories: [
      { id: 1, name: "اکسسوری", slug: "accessories", image_url: category1  },
      { id: 2, name: "لباس گرم", slug: "winter-wear", image_url: category2 },
      { id: 3, name: "شلوار", slug: "pants", image_url: category3 },
      { id: 4, name: "لباس زنانه", slug: "women", image_url: category4 },
      { id: 5, name: "پلیور", slug: "sweater", image_url: category5 },
      { id: 6, name: "تیشرت", slug: "tshirt", image_url: category6 },
    ],
    amazing_products: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `محصول شگفت‌انگیز ${i + 1}`,
      price: 150000,
      original_price: 200000,
      discount_percent: 25,
      image_url: bannerFallback,
      category: "tshirt",
      in_stock: true,
    })),
    best_selling_brands: [
      { id: 1, name: "Adidas", logo_url: adidasFallback, slug: "adidas" },
      { id: 2, name: "Nike", logo_url: adidasFallback, slug: "nike" },
      { id: 3, name: "Zara", logo_url: adidasFallback, slug: "zara" },
      { id: 4, name: "Gucci", logo_url: adidasFallback, slug: "gucci" },
      { id: 5, name: "Dior", logo_url: adidasFallback, slug: "dior" },
      { id: 6, name: "Chanel", logo_url: adidasFallback, slug: "chanel" },
      { id: 7, name: "Burberry", logo_url: adidasFallback, slug: "burberry" },
      { id: 8, name: "Fendi", logo_url: adidasFallback, slug: "fendi" },
    ],
    style_palettes: [
      { id: 1, title: "کلاسیک", slug: "classic", image_url: bannerFallback },
      { id: 2, title: "اسپرت", slug: "sport", image_url: bannerFallback },
      { id: 3, title: "وینتیج", slug: "vintage", image_url: bannerFallback },
      { id: 4, title: "بوهو", slug: "boho", image_url: bannerFallback },
    ],
  };

  const { banner, categories, amazing_products, best_selling_brands, style_palettes } = data;

  return (
    <div className="w-full min-h-screen bg-white font-vazir">
      <Header/>

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

      {/* دسته‌بندی‌ها */}
      <div className="py-8 px-4 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-right">خرید بر اساس دسته‌بندی</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-pink-200 p-2 flex items-center justify-center group-hover:bg-pink-300 transition-colors">
                <img
                  src={cat.image_url || bannerFallback}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-xs sm:text-sm text-gray-700 font-medium text-center group-hover:text-black transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* شگفت‌انگیز */}
      <SliderSection
        title="شگفت‌انگیز"
        link="/products?category=amazing"
        items={amazing_products}
        currentIndex={amazingIndex}
        setIndex={setAmazingIndex}
        itemsPerView={amazingPerView}
        isAmazing={true}
      />

      <div className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">استایل خود را، مجازی پرو کنید!</h2>
          <p className="text-sm text-pink-600 mb-6">
            تجربه‌ی خرید از آینده. لباس‌ها را قبل از خرید، آنلاین استایل کنید.
          </p>
          <Link to="/style-pro">
            <Button variant="primary" size="sm" className="bg-pink-600 hover:bg-pink-700 text-white">
              شروع استایل
            </Button>
          </Link>
        </div>
      </div>

      {/* پرفروش‌ترین‌ها — برندها */}
      <SliderSection
        title="پرفروش‌ترین‌ها"
        link="/brands"
        items={best_selling_brands}
        currentIndex={bestIndex}
        setIndex={setBestIndex}
        itemsPerView={bestPerView}
        isBrandSlider={true}
      />

      {/* نوار لوگوهای برندها */}
      <div className="py-6 bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold text-center mb-4">پرفروش ترین های اخیر</h2>
          <div className="flex gap-8 overflow-x-auto scrollbar-hide py-2">
            {best_selling_brands.map((brand) => (
              <Link
                key={brand.id}
                to={`/brand/${brand.slug}`}
                className="flex-shrink-0 cursor-pointer flex justify-center items-center"
              >
                <img
                  src={brand.logo_url || adidasFallback}
                  alt={brand.name}
                  className="h-10 object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* بخش "خرید بر اساس استایل" — بدون کادر و سایه، با هاور زوم و ارتفاع ثابت */}
      <div className="py-12 px-4 from-pink-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">خرید بر اساس استایل</h2>

          {/* لایوت سفارشی بدون کادر */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* ستون چپ - عکس بزرگ "کلاسیک" */}
            <div className="md:w-1/2 relative group cursor-pointer overflow-hidden rounded-xl">
              <Link to={`/style/classic`} className="block h-[400px]">
                <img
                  src={style1}
                  alt="کلاسیک"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <p className="absolute bottom-4 left-4 text-white text-xl font-bold">کلاسیک</p>
              </Link>
            </div>

            {/* ستون راست - شامل دو ردیف */}
            <div className="md:w-1/2 flex flex-col gap-4">
              {/* ردیف بالا: اسپرت + استریت */}
              <div className="flex gap-4">
                {/* اسپرت */}
                <div className="w-1/2 relative group cursor-pointer overflow-hidden rounded-xl">
                  <Link to={`/style/sport`} className="block h-[140px]">
                    <img
                      src={style2}
                      alt="اسپرت"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <p className="absolute bottom-4 left-4 text-white text-lg font-bold">اسپرت</p>
                  </Link>
                </div>

                {/* استریت */}
                <div className="w-1/2 relative group cursor-pointer overflow-hidden rounded-xl">
                  <Link to={`/style/street`} className="block h-[140px]">
                    <img
                      src={style3}
                      alt="استریت"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <p className="absolute bottom-4 left-4 text-white text-lg font-bold">استریت</p>
                  </Link>
                </div>
              </div>

              {/* ردیف پایین: وینتیج */}
              <div className="relative group cursor-pointer overflow-hidden rounded-xl">
                <Link to={`/style/vintage`} className="block h-[280px]">
                  <img
                    src={style4}
                    alt="وینتیج"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <p className="absolute bottom-4 left-4 text-white text-xl font-bold">وینتیج</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}