// CustomerReviewsSection.jsx

import React, { useState } from 'react';
import starIcon from '@/assets/brand-dashboard/Star.png';
import thumbsUpIcon from '@/assets/brand-dashboard/Vector.png';
import thumbsDownIcon from '@/assets/brand-dashboard/Vector.png';

const CustomerReviewsSection = () => {
  const [newReview, setNewReview] = useState('');
  const [helpfulVote, setHelpfulVote] = useState({}); // برای مدیریت حالت کلیک "مفید بود"
  const [notHelpfulVote, setNotHelpfulVote] = useState({}); // برای مدیریت حالت کلیک "مفید نبود"

  // داده‌های ماک شده برای نظرات
  const reviews = [
    {
      id: 2,
      name: "ایلیا موسوی",
      avatar: "https://via.placeholder.com/40?text=I",
      rating: 5,
      text: "کیفیت محصولات این برند واقعاً عالیه. پارچه‌ها مرغوب هستند و دوخت محصولات بسیار تمیز و حرفه‌ای است.",
      helpfulCount: 39,
      notHelpfulCount: 29,
      hasBadge: false
    },
    {
      id: 3,
      name: "ریحانه کردگاری",
      avatar: "https://via.placeholder.com/40?text=R",
      rating: 2,
      text: "بسته‌بندی محصولات خیلی شیک بود و ارسال سریع انجام شد. مانتوی که خریدم دقیقاً مطابق تصویر بود.",
      helpfulCount: 36,
      notHelpfulCount: 29,
      hasBadge: true,
    }
  ];

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim()) {
      console.log('نظر جدید:', newReview);
      setNewReview('');
      // در واقعیت: ارسال به API و آپدیت لیست
    }
  };

  const handleHelpfulClick = (reviewId) => {
    setHelpfulVote(prev => ({ ...prev, [reviewId]: true }));
    setNotHelpfulVote(prev => ({ ...prev, [reviewId]: false })); // اگر قبلاً "مفید نبود" زده شده بود، غیرفعال کن
  };

  const handleNotHelpfulClick = (reviewId) => {
    setNotHelpfulVote(prev => ({ ...prev, [reviewId]: true }));
    setHelpfulVote(prev => ({ ...prev, [reviewId]: false })); // اگر قبلاً "مفید بود" زده شده بود، غیرفعال کن
  };

  return (
    <div className="mx-[150px] mt-12 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      {/* هِدَر بخش نظرات */}
      <h1 className="text-lg font-semibold text-gray-800">نظرات مشتریان</h1>
      <div className="flex items-center gap-2 mt-5">
        <span className="text-xl font-bold">۴.۸</span>
        <img src={starIcon} alt="امتیاز" className="h-5 w-5 text-yellow-500" />
        <span className="text-sm text-gray-600">از ۱,۲۳۴ نظر</span>
      </div>

      {/* فرم ثبت نظر جدید - دکمه به سمت چپ */}
      <div className="my-6 mx-10 p-4 rounded-lg border border-gray-500">
        <form onSubmit={handleReviewSubmit}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">S</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-800">شما</span>
              </div>
              <input
                type="text"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="نظر خود را بنویسید..."
                className="flex center w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>
          </div>
          <button
            type="submit"
            className="mt-6 bg-black text-white text-xs font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition cursor-pointer"
          >
            ثبت نظر جدید
          </button>
        </form>
      </div>

      {/* لیست نظرات */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={review.id} className="p-4 mx-10 my-6 rounded-lg border border-gray-500">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">{review.avatar.charAt(1)}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-800">{review.name}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={starIcon}
                      alt="ستاره"
                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">{review.text}</p>
              </div>
            </div>

            {/* دکمه‌های مفید بود / مفید نبود - به سمت چپ و با افکت هاور و کلیک */}
            {!review.isEditable && (
              <div className="flex items-center gap-2 mt-3 justify-start">
                <button
                  onClick={() => handleNotHelpfulClick(review.id)}
                  className={`flex items-center gap-1 text-xs font-medium py-1 px-2 rounded-md transition cursor-pointer ${notHelpfulVote[review.id]
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-700 border border-gray-300'
                    }`}
                >
                  <img src={thumbsDownIcon} alt="مفید نبود" className="h-6 w-6" />
                  مفید نبود ({review.notHelpfulCount})
                </button>
                <button
                  onClick={() => handleHelpfulClick(review.id)}
                  className={`flex items-center gap-2 text-xs font-medium py-1 px-2 rounded-md transition cursor-pointer ${helpfulVote[review.id]
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 border border-gray-300'
                    }`}
                >
                  <img src={thumbsUpIcon} alt="مفید بود" className="h-6 w-6" />
                  مفید بود ({review.helpfulCount})
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* دکمه مشاهده نظرات بیشتر */}
      <div className="mt-4 text-center">
        <button className="border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-full hover:bg-gray-100 transition cursor-pointer">
          مشاهده نظرات بیشتر
        </button>
      </div>
    </div>
  );
};

export default CustomerReviewsSection;