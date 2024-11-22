import { login, register } from '@/api/admin'
import type { Admin } from '@/types/Admin'
import type { ApiResponse } from '@/types/misc'

export const Login = async (body: Admin) => {
    const response = await login(body)
    const { code, message, data } = response.data as ApiResponse<string>;
    if (code === 1) {
        return data as string;
    } else {
        throw new Error(`Error: ${message},${data}`);
    }
};
export const Register = async (body: Admin) => {
    const response = await register(body)
    const {code,message,data} = response.data as ApiResponse<string>;
    
        if (code === 1) {
            return data as string;
        } else {
            throw new Error(`Error: ${message},${data}`);
        }
    };

export const Logout = () => {
    localStorage.removeItem('token');
};