import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import SubCategoryCard from './SubCategoryCard';
import { subCategories } from '@/data/productListingData';
import LeftScroll from '../icon loader/leftscroll';
import RightScroll from '../icon loader/rightscroll';

const SubCategorySlider: React.FC = () => {
  return (
    <div className="relative mb-6">
      <Swiper
        dir="rtl"
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView="auto"
        slidesPerGroupAuto={true} // ✅ مهم: هر بار به اندازه اسلایدهای دیده‌شده حرکت کنه
        navigation={{
          prevEl: '.custom-prev-button',
          nextEl: '.custom-next-button',
        }}
        className="py-3 px-4"
      >
        {subCategories.map((cat) => (
          <SwiperSlide
            key={cat.id}
            className="!w-auto"
          >
            <SubCategoryCard category={cat} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className="custom-next-button absolute left-0 top-1/2 z-10 p-2 bg-background rounded-full shadow-md transition-colors"
      >
        <LeftScroll />
      </button>

      <button
        type="button"
        className="custom-prev-button absolute right-0 top-1/2 z-10 p-2 bg-background rounded-full shadow-md transition-colors"
      >
        <RightScroll />
      </button>
    </div>
  );
};

export default SubCategorySlider;