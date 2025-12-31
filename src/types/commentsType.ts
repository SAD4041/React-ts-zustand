// src/types/commentApiType.ts

export interface ReviewUser {
  id: number;
  name: string;
  avatar?: string;
}
export interface Review {
  id: number;
  user_id: number;
  product_id?: number;
  brand_id?: number;
  rating: number;
  comment: string;
  moderation_status: 'pending' | 'approved' | 'rejected';
  review_date: string;
  created_at: string;
  updated_at: string;
  user: ReviewUser;
  likes_count: number;
  dislikes_count: number;
  user_reaction?: 'like' | 'dislike' | null;
}

export interface ReviewsSectionProps {
  entityId: string | number; // می‌تونه productId یا brandId باشه
  reviewType: ReviewType; // 'product' یا 'brand'
}

export interface CreateProductReviewRequest {
  product_id: number;
  rating: number;
  comment: string;
}

export interface CreateBrandReviewRequest {
  brand_id: number;
  rating: number;
  comment: string;
}

export interface CreateReviewResponse {
  message: string;
  data: Review;
}

export interface ReactReviewRequest {
  review_id: number;
  type: 'like' | 'dislike';
}

export interface ReactReviewResponse {
  message: 'Reaction added' | 'Reaction removed' | 'Reaction updated';
}

export type ReviewType = 'product' | 'brand';
