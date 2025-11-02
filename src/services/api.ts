import React from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/login';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

export const checkPhone = async (phone) => {
    try {
        const response = await api.post('/check-phone', { phone });
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'خطا در ارتباط با سرور',
            error: error
        };
    }
};

// تایید کد ارسال شده
export const verifyCode = async (phone, code) => {
    try {
        const response = await api.post('/verify-code', { phone, code });
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'خطا در ارتباط با سرور',
            error: error
        };
    }
};

export default api;