import {login} from '@/api/admin'
import type {Admin} from '@/types/Admin'

export const Login = async (data: Admin) => {
    const response = await login(data)
    interface ApiResponse {
        code: number;
        message: string;
        data?: string; // 假设 API 返回的是 Album 数组
    }
    if (response.status === 200) {
        const { code, message, data } = response.data as ApiResponse;
        if (code === 1) {
            return data || [];
        } else {
            throw new Error(`API Error: ${message}`);
        }
    } else {
        throw new Error(`HTTP Error: ${response.status}`);
    }
}