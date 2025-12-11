import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import type { Brand, BestBrandsSectionProps } from '@/types/homeTypes';

const BestBrandsSection: React.FC<BestBrandsSectionProps> = ({ brands = [], onBrandClick }) => {
  return (
    <div className="w-full py-6 px-4 md:px-8 bg-white shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="flex-grow">
          {/* Swiper با دکمه‌های پیش‌فرض */}
          <Swiper
            dir="rtl"
            modules={[Navigation, FreeMode]}
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            freeMode={{ enabled: true }}
            navigation={true} // ✅ فقط همین کافیه
            className="mySwiper !pb-4"
          >
            {brands.length > 0 ? (
              brands.map((brand) => (
                <SwiperSlide key={brand.id} className="!flex !justify-center">
                  <div
                    className="flex-shrink-0 cursor-pointer group text-center"
                    onClick={(e) => {
                      e.preventDefault();
                      onBrandClick?.({ action: "click", target_type: "brand", target_id: brand.id });
                      window.location.href = `/brand/${brand.slug}`;
                    }}
                  >
                    <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-2 group-hover:bg-gray-400 transition-colors">
                      <img
                        src={brand.logo_url}
                        alt={brand.name}
                        className="h-10 w-auto object-contain filter grayscale group-hover:grayscale-0 transition"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-700 truncate">{brand.name}</p>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="text-center py-4 text-gray-500">برندی یافت نشد.</div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800 text-right">برند‌ها</h2>
          <button
            onClick={() => window.location.href = '/brands'}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 border border-red-300 rounded-full hover:bg-red-50 transition cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            مشاهده همه
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestBrandsSection;