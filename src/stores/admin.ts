import { login, register } from '@/api/admin'
import type { Admin } from '@/types/Admin'

interface ApiResponse {
    code: number;
    message: string;
    data?: string;
}

export const Login = async (body: Admin) => {
    const response = await login(body)
    const apiResponse = response.data as ApiResponse;
    if (response.status === 200) {
        if (apiResponse.code === 1) {
            return apiResponse.data || null;
        } else {
            const errorData = apiResponse ? apiResponse.data?.toString() : 'No data';
            throw new Error(`Error: ${apiResponse?.message.toString() || 'Unknown'}, ${errorData}`);
        }
    } else {
        throw new Error(`Error: ${apiResponse?.message.toString() || 'Unknown'}`);
    }
};

export const Register = async (body: Admin) => {
    const response = await register(body)
    const apiResponse = response.data as ApiResponse;
    if (response.status === 200) {
        if (apiResponse.code === 1) {
            return apiResponse.message || null;
        } else {
            const errorData = apiResponse ? apiResponse.data?.toString() : 'No data';
            throw new Error(`Error: ${apiResponse?.message.toString() || 'Unknown'}, ${errorData}`);
        }
    } else {
        throw new Error(`Error: ${apiResponse?.message.toString() || 'Unknown'}`);
    }
};

export const Logout = () => {
    localStorage.removeItem('token');
};