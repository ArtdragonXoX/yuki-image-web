import { getAlbums, getAlbumSize, getAlbumCount, getAlbumStatistics } from '@/api/album'
import type { Album } from '@/types/Album'
import {formatDate} from '@/utils/date'

export const GetAlbums = async (params: { [key: string]: any }) => {
    let response: any = { status: 500, data: {} };
    try {
        response = await getAlbums(params); // 使用 try-await 替代 .then()
    } catch (err) {
        console.error('Error fetching albums:', err); // 在这里处理错误，例如打印到控制台
        // 注意：这里不抛出错误，所以代码会继续执行
    }
    interface ApiResponse {
        code: number;
        message: string;
        data?: Album[]; // 假设 API 返回的是 Album 数组
    }
    if (response.status === 200 || response.status === 401) {
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

export const GetAlbumSize = async (id: number | null) => {
    const reponse = await getAlbumSize(id)
    interface ApiResponse {
        code: number;
        msg: string;
        data: number;
    }
    if (reponse.status === 200) {
        const { code, msg, data } = reponse.data as ApiResponse
        if (code === 1) {
            return data
        } else {
            throw new Error(msg)
        }
    } else {
        throw new Error('获取数据失败')
    }
}

export const GetAlbumCount = async (id: number | null) => {
    const reponse = await getAlbumCount(id)
    interface ApiResponse {
        code: number;
        msg: string;
        data: number;
    }
    if (reponse.status === 200) {
        const { code, msg, data } = reponse.data as ApiResponse
        if (code === 1) {
            return data
        } else {
            throw new Error(msg)
        }
    } else {
        throw new Error('获取数据失败')
    }
}

export const GetAlbumStatistics = async (id: number | null, start_time: Date, end_time: Date) => {
    const reponse = await getAlbumStatistics(id, { "start-time": formatDate(start_time), "end-time": formatDate(end_time) })
    interface ApiResponse {
        code: number;
        msg: string;
        data: { [key: string]: number }
    }
    if(reponse.status === 200){
        const {code,msg,data} = reponse.data as ApiResponse
        if(code === 1){
            return data
        }else{
            throw new Error(msg)
        }
    }else{
        throw new Error('获取数据失败')
    }
}