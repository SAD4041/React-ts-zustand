import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { brands } from '@/data/homePageData';

const BrandSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const duplicatedBrands = [...brands, ...brands]; // برای اطمینان از پوشش کامل viewport

  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerWidth = container.scrollWidth / 2; // فقط نیمی از عرض کل (یک دور کامل)

      // انیمیشن بی‌پایان با جهش نرم
      controls.start({
        x: [0, containerWidth],
        transition: {
          duration: 15, // می‌توانید تنظیم کنید
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
      });
    };

    animate();

    return () => controls.stop();
  }, [controls]);

  return (
    <div className="py-4 md:py-6 overflow-hidden">
      <div className="h-32 md:h-40 bg-gradient-to-r from-background-color via-bg-section1 to-background-color rounded-lg">
        <div className="relative overflow-hidden h-full">
          {/* 👇 فقط نیمه چپ را در موبایل نمایش دهیم */}
          <div className="absolute inset-0 flex items-center justify-start">
            <motion.div
              ref={containerRef}
              className="flex items-center gap-6 md:gap-8 whitespace-nowrap"
              dir="rtl"
              animate={controls}
              style={{ display: 'inline-flex' }}
            >
              {duplicatedBrands.map((brand, index) => (
                <a
                  key={`${brand.name}-${index}`}
                  href={`brands/${brand.name}`}
                  className="flex-shrink-0 flex items-center justify-center h-full px-2"
                  aria-label={`برند ${brand.name}`}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-12 w-auto md:h-16 lg:h-20 max-h-full object-contain"
                  />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;