import { postData, getData } from './services';
import type { 
    ApiResponse, 
    CheckPhonePayload, 
    VerifyCodePayload,
    CheckPhoneResponse,
    VerifyCodeResponse 
} from '@/types/apiTypes';

export const checkPhone = async (mobile: string): Promise<ApiResponse<CheckPhoneResponse>> => {
    try {
        const data = await postData({
            endPoint: '/api/login',
            data: { mobile } as CheckPhonePayload
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

export const verifyCode = async (mobile: string, otp: string): Promise<ApiResponse<VerifyCodeResponse>> => {
    try {
        const data = await postData({
            endPoint: '/api/verify',
            data: { mobile, otp } as VerifyCodePayload
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