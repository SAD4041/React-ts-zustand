// services/brandProfileService.ts

import { getData, postData } from './services';

export const getBrandProfile = async (brandId: string) => {
  if (!brandId) {
    throw new Error('Brand ID is missing!');
  }

  return await getData({
    endPoint: `/brands/${brandId}`,
  });
};

export const getBrandProducts = async (brandId: string, params?: any) => {
  if (!brandId) {
    throw new Error('Brand ID is missing!');
  }

  return await getData({
    endPoint: `/brands/${brandId}/products`,
    params,
  });
};

export const getBrandReviews = async (brandId: string, params?: any) => {
  if (!brandId) {
    throw new Error('Brand ID is missing!');
  }

  return await getData({
    endPoint: `/brands/${brandId}/reviews`,
    params,
  });
};

export const submitBrandReview = async (brandId: string, data: any) => {
  if (!brandId) {
    throw new Error('Brand ID is missing!');
  }

  return await postData({
    endPoint: `/brands/${brandId}/reviews`,
    data,
  });
};