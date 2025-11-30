// services/brandProfile.ts

import { getData, postData } from './services';

// دریافت اطلاعات پروفایل برند
export const getBrandProfile = async (brandId: string, brandName: string) => {
  return await getData({
    endPoint: `/brands/${brandId}/${brandName}`, // مثلاً /brands/1
  });
};

// دریافت لیست محصولات یک برند
export const getBrandProducts = async (brandId: string, brandName: string, params?: any) => {
  return await getData({
    endPoint: `/brands/${brandId}/${brandName}/products`,
    params,
  });
};

// دریافت نظرات یک برند
export const getBrandReviews = async (brandId: string, brandName: string, params?: any) => {
  return await getData({
    endPoint: `/brands/${brandId}/${brandName}/reviews`,
    params,
  });
};

// ثبت نظر جدید
export const submitBrandReview = async (brandId: string, brandName: string, data: any) => {
  return await postData({
    endPoint: `/brands/${brandId}/${brandName}/reviews`,
    data,
  });
};