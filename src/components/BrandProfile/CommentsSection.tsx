import React, { useState, useEffect } from 'react';
import {
  getProductReviews,
  getBrandReviews,
  createProductReview,
  createBrandReview,
  reactToReview,
} from '@/services/reviewService';
import useUserStore from '@/store/userStore/userStore';

import starIcon from '@/assets/brand-profile/Star.png';
import thumbsUpIcon from '@/assets/brand-profile/Vector.png';
import thumbsDownIcon from '@/assets/brand-profile/Vector.png';
import LoadingSpinner from '../ui/LoadingSpinner';
import type { Review, ReviewType, ReviewsSectionProps } from '@/types/commentsType';


const ReviewsSection: React.FC<ReviewsSectionProps> = ({ entityId, reviewType }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  useEffect(() => {
    fetchReviews();
  }, [entityId, reviewType]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data =
        reviewType === 'product'
          ? await getProductReviews(entityId)
          : await getBrandReviews(entityId);
      
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('خطا در دریافت نظرات');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('برای ثبت نظر باید وارد شوید');
      return;
    }

    if (!newReview.trim()) {
      alert('لطفاً متن نظر خود را وارد کنید');
      return;
    }

    try {
      setSubmitting(true);

      if (reviewType === 'product') {
        await createProductReview({
          product_id: Number(entityId),
          rating: newRating,
          comment: newReview,
        });
      } else {
        await createBrandReview({
          brand_id: Number(entityId),
          rating: newRating,
          comment: newReview,
        });
      }

      setNewReview('');
      setNewRating(5);
      alert('نظر شما با موفقیت ثبت شد و در انتظار تایید است.');

      // رفرش لیست نظرات
      await fetchReviews();
    } catch (error: any) {
      console.error('Error submitting review:', error);
      alert(error.message || 'خطا در ثبت نظر');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReaction = async (reviewId: number, type: 'like' | 'dislike') => {
    if (!isAuthenticated) {
      alert('برای ثبت واکنش باید وارد شوید');
      return;
    }

    try {
      const result = await reactToReview({
        review_id: reviewId,
        type,
      });

      // آپدیت local state
      setReviews((prevReviews) =>
        prevReviews.map((review) => {
          if (review.id !== reviewId) return review;

          const currentReaction = review.user_reaction;
          let newLikesCount = review.likes_count || 0;
          let newDislikesCount = review.dislikes_count || 0;
          let newReaction: 'like' | 'dislike' | null = null;

          if (result.message === 'Reaction removed') {
            // حذف واکنش
            if (currentReaction === 'like') newLikesCount--;
            if (currentReaction === 'dislike') newDislikesCount--;
            newReaction = null;
          } else if (result.message === 'Reaction added') {
            // اضافه کردن واکنش جدید
            if (type === 'like') newLikesCount++;
            if (type === 'dislike') newDislikesCount++;
            newReaction = type;
          } else if (result.message === 'Reaction updated') {
            // تغییر از like به dislike یا بالعکس
            if (currentReaction === 'like') {
              newLikesCount--;
              newDislikesCount++;
            } else {
              newDislikesCount--;
              newLikesCount++;
            }
            newReaction = type;
          }

          return {
            ...review,
            likes_count: newLikesCount,
            dislikes_count: newDislikesCount,
            user_reaction: newReaction,
          };
        })
      );
    } catch (error: any) {
      console.error('Error reacting to review:', error);
      alert(error.message || 'خطا در ثبت واکنش');
    }
  };

  if (loading) return <LoadingSpinner />;

  // فقط نظرات تایید شده رو نشون میدیم
  const approvedReviews = reviews.filter((r) => r.moderation_status === 'approved');
  const averageRating =
    approvedReviews.length > 0
      ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length).toFixed(1)
      : '0.0';
  const totalReviews = approvedReviews.length;

  return (
    <div className="mx-section mt-12 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-lg font-semibold text-gray-800">نظرات مشتریان</h1>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg">{error}</div>
      )}

      <div className="flex items-center gap-2 mt-5">
        <span className="text-xl font-bold">{averageRating}</span>
        <img src={starIcon} alt="امتیاز" className="h-5 w-5 text-product-rating" />
        <span className="text-sm text-gray-600">از {totalReviews.toLocaleString()} نظر</span>
      </div>

      {/* فرم ثبت نظر جدید */}
      {isAuthenticated ? (
        <div className="my-6 mx-10 p-4 rounded-lg border border-review-border">
          <form onSubmit={handleReviewSubmit}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">شما</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-medium text-gray-800">امتیاز شما:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="cursor-pointer"
                      >
                        <img
                          src={starIcon}
                          alt="ستاره"
                          className={`h-5 w-5 ${
                            star <= newRating ? 'opacity-100' : 'opacity-30'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="نظر خود را بنویسید..."
                  rows={3}
                  className="w-full px-3 py-2 bg-review-input-bg border border-review-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-4 bg-review-submit-bg text-white text-xs font-medium py-2 px-4 rounded-md hover:bg-review-submit-hover transition cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'در حال ارسال...' : 'ثبت نظر جدید'}
            </button>
          </form>
        </div>
      ) : (
        <div className="my-6 mx-10 p-4 rounded-lg border border-gray-300 bg-gray-50 text-center">
          <p className="text-gray-600">برای ثبت نظر باید وارد شوید</p>
        </div>
      )}

      {/* لیست نظرات */}
      <div className="space-y-4">
        {approvedReviews.map((review) => (
          <div key={review.id} className="p-4 mx-10 my-6 rounded-lg border border-review-border">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">
                  {review.user?.name?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-800">
                    {review.user?.name || 'کاربر'}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={starIcon}
                      alt="ستاره"
                      className={`h-4 w-4 ${i < review.rating ? 'opacity-100' : 'opacity-30'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            </div>

            {/* دکمه‌های لایک و دیسلایک */}
            <div className="flex items-center gap-2 mt-3 justify-start" dir="ltr">
              <button
                onClick={() => handleReaction(review.id, 'dislike')}
                disabled={!isAuthenticated}
                className={`flex items-center gap-1 text-xs font-medium py-1 px-2 rounded-md transition cursor-pointer ${
                  review.user_reaction === 'dislike'
                    ? 'bg-review-not-helpful text-white'
                    : 'bg-white text-gray-700 hover:bg-review-not-helpful-hover hover:text-review-not-helpful border border-gray-300'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                مفید نبود ({review.dislikes_count || 0})
                <img src={thumbsDownIcon} alt="مفید نبود" className="h-6 w-6" />
              </button>
              <button
                onClick={() => handleReaction(review.id, 'like')}
                disabled={!isAuthenticated}
                className={`flex items-center gap-2 text-xs font-medium py-1 px-2 rounded-md transition cursor-pointer ${
                  review.user_reaction === 'like'
                    ? 'bg-review-helpful text-white'
                    : 'bg-white text-gray-700 hover:bg-review-helpful-hover hover:text-review-helpful border border-gray-300'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                مفید بود ({review.likes_count || 0})
                <img src={thumbsUpIcon} alt="مفید بود" className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {approvedReviews.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">هنوز نظری ثبت نشده است</div>
      )}
    </div>
  );
};

export default ReviewsSection;