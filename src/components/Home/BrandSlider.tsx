import React from 'react';

import adidas from '@/assets/brands/Adidas-Logo.wine.png';
import dior from '@/assets/brands/Christian_Dior_(fashion_house)-Logo.wine.png';
import balenciaga from '@/assets/brands/Balenciaga-Logo.wine.png';
import chanel from '@/assets/brands/Chanel-Logo.wine.png';
import zara from '@/assets/brands/Zara_(retailer)-Logo.wine.png';
import louisVuitton from '@/assets/brands/Louis_Vuitton-Logo.wine.png';
import burberry from '@/assets/brands/Burberry-Logo.wine.png';
import fendi from '@/assets/brands/Fendi-Logo.wine.png';
import nike from '@/assets/brands/Nike,_Inc.-Logo.wine.png';
import gucci from '@/assets/brands/Gucci-Logo.wine.png';

const BrandSlider = () => {
  const brands = [
    { name: "Adidas", logo: adidas },
    { name: "Dior", logo: dior },
    { name: "Balenciaga", logo: balenciaga },
    { name: "Chanel", logo: chanel },
    { name: "Zara", logo: zara },
    { name: "Louis Vuitton", logo: louisVuitton },
    { name: "Burberry", logo: burberry },
    { name: "Fendi", logo: fendi },
    { name: "Nike", logo: nike },
    { name: "Gucci", logo: gucci }
  ];

  return (
    <div className="py-6 ">
      <div className="bg-gradient-to-r from-background-color via-bg-section1 to-background-color rounded-lg p-4">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          {brands.map((brand, index) => (
            <div key={index} className="flex-shrink-0">
              <a href={`brands/${brand.name}`}>
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-17 w-auto object-contain cursor-pointer"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;