// BrandProfileHeader.jsx

import React from 'react';
import shareIcon from '../assets/brand-dashboard/Send_light.png';
import shopIcon from '../assets/brand-dashboard/Shop.png';
import locationIcon from '../assets/brand-dashboard/Pin_alt_light.png';
import phoneIcon from '../assets/brand-dashboard/Phone.png';
import emailIcon from '../assets/brand-dashboard/Message.png';
import calendarIcon from '../assets/brand-dashboard/Date_today.png';
import starIcon from '../assets/brand-dashboard/Star.png';

const BrandDashboard = () => {
  // داده‌های ماک شده
  const brandData = {
    name: "برند مدآواران",
    slogan: '"مد امروز، سبک فردا"',
    rating: 4.8,
    followers: 23456,
    sales: 45678,
    isOfficial: true,
    coverImage: "https://via.placeholder.com/1200x300?text=Cover+Image",
    avatar: "https://via.placeholder.com/150?text=Brand",
    location: "تهران، ایران",
    phone: "۰۲۱-۱۲۳۴۵۶۷۸",
    email: "info@modavaran.com",
    since: "عضو از فروردین ۱۳۹۵",
    description: "برند مدآواران با هدف ارائه پوشاک باکیفیت و مدرن تاسیس شده است. ما با تمرکز بر کیفیت، طراحی منحصر به فرد و قیمت‌گذاری منصفانه، تلاش می‌کنیم بهترین تجربه خرید را برای مشتریان فراهم کنیم. از لباس‌های روزمره تا ست‌های خاص، همه چیز در جند کلیک فاصله تا تو. ما با ضمانت بازگشت و ارسال سریع، کنارتاییم.",
    promotion: {
      discount: "۵۰٪",
      title: "تخفیف تا ۵۰٪",
      subtitle: "روی کالکشن بهار و تابستان",
    }
  };

  return (
    <div dir="rtl" className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* بخش کاور */}
      <div className="relative h-32 bg-gray-200">
        <img
          src={brandData.coverImage}
          alt="Cover Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* بخش اطلاعات اصلی برند - هدر */}
      <div className="px-6 py-4 border-b border-blue-500 relative">
        {/* آواتار برند - نصفش روی هدر و نصفش در بخش اصلی */}
        <div className="absolute -top-10 right-6">
          <img
            src={brandData.avatar}
            alt={brandData.name}
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
          />
          {brandData.isOfficial && (
            <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>

        {/* محتوای هدر - کاملاً افقی و کنار هم */}
        <div className="pt-10 flex items-start gap-6 justify-between">
          {/* سمت راست: نام برند، شعار و اطلاعات عددی */}
          <div className="flex-1 flex items-start gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-gray-800">{brandData.name}</h1>
                {brandData.isOfficial && (
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">برند رسمی</span>
                )}
              </div>
              <p className="text-sm text-gray-600 italic mb-3">{brandData.slogan}</p>
            </div>

            {/* اطلاعات عددی - کنار هم و با خط جداکننده */}
            <div className="flex items-center gap-6 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <span className="font-semibold">{brandData.sales}</span>
                <span>فروش</span>
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

          {/* سمت چپ: دکمه‌ها */}
          <div className="flex items-center gap-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full flex items-center gap-1 text-sm">
              <img src={shopIcon} alt="دنبال کردن" className="h-7 w-7" />
              دنبال کردن
            </button>
            <button className="font-medium py-2 px-4 rounded-full border flex items-center gap-1 text-sm">
              <img src={shareIcon} alt="اشتراک" className="h-7 w-7" />
              اشتراک گذاری
            </button>
          </div>
        </div>
      </div>

      {/* بخش درباره برند و اطلاعات تماس - به صورت کارت */}
      <div className="mx-[150px] mt-6 rounded-2xl overflow-hidden border shadow-lg">

        <div className="bg-[#F2F2F2] px-5 py-5 border-b border-gray-200 height-[200px]">
          <h2 className="text-lg text-center font-semibold text-gray-800">درباره برند و اطلاعات تماس</h2>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-gray-700 leading-relaxed col-span-2">
                <p>{brandData.description}</p>
                <p className="mt-2 font-medium">مدآواران: هماهنگ با ریتم زندگی تو!</p>
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

      {/* بخش تبلیغاتی */}
      <div className="mt-6 mx-[150px] p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-white shadow-lg">
        <div className="bg-white text-red-500 text-xs font-bold px-2 py-1 rounded-full w-fit">
            فروش ویژه!
        </div>
        <div>
            <div className="text-xl font-bold">{brandData.promotion.title}</div>
            <div className="text-sm mt-1">{brandData.promotion.subtitle}</div>
        </div>
        <button className="w-full mt-3 bg-white text-red-500 font-medium py-2 rounded-md hover:bg-gray-100 transition-colors">
          مشاهده محصولات
        </button>
      </div>
    </div>
  );
};

export default BrandDashboard;