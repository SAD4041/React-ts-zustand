import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getData, postData } from '@/services/services';

import starIcon from '@/assets/brand-profile/Star.png';
import thumbsUpIcon from '@/assets/brand-profile/Vector.png';
import thumbsDownIcon from '@/assets/brand-profile/Vector.png';
import LoadingSpinner from '../ui/LoadingSpinner';
import type {Review} from '@/types/commentApiType';


const CustomerReviewsSection = () => {
  const { brandId, brandName } = useParams<{ brandId: string; brandName: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState('');
  const [helpfulVote, setHelpfulVote] = useState<Record<number, boolean>>({});
  const [notHelpfulVote, setNotHelpfulVote] = useState<Record<number, boolean>>({});
  const REVIEWS_ENDPOINT = `/brands/${brandId}/reviews`;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getData({
          endPoint: REVIEWS_ENDPOINT,
          headers: {},
          params: { brandName },
        });
        setReviews(data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (brandId) {
      fetchReviews();
    }
  }, [brandId, brandName]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.trim()) {
      try {
        await postData({
          endPoint: REVIEWS_ENDPOINT,
          data: { text: newReview, rating: 5, brandName },
          headers: {},
        });
        setNewReview('');
        window.location.reload();
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  const handleHelpfulClick = (reviewId: number) => {
    setHelpfulVote(prev => ({ ...prev, [reviewId]: true }));
    setNotHelpfulVote(prev => ({ ...prev, [reviewId]: false }));
  };

  const handleNotHelpfulClick = (reviewId: number) => {
    setNotHelpfulVote(prev => ({ ...prev, [reviewId]: true }));
    setHelpfulVote(prev => ({ ...prev, [reviewId]: false }));
  };

  if (loading) return <LoadingSpinner />;
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
    : '4.8';
  const totalReviews = reviews.length;

  return (
    <div className="mx-section mt-12 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-lg font-semibold text-gray-800">نظرات مشتریان</h1>
      <div className="flex items-center gap-2 mt-5">
        <span className="text-xl font-bold">{averageRating}</span>
        <img src={starIcon} alt="امتیاز" className="h-5 w-5 text-product-rating" />
        <span className="text-sm text-gray-600">از {totalReviews.toLocaleString()} نظر</span>
      </div>

      <div className="my-6 mx-10 p-4 rounded-lg border border-review-border dir-ltr text-left">
        <form onSubmit={handleReviewSubmit}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">S</span>
            </div>
            <div className="flex-1 pl-12">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-800">شما</span>
              </div>
              <input
                type="text"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="نظر خود را بنویسید..."
                className="w-full px-3 py-2 bg-review-input-bg border border-review-input-border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 bg-review-submit-bg text-white text-xs font-medium py-2 px-4 rounded-md hover:bg-review-submit-hover transition cursor-pointer"
          >
            ثبت نظر جدید
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 mx-10 my-6 rounded-lg border border-review-border">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">{review.avatar.charAt(0).toUpperCase()}</span>
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
                      className={`h-4 w-4 ${i < review.rating ? 'text-product-rating' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">{review.text}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 justify-start" dir='ltr'>
              <button
                onClick={() => handleNotHelpfulClick(review.id)}
                className={`flex items-center gap-1 text-xs font-medium py-1 px-2 rounded-md transition cursor-pointer ${
                  notHelpfulVote[review.id]
                    ? 'bg-review-not-helpful text-white'
                    : 'bg-white text-gray-700 hover:bg-review-not-helpful-hover hover:text-review-not-helpful border border-gray-300'
                }`}
              >
                مفید نبود ({review.notHelpfulCount})
                <img src={thumbsDownIcon} alt="مفید نبود" className="h-6 w-6" />
              </button>
              <button
                onClick={() => handleHelpfulClick(review.id)}
                className={`flex items-center gap-2 text-xs font-medium py-1 px-2 rounded-md transition cursor-pointer ${
                  helpfulVote[review.id]
                    ? 'bg-review-helpful text-white'
                    : 'bg-white text-gray-700 hover:bg-review-helpful-hover hover:text-review-helpful border border-gray-300'
                }`}
              >
                مفید بود ({review.helpfulCount})
                <img src={thumbsUpIcon} alt="مفید بود" className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-xl hover:bg-gray-100 transition cursor-pointer">
          مشاهده نظرات بیشتر
        </button>
        {/* extend comment section */}
      </div>
    </div>
  );
};

export default CustomerReviewsSection;