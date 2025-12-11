import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import ProductCard from '@/components/Product/ProductCard';
import { toPersianDigits } from '@/utils/PersianDigits';
import type { Timer, Product, SurpriseSectionProps } from '@/types/homeTypes';

const SurpriseSection: React.FC<SurpriseSectionProps> = ({ products = [] }) => {
  const [timer, setTimer] = useState<Timer>({ days: 0, hours: 3, minutes: 14, seconds: 36 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        let { days, hours, minutes, seconds } = prevTimer;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div dir="ltr" className="w-full py-6 px-4 md:px-8 bg-gradient-to-b from-[#FF6B6B] to-white rounded-xl shadow-sm">
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="flex-grow relative">

          <Swiper
            dir="rtl"
            modules={[Navigation, FreeMode]}
            spaceBetween={16}
            slidesPerView={5}
            slidesPerGroup={1}
            freeMode={{ enabled: true, momentum: true }}
            navigation={true}
            className="my-swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold text-red-700">شگفت انگیز</h2>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl text-white">...تا پایان</span>
            <div className="flex flex-col items-center gap-1">
              <div className="bg-white px-3 py-1 rounded-md border border-red-300 text-red-600 text-lg font-bold">
                {toPersianDigits(timer.hours.toString().padStart(2, '0'))}
              </div>
              <div className="bg-white px-3 py-1 rounded-md border border-red-300 text-red-600 text-lg font-bold">
                {toPersianDigits(timer.minutes.toString().padStart(2, '0'))}
              </div>
              <div className="bg-white px-3 py-1 rounded-md border border-red-300 text-red-600 text-lg font-bold">
                {toPersianDigits(timer.seconds.toString().padStart(2, '0'))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={() => window.location.href = '/products-list'}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 border border-red-300 rounded-full hover:bg-red-50 transition cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          مشاهده همه
        </button>
      </div>
    </div>
  );
};

export default SurpriseSection;