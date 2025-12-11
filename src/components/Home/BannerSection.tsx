// src/components/Home/BannerCarousel.tsx
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useRef, useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import bannerFallback from "@/assets/banner.jpg";

export interface Banner {
  id: number;
  image_url: string;
}

interface BannerCarouselProps {
  banners: Banner[];
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const apiRef = useRef<CarouselApi | null>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);

  // Autoplay + dot sync
  useEffect(() => {
    if (banners.length <= 1) return;

    const handleSelect = () => {
      const api = apiRef.current;
      if (!api) return;
      setCurrentIndex(api.selectedScrollSnap());
    };

    const startAutoplay = () => {
      stopAutoplay(); // اول توقف اطمینانی
      autoplayRef.current = setInterval(() => {
        if (!isHoveredRef.current && apiRef.current) {
          apiRef.current.scrollNext();
        }
      }, 5000); // هر 5 ثانیه
    };

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    // متصل کردن event listener و شروع autoplay
    const api = apiRef.current;
    if (api) {
      api.on("select", handleSelect);
      setCurrentIndex(api.selectedScrollSnap());
      startAutoplay();
    }

    return () => {
      stopAutoplay();
      api?.off("select", handleSelect);
    };
  }, [banners.length]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  if (banners.length === 0) {
    return (
      <div className="relative w-full pt-[40%] sm:pt-[45%] md:pt-[50%] rounded-b-[50px] overflow-hidden">
        <img
          src={bannerFallback}
          alt="بنر پیش‌فرض"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={(api) => {
          apiRef.current = api;
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {banners.map((banner) => (
            <CarouselItem key={banner.id} className="pl-0 basis-full">
              <div className="relative w-full pt-[40%] sm:pt-[45%] md:pt-[50%] rounded-b-[50px] overflow-hidden">
                <img
                  src={banner.image_url || bannerFallback}
                  alt={`بنر ${banner.id}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => apiRef.current?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-white w-6" // فعال: طولانی‌تر = خط تیره
                    : "bg-white/60"  // غیرفعال: نقطه
                }`}
                aria-label={`رفتن به بنر ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Navigation Buttons */}
        {banners.length > 1 && (
          <>
            <div className="mb-6 absolute bottom-4 left-18 z-20">
              <CarouselPrevious className="bg-white/90 hover:bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
                ←
              </CarouselPrevious>
            </div>
            <div className="mb-6 absolute bottom-4 right-18 z-20">
              <CarouselNext className="bg-white/90 hover:bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
                →
              </CarouselNext>
            </div>
          </>
        )}
      </Carousel>
    </div>
  );
}