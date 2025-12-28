import { postData, getData } from './services';
import type { 
    ApiResponse, 
    CheckPhonePayload, 
    VerifyCodePayload,
    CheckPhoneResponse,
    VerifyCodeResponse 
} from '@/types/otpServiceTypes';

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
        const statusCode = error.response?.status;
        const errorMessage = error.response?.data?.message;
        
        let message = 'خطا در ارتباط با سرور';
        
        if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
            message = errorMessage || 'کد وارد شده اشتباه است. لطفاً دوباره تلاش کنید.';
        } 
        else if (statusCode === 410) {
            message = errorMessage || 'کد تأیید منقضی شده است. لطفاً کد جدید درخواست کنید.';
        }
        else if (errorMessage) {
            message = errorMessage;
        }
        
        return {
            success: false,
            message: message,
            error
        };
    }
};