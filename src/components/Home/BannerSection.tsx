import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRef, useState, useEffect, useCallback } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import type {BannerCarouselProps} from "@/types/homeTypes";
import bannerFallback from "@/assets/banner.jpg";
import ToRight from "../ui/toRightSvg";
import ToLeft from "../ui/toLeftSvg";


export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const apiRef = useRef<CarouselApi | null>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (banners.length <= 1) return;

    const api = apiRef.current;
    if (!api) return;

    const onSelect = () => {
      requestAnimationFrame(() => {
        const snap = api.selectedScrollSnap();
        setCurrentIndex(snap);
      });
    };

    api.on("select", onSelect);
    setCurrentIndex(api.selectedScrollSnap());

    return () => {
      api.off("select", onSelect);
    };
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;

    const startAutoplay = () => {
      stopAutoplay();
      autoplayRef.current = setInterval(() => {
        if (!isHoveredRef.current && apiRef.current) {
          apiRef.current.scrollNext();
          requestAnimationFrame(() => {
            const snap = apiRef.current?.selectedScrollSnap() ?? 0;
            if (snap !== currentIndexRef.current) {
              setCurrentIndex(snap);
            }
          });
        }
      }, 10000);
    };

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    startAutoplay();

    return () => {
      stopAutoplay();
    };
  }, [banners.length]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  const scrollPrev = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.scrollPrev();
      requestAnimationFrame(() => {
        const snap = apiRef.current!.selectedScrollSnap();
        setCurrentIndex(snap);
      });
    }
  }, []);

  const scrollNext = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.scrollNext();
      requestAnimationFrame(() => {
        const snap = apiRef.current!.selectedScrollSnap();
        setCurrentIndex(snap);
      });
    }
  }, []);

  const scrollTo = useCallback((index: number) => {
    if (apiRef.current) {
      apiRef.current.scrollTo(index);
      setCurrentIndex(index);
    }
  }, []);

  // --- render ---
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
          if (api && banners.length > 1) {
            setCurrentIndex(api.selectedScrollSnap());
          }
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
      </Carousel>

      {/* Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index ? "bg-white w-6" : "bg-white/60"
              }`}
              aria-label={`رفتن به بنر ${index + 1}`}
            />
          ))}
        </div>
      )}

      {banners.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute bottom-4 left-6 z-20 bg-white/90 hover:bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
            aria-label="بنر قبلی"
          >
            <ToLeft />
          </button>
          <button
            onClick={scrollNext}
            className="absolute bottom-4 right-6 z-20 bg-white/90 hover:bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
            aria-label="بنر بعدی"
          >
            <ToRight />
          </button>
        </>
      )}
    </div>
  );
}