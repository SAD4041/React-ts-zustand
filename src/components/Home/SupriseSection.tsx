// components/sections/SurpriseSection.tsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/Product/ProductCard';
import { products } from '@/data/data';
import { toPersianDigits } from '@/utils/PersianDigits';

interface Timer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const SurpriseSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState<Timer>({ days: 0, hours: 3, minutes: 14, seconds: 36 });

  const itemsPerPage = 5; // تعداد محصولات نمایش داده شده در هر اسلاید
  const totalItems = products.length;

  // تابع برای اسکرول به سمت راست (یک محصول)
  const handleNext = () => {
    if (currentIndex < totalItems - itemsPerPage) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // تابع برای اسکرول به سمت چپ (یک محصول)
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // تابع برای ریست کردن تایمر
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

  // محصولات قابل نمایش در این اسلاید
  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage);

  // انیمیشن برای لیست محصولات
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="w-full py-6 px-4 md:px-8 bg-gradient-to-b from-[#FF6B6B] to-white rounded-xl shadow-sm">
      {/* ساختار اصلی: یک flex-row */}
      <div className="flex flex-col md:flex-row items-start gap-4">

        {/* بخش چپ: لیست محصولات */}
        <div className="flex-grow relative">
          {/* هدر بخش (فقط برای responsive) */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-red-700">شگفت انگیز</h2>
          </div>

          {/* دکمه چپ */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 z-10 p-3 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition cursor-pointer ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="قبلی"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* لیست محصولات */}
          <div className="overflow-x-hidden px-4">
            <motion.div
              className="flex space-x-4"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              key={currentIndex}
            >
              <AnimatePresence initial={false}>
                {visibleProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 cursor-pointer"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* دکمه راست */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= totalItems - itemsPerPage}
            className={`absolute right-0 z-10 p-3 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition cursor-pointer ${
              currentIndex >= totalItems - itemsPerPage ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="بعدی"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* بخش راست: تایمر */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold text-red-700">شگفت انگیز</h2>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-gray-500">تا پایان...</span>
            <div className="flex flex-col items-center gap-1">
              <div className="bg-white px-3 py-1 rounded-md border border-red-300 text-red-600 font-mono text-lg font-bold">
                {toPersianDigits(timer.hours.toString().padStart(2, '0'))}
              </div>
              <div className="bg-white px-3 py-1 rounded-md border border-red-300 text-red-600 font-mono text-lg font-bold">
                {toPersianDigits(timer.minutes.toString().padStart(2, '0'))}
              </div>
              <div className="bg-white px-3 py-1 rounded-md border border-red-300 text-red-600 font-mono text-lg font-bold">
                {toPersianDigits(timer.seconds.toString().padStart(2, '0'))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* دکمه مشاهده همه */}
      <div className="mt-4 text-center">
        <button
          onClick={() => window.location.href = '/all-surprise-products'} // یا navigate از react-router
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