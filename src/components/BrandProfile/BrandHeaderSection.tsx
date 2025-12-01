import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBrandProfile } from '@/services/brandProfile';
import LoadingSpinner from '@/components/Custom/LoadingSpinner';

import starIcon from '@/assets/brand-profile/Star.png';
import shareIcon from '@/assets/brand-profile/Send_light.png';
import shopIcon from '@/assets/brand-profile/Shop.png';

const BrandHeader = () => {
    const { brandId, brandName } = useParams<{ brandId: string; brandName: string }>();
    const [brandData, setBrandData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrandData = async () => {
            try {
                const brand = await getBrandProfile(brandId, brandName);
                setBrandData(brand);
            } catch (error) {
                console.error("Error fetching brand data:", error);
            }
        };

        if (brandId) {
            Promise.all([fetchBrandData()]).finally(() => setLoading(false));
        }
    }, [brandId]);

    if (loading) return <LoadingSpinner />;

    if (!brandData) return <div>.داده‌ای یافت نشد</div>;


    return (
        <div>
          <div className="relative h-50 bg-gray-200">
              <img
              src={brandData.coverImage}
              alt="Cover Image"
              className="w-full h-full object-cover"
              />
          </div>

          <div className="mb-[50px] px-6 py-4 border relative">
            <div className="absolute -top-14 right-6">
              <img
                src={brandData.avatar}
                alt={brandData.name}
                className="w-25 h-25 rounded-full border-4 border-white shadow-lg"
              />
              {brandData.isOfficial && (
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>

            <div className="pt-10 flex items-start gap-6">
              <div className='w-1/3'>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-gray-800">{brandData.name}</h1>
                  {brandData.isOfficial && (
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">برند رسمی</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 italic mb-3">{brandData.slogan}</p>
              </div>

              <div className="w-1/3 flex-1 flex items-start gap-30">
                <div className="flex items-center pt-2 gap-6 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-full font-semibold">{brandData.sales}</div>
                    <div>فروش</div>
                  </div>
                  <div className="border-l border-gray-300 mx-2 h-6"></div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{brandData.followers}</span>
                    <span>دنبال کننده</span>
                  </div>
                  <div className="border-l border-gray-300 mx-2 h-6"></div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{brandData.rating}</span>
                    <img src={starIcon} alt="امتیاز" className="h-5 w-5" />
                    <span>امتیاز</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full flex items-center gap-1 text-sm">
                  <img src={shopIcon} alt="دنبال کردن" className="h-7 w-7" />
                  دنبال کردن
                </button>
                <button className="font-medium py-2 px-4 rounded-full border flex items-center gap-1 text-sm">
                  <img src={shareIcon} alt="اشتراک" className="h-7 w-7" />
                  اشتراک گذاری
                </button>
                {/* add unclick action */}
              </div>
            </div>
          </div>
        </div>

    )
}

export default BrandHeader;