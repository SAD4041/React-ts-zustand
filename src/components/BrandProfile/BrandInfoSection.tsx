import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBrandProfile} from '@/services/brandProfile';

import locationIcon from '@/assets/brand-profile/Pin_alt_light.png';
import phoneIcon from '@/assets/brand-profile/Phone.png';
import emailIcon from '@/assets/brand-profile/Message.png';
import calendarIcon from '@/assets/brand-profile/Date_today.png';

import LoadingSpinner from '../ui/LoadingSpinner';

const BrandInfo = () => {
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
    }, [brandId, brandName]);

    if (loading) return <LoadingSpinner />;

    if (!brandData) return <div>.داده‌ای یافت نشد</div>;

    return (
        <div className="mx-[150px] mt-6 rounded-2xl overflow-hidden border shadow-lg">

        <div className="bg-[#F2F2F2] px-5 py-5 border-b border-gray-200 height-[200px]">
          <h2 className="text-lg text-center font-semibold text-gray-800">درباره برند و اطلاعات تماس</h2>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="mt-8 text-gray-700 leading-relaxed col-span-2">
            <p>{brandData.description}</p>
          </div>
          <div className="space-y-3 col-span-1">
            <div className="flex items-center gap-3 py-3">
              <div className="bg-[#F2F2F2] p-2 rounded-full">
                <img src={locationIcon} alt="موقعیت" className="h-7 w-7 text-gray-600" />
              </div>
              <span className="text-gray-700">{brandData.location}</span>
            </div>
            <div className="flex items-center gap-3 py-3">
              <div className="bg-[#F2F2F2] p-2 rounded-full">
                <img src={phoneIcon} alt="تلفن" className="h-7 w-7 text-gray-600" />
              </div>
              <span className="text-gray-700">{brandData.phone}</span>
            </div>
            <div className="flex items-center gap-3 py-3">
              <div className="bg-[#F2F2F2] p-2 rounded-full">
                <img src={emailIcon} alt="ایمیل" className="h-7 w-7 text-gray-600" />
              </div>
              <span className="text-gray-700">{brandData.email}</span>
            </div>
            <div className="flex items-center gap-3 py-3">
              <div className="bg-[#F2F2F2] p-2 rounded-full">
                <img src={calendarIcon} alt="تاریخ" className="h-7 w-7 text-gray-600" />
              </div>
              <span className="text-gray-700">{brandData.since}</span>
            </div>
          </div>
        </div>
      </div>
    )
}

export default BrandInfo;