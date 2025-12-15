import React from 'react';
import locationIcon from '@/assets/brand-profile/Pin_alt_light.png';
import phoneIcon from '@/assets/brand-profile/Phone.png';
import emailIcon from '@/assets/brand-profile/Message.png';
import calendarIcon from '@/assets/brand-profile/Date_today.png';
import type { BrandInfoProps } from '@/types/homeTypes';

const BrandInfo: React.FC<BrandInfoProps> = ({ brandData }) => {
  return (
    <div className="mx-[150px] mt-6 rounded-2xl overflow-hidden border shadow-lg">
      <div className="bg-brand-badge-bg px-5 py-5 border-b border-gray-200 height-[200px]">
        <h2 className="text-lg text-center font-semibold text-gray-800">درباره برند و اطلاعات تماس</h2>
      </div>

      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="mt-8 px-6 text-gray-700 leading-relaxed col-span-2">
          <p>{brandData.description}</p>
        </div>
        <div className="px-6 space-y-3 col-span-1">
          {brandData.location && (
            <div className="flex items-center gap-3 py-3">
              <div className="bg-brand-icon-bg p-2 rounded-full">
                <img src={locationIcon} alt="موقعیت" className="h-7 w-7 text-gray-600" />
              </div>
              <span className="text-gray-700">{brandData.location}</span>
            </div>
          )}
          {brandData.phone && (
            <div className="flex items-center gap-3 py-3">
              <div className="bg-brand-icon-bg p-2 rounded-full">
                <img src={phoneIcon} alt="تلفن" className="h-7 w-7 text-gray-600" />
              </div>
              <span className="text-gray-700">{brandData.phone}</span>
            </div>
          )}
          {brandData.email && (
            <div className="flex items-center gap-3 py-3">
              <div className="bg-brand-icon-bg p-2 rounded-full">
                <img src={emailIcon} alt="ایمیل" className="h-7 w-7 text-gray-600" />
              </div>
              <span className="text-gray-700">{brandData.email}</span>
            </div>
          )}
          {brandData.since && (
            <div className="flex items-center gap-3 py-3">
              <div className="bg-brand-icon-bg p-2 rounded-full">
                <img src={calendarIcon} alt="تاریخ" className="h-7 w-7 text-gray-600" />
              </div>
              <span className="text-gray-700">{brandData.since}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandInfo;