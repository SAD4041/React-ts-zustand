import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { brands } from "@/data/homePageData";

const BrandSlider = () => {
  

  return (
    <div className="py-6">
      <div className="bg-gradient-to-r from-background-color via-bg-section1 to-background-color rounded-lg p-4">
        <Swiper
          dir="rtl"
          modules={[Navigation, FreeMode]}
          spaceBetween={5}
          slidesPerView={5}
          slidesPerGroup={1}
          freeMode={{ enabled: true, momentum: true }}
          navigation={true}
          className="brand-swiper"
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={index} className="flex justify-center px-20">
              <a
                href={`brands/${brand.name}`}
                className="block cursor-pointer"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-14 sm:h-16 md:h-17 object-contain"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandSlider;