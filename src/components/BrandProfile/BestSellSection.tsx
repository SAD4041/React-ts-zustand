import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Link } from 'react-router-dom';
import ProductCard from '../Product/ProductCard';
import type { BestSellProps } from '@/types/brandProfileTypes';
import { Button } from '../ui/button';
import ToLeft from '../ui/toLeftSvg';

const BestSell: React.FC<BestSellProps> = ({ brandData, products }) => {
  // Show only first 3 products (as per original logic)
  const displayProducts = products.slice(0, 3);

  if (!brandData?.promotion || displayProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-component mx-section mb-10">
      <div dir="ltr" className="w-full py-6 px-4 md:px-8 bg-gradient-to-r from-promo-gradient-from to-promo-gradient-to rounded-2xl shadow-sm text-light">
        <div className="flex flex-col md:flex-row items-start gap-4">
          {/* Swiper Section (RTL) */}
          <div className="flex-grow relative">
            <Swiper
              dir="rtl"
              modules={[Navigation, FreeMode]}
              spaceBetween={16}
              slidesPerView={1}
              slidesPerGroup={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
              }}
              freeMode={{ enabled: true, momentum: true }}
              navigation={true}
              className="my-swiper"
            >
              {displayProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <Link to={`/products/${product.id}`} className="block">
                    <ProductCard product={product} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Promotion Info (Right Side on desktop) */}
          <div className="flex flex-col items-start gap-2 md:w-64">
            <div className="mb-2 bg-promo-badge-bg text-promo-badge-text text-lg font-bold px-3 py-1.5 rounded-full">
              فروش ویژه!
            </div>
            <h2 className="text-xl font-bold">{brandData.promotion.title}</h2>
            <p className="text-lg mt-1">{brandData.promotion.subtitle}</p>
            <Link
              to={`/brands/${brandData.id}/products`}
              className="mt-4 block text-form-ring no-underline hover:underline"
            >
              مشاهده محصولات برند
            </Link>
          </div>
        </div>
      </div>

      {/* View All Button — matches your preference */}
      <div className="mt-4 text-center">
        <Button
          onClick={() => window.location.href = `/brands/${brandData.id}/products`}
          variant="slider"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm cursor-pointer"
        >
          <ToLeft />
          مشاهده همه
        </Button>
      </div>
    </div>
  );
};

export default BestSell;