import { postData } from './services';
import type { ApiResponse, CheckPhonePayload, VerifyCodePayload } from '@/types/apiTypes';

export const checkPhone = async (phone: string): Promise<ApiResponse> => {
    try {
        const data = await postData({
            endPoint: '/api/login',
            data: { phone } as CheckPhonePayload
        });
        return {
            success: true,
            data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'خطا در ارتباط با سرور',
            error
        };
    }
};

export const verifyCode = async (phone: string, code: string): Promise<ApiResponse> => {
    try {
        const data = await postData({
            endPoint: '/api/verify',
            data: { phone, code } as VerifyCodePayload
        });
        return {
            success: true,
            data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'خطا در ارتباط با سرور',
            error
        };
    }
};