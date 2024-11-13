import {getAlbums} from '@/api/album'
import type { Album } from '@/types/Album'

export const GetAlbums = async (params: { [key: string]: any }) => {
    const response = await getAlbums(params);
    interface ApiResponse {
        code: number;
        message: string;
        data?: Album[]; // 假设 API 返回的是 Album 数组
    }
    if (response.status === 200) {
        const { code, message, data } = response.data as ApiResponse;
        if (code === 1) {
            return data || []; // 如果 albums 为 undefined，则返回空数组
        } else {
            throw new Error(`API Error: ${message}`);
        }
    } else {
        throw new Error(`HTTP Error: ${response.status}`);
    }
};