// src/services/reviewService.ts

import { getData, postData } from './services';
import type {
  Review,
  CreateProductReviewRequest,
  CreateBrandReviewRequest,
  CreateReviewResponse,
  ReactReviewRequest,
  ReactReviewResponse,
} from '@/types/commentsType';

/**
 * دریافت لیست نظرات یک محصول
 * @param productId - شناسه محصول
 */
export const getProductReviews = async (productId: string | number): Promise<Review[]> => {
  try {
    const response = await getData({
      endPoint: `/api/product/${productId}/reviews`,
    });
    
    // Response مستقیماً یک array است
    if (Array.isArray(response)) {
      return response;
    }
    
    // اگر به صورت { data: [...] } باشه
    if (response?.data && Array.isArray(response.data)) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    return [];
  }
};

/**
 * دریافت لیست نظرات یک برند
 * @param brandId - شناسه برند
 */
export const getBrandReviews = async (brandId: string | number): Promise<Review[]> => {
  try {
    const response = await getData({
      endPoint: `/api/brand/${brandId}/reviews`,
    });
    
    if (Array.isArray(response)) {
      return response;
    }
    
    if (response?.data && Array.isArray(response.data)) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching brand reviews:', error);
    return [];
  }
};

/**
 * ساخت نظر جدید برای محصول
 * @param reviewData - اطلاعات نظر
 */
export const createProductReview = async (
  reviewData: CreateProductReviewRequest
): Promise<CreateReviewResponse> => {
  try {
    const response = await postData({
      endPoint: '/api/user/reviews/create',
      data: reviewData,
    });
    
    return response;
  } catch (error: any) {
    console.error('Error creating product review:', error);
    throw new Error(error.response?.data?.message || 'خطا در ثبت نظر محصول');
  }
};

/**
 * ساخت نظر جدید برای برند
 * @param reviewData - اطلاعات نظر
 */
export const createBrandReview = async (
  reviewData: CreateBrandReviewRequest
): Promise<CreateReviewResponse> => {
  try {
    const response = await postData({
      endPoint: '/api/user/reviews/create',
      data: reviewData,
    });
    
    return response;
  } catch (error: any) {
    console.error('Error creating brand review:', error);
    throw new Error(error.response?.data?.message || 'خطا در ثبت نظر برند');
  }
};

/**
 * لایک یا دیسلایک یک نظر
 * @param reactionData - اطلاعات واکنش
 */
export const reactToReview = async (
  reactionData: ReactReviewRequest
): Promise<ReactReviewResponse> => {
  try {
    const response = await postData({
      endPoint: '/api/user/reviews/react',
      data: reactionData,
    });
    
    return response;
  } catch (error: any) {
    console.error('Error reacting to review:', error);
    throw new Error(error.response?.data?.message || 'خطا در ثبت واکنش');
  }
};