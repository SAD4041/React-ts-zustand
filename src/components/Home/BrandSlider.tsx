import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { brands } from '@/data/homePageData';

const BrandSlider = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const duplicatedBrands = [...brands, ...brands]; // برای ایجاد حلقه بی‌نهایت

  useEffect(() => {
    const animate = async () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.scrollWidth / 2; // نصف، چون دو برابر کردیم

      // حرکت به راست (چون rtl، جلو رفتن یعنی scroll left کمتر بشه)
      await controls.start({
        x: [`0%`, `-${containerWidth}px`],
        transition: {
          duration: 30, // مثلاً 30 ثانیه برای یک دور کامل — می‌تونی تنظیم کنی
          ease: 'linear',
          repeat: Infinity,
        },
      });
    };

    animate();

    return () => controls.stop();
  }, [controls]);

  return (
    <div className="py-6 overflow-hidden">
      <div className="bg-gradient-to-r from-background-color via-bg-section1 to-background-color rounded-lg p-4">
        <div className="relative overflow-hidden">
          <motion.div
            ref={containerRef}
            className="flex items-center justify-start gap-8 whitespace-nowrap"
            dir="rtl"
            animate={controls}
            style={{ display: 'inline-flex' }}
          >
            {duplicatedBrands.map((brand, index) => (
              <a
                key={`${brand.name}-${index}`}
                href={`brands/${brand.name}`}
                className="block px-4 cursor-pointer"
                aria-label={`برند ${brand.name}`}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-14 sm:h-16 md:h-17 object-contain"
                />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;