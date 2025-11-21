// components/sections/BrandSlider.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import image1 from '@/assets/image1.png';
import adidas from '@/assets/Adidas-Logo.wine.png'
import nike from '@/assets/Nike,_Inc.-Logo.wine.png'
import zara from '@/assets/Zara_(retailer)-Logo.wine.png'
import gucci from '@/assets/Gucci-Logo.wine.png'
import dior from '@/assets/Christian_Dior_(fashion_house)-Logo.wine.png'
import chanel from '@/assets/Chanel-Logo.wine.png'
import burberry from '@/assets/Burberry-Logo.wine.png'
import fendi from '@/assets/Fendi-Logo.wine.png'

const BrandSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // لیست برندها (هر کدام یک لوگو و لینک دارند)
  const brands = [
    { name: 'Adidas', logo: adidas, link: '/brand/adidas' },
    { name: 'Balenciaga', logo: nike, link: '/brand/nike' },
    { name: 'Chanel', logo: zara, link: '/brand/zara' },
    { name: 'Zara', logo: gucci, link: '/brand/gucci' },
    { name: 'Dior', logo: dior, link: '/brand/dior' },
    { name: 'Burberry', logo: chanel, link: '/brand/chanel' },
    { name: 'Fendi', logo: burberry, link: '/brand/burberry' },
    { name: 'Nike', logo: fendi, link: '/brand/fendi' },
  ];

  const itemsPerPage = 10;
  const totalItems = brands.length;

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

  const visibleBrands = brands.slice(currentIndex, currentIndex + itemsPerPage);

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
    <div className="w-full my-[100px] py-6 px-4 md:px-8 bg-gray-100 rounded-xl shadow-sm">
      {/* ساختار اصلی: یک flex-row */}
      <div className="flex flex-col md:flex-row items-center gap-4">

        {/* دکمه چپ */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`p-3 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition cursor-pointer ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="قبلی"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* لیست برندها */}
        <div className="flex-grow overflow-x-hidden px-4">
          <motion.div
            className="flex space-x-10 justify-center"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            key={currentIndex}
          >
            <AnimatePresence initial={false}>
              {visibleBrands.map((brand, index) => (
                <motion.div
                  key={brand.name}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 cursor-pointer"
                >
                  <a href={brand.link} className="block">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition"
                    />
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* دکمه راست */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= totalItems - itemsPerPage}
          className={`p-3 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition cursor-pointer ${
            currentIndex >= totalItems - itemsPerPage ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="بعدی"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </div>
  );
};

export default BrandSlider;