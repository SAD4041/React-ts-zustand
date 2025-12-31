import React from 'react';
import starIcon from '@/assets/brand-profile/Star.png';
import shareIcon from '@/assets/brand-profile/Send_light.png';
import shopIcon from '@/assets/brand-profile/Shop.png';
import banner from '@/assets/brand-profile/banner.png';
import avatar from '@/assets/avatar.png';
import type { BrandHeaderProps } from "@/types/brandProfileTypes";
import LoadingSpinner from '../ui/LoadingSpinner';

const BrandHeader: React.FC<BrandHeaderProps> = ({ brandData }) => {

  if (!brandData) {
    <LoadingSpinner />
  }

  const handleFollow = () => {
    // TODO: Implement follow functionality
    console.log('Follow brand:', brandData.id);
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: brandData.name,
        text: brandData.slogan,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('لینک کپی شد!');
    }
  };

  return (
    <div>
      <div className="relative h-50 bg-login-card-bg">
        <img
          src={brandData.coverImage || banner}
          alt="Cover Image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mb-12 px-6 py-4 border border-border relative">
        <div className="absolute -top-14 right-6">
          <img
            src={brandData?.avatar || avatar}
            alt={brandData?.name}
            className="w-25 h-25 rounded-full border-4 border-border shadow-lg"
          />
          {brandData.isOfficial && (
            <div className="absolute bottom-0 right-0 bg-brand-official-bg text-brand-official-text p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>

        <div className="pt-10 flex items-start gap-6">
          <div className='w-1/3'>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-text">{brandData.name}</h1>
              {brandData.isOfficial && (
                <span className="bg-brand-badge-bg text-brand-badge-text text-xs px-2 py-1 rounded-full">برند رسمی</span>
              )}
            </div>
            <p className="text-sm text-text italic mb-3">{brandData.slogan}</p>
          </div>

          <div className="w-1/3 flex-1 flex items-start gap-30">
            <div className="flex items-center pt-2 gap-6 text-sm text-text">
              <div className="flex items-center gap-2">
                <div className="w-full font-semibold">{brandData.sales}</div>
                <div>فروش</div>
              </div>
              <div className="border-l border-gray-300 mx-2 h-6"></div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">{brandData.followers}</span>
                <span>دنبال کننده</span>
              </div>
              <div className="border-l border-border mx-2 h-6"></div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">{brandData.rating}</span>
                <img src={starIcon} alt="امتیاز" className="h-5 w-5" />
                <span>امتیاز</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleFollow}
              className="bg-brand-follow-bg hover:bg-brand-follow-hover text-light font-medium py-2 px-4 rounded-full flex items-center gap-1 text-sm cursor-pointer"
            >
              <img src={shopIcon} alt="دنبال کردن" className="h-7 w-7" />
              دنبال کردن
            </button>
            <button 
              onClick={handleShare}
              className="font-medium py-2 px-4 rounded-full border border-brand-share-border flex items-center gap-1 text-sm cursor-pointer"
            >
              <img src={shareIcon} alt="اشتراک" className="h-7 w-7" />
              اشتراک گذاری
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandHeader;