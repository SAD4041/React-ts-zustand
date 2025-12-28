import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import type { BestBrandsSectionProps } from '@/types/homeTypes';
import { Button } from '../ui/button';
import ToLeft from '../ui/toLeftSvg';

const BestBrandsSection: React.FC<BestBrandsSectionProps> = ({ brands = [], onBrandClick }) => {
  return (
    <div className="w-full py-6 px-4 mb-10 md:px-8 bg-bg-section1 shadow-sm rounded-3xl border border-border">
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="flex-grow">
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
            navigation={true} 
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
                    <div className="w-20 h-20 rounded-full bg- flex items-center justify-center mb-2 group-hover:bg-section-2 transition-colors">
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
          <h2 className="text-xl font-bold text-text text-right">برند‌ها</h2>
          <Button
            onClick={() => window.location.href = '/brands'}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-destructive hover:text-card-text border border-destructive hover:border-border rounded-full hover:bg-bg-section1 transition cursor-pointer"
          >
            <ToLeft />
            مشاهده همه
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BestBrandsSection;