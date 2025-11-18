import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/Product/ProductCard';
import { products } from '@/data/data';

const BestSellersSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 4;
  const totalItems = products.length;

  const handleNext = () => {
    if (currentIndex < totalItems - itemsPerPage) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage);

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
    <div className="w-full py-6 px-4 md:px-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="flex-grow relative">
          <div className="md:hidden flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">پرفروش‌ترین‌های اخیر</h2>
          </div>

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

        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800 text-right">پرفروش‌ترین‌های اخیر</h2>
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
    </div>
  );
};

export default BestSellersSection;