// @/components/SliderSection.tsx
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {Button} from "@/components/ui/button";
import ProductCard from "@/components/Product/ProductCard";
import adidasFallback from "@/assets/shortTshirt.jpg";
import {products} from '@/data/data.ts'
import type {SliderItem, SliderSectionProps} from '@/types/homeTypes'

export default function SliderSection({
  title,
  link,
  items,
  currentIndex,
  setIndex,
  itemsPerView,
  isAmazing = false,
  isBrandSlider = false,
}: SliderSectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const gapSize = 16; // gap-4 = 16px

  useEffect(() => {
    const updateItemWidth = () => {
      if (sliderRef.current) {
        const totalGap = gapSize * (itemsPerView - 1);
        const padding = 32;
        const width = sliderRef.current.offsetWidth - padding;
        const computedItemWidth = Math.floor((width - totalGap) / itemsPerView);
        setItemWidth(Math.max(150, computedItemWidth));
      }
    };

    updateItemWidth();
    const timer = setTimeout(updateItemWidth, 100);
    const handler = () => updateItemWidth();
    window.addEventListener("resize", handler);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handler);
    };
  }, [itemsPerView, items.length]);

  const maxIndex = Math.max(0, items.length - itemsPerView);

  return (
    <div
      className={`py-8 px-4 ${isAmazing ? "bg-gradient-to-b from-[#FF6B6B] via-pink-50 to-white" : "bg-white"}`}
      ref={sliderRef}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (itemWidth + gapSize)}px)`,
              }}
            >
              {items.map((item, i) => (
                <div
                  key={isBrandSlider ? item.id : item.id || i}
                  className="flex-shrink-0"
                  style={{ width: `${itemWidth}px` }}
                >
                  <div className="px-1">
                    {isBrandSlider ? (
                      <Link
                        to={`/brand/${item.slug}`}
                        className="block cursor-pointer p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full flex flex-col items-center justify-center"
                      >
                        <img
                          src={item.logo_url || adidasFallback}
                          alt={item.name}
                          className="w-16 h-16 object-contain mb-2 rounded-full"
                        />
                        <span className="text-xs sm:text-sm font-medium text-gray-800 text-center">
                          {item.name}
                        </span>
                      </Link>
                    ) : (
                      <Link to={`/product/${item.id}`} className="block cursor-pointer">
                        {products.map(product => ( 
                        <ProductCard product={product} key={product.id} />
                        ))}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {items.length > itemsPerView && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md disabled:opacity-30 z-10"
              >
                ←
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIndex(Math.min(maxIndex, currentIndex + 1))}
                disabled={currentIndex >= maxIndex}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md disabled:opacity-30 z-10"
              >
                →
              </Button>
            </>
          )}

          <div className="mt-6 text-center">
            <Link to={link}>
              <Button variant="secondary" size="sm">
                مشاهده همه
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}