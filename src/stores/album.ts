import { getAlbums, getAlbum, getAlbumSize, getAlbumCount, getAlbumCountStatistics, getAlbumSizeStatistics, updateAlbum } from '@/api/album'
import type { Album } from '@/types/Album'
import { formatDate } from '@/utils/date'
import type { StatisticsFunc } from '@/types/func';

export const GetAlbums = async (): Promise<Album[]> => {
    let response: any = { status: 500, data: {} };
    try {
        response = await getAlbums(); // 使用 try-await 替代 .then()
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

export const GetAlbum = async (albumId: number) => {
    const response = await getAlbum(albumId)
    interface ApiResponse {
        code: number;
        msg: string;
        data: Album;
    }
    if (response.status === 200) {
        const { code, msg, data } = response.data as ApiResponse
        if (code === 1) {
            return data
        } else {
            throw new Error(msg)
        }
    } else {
        throw new Error('获取数据失败')
    }
}
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

export const GetAlbumCountStatistics: StatisticsFunc<number | null, Date, Date, Promise<{ [key: string]: number }>>
    = async (id, start_time, end_time): Promise<{ [key: string]: number; }> => {
        const reponse = await getAlbumCountStatistics(id, { "start-time": formatDate(start_time), "end-time": formatDate(end_time) })
        interface ApiResponse {
            code: number;
            msg: string;
            data: { [key: string]: number }
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

export const GetAlbumSizeStatistics: StatisticsFunc<number | null, Date, Date, Promise<{ [key: string]: number }>>
    = async (id, start_time, end_time): Promise<{ [key: string]: number; }> => {
        const reponse = await getAlbumSizeStatistics(id, { "start-time": formatDate(start_time), "end-time": formatDate(end_time) })
        interface ApiResponse {
            code: number;
            msg: string;
            data: { [key: string]: number }
        }
        if (reponse.status === 200) {
            const { code, msg, data } = reponse.data as ApiResponse
            if (code === 1) {
                return processData(data)
            } else {
                throw new Error(msg)
            }
        } else {
            throw new Error('获取数据失败')
        }
    }

const processData = (rawData: { [key: string]: number }): { [key: string]: number } => {
    const processedData: { [key: string]: number } = {}
    for (const key in rawData) {
        if (rawData.hasOwnProperty(key)) {
            // 除以 1024 并保留两位小数
            processedData[key] = Math.round((rawData[key] / (1024 * 1024)) * 100) / 100
        }
    }
    return processedData
}

export const UpdateAlbum = async (id: number, data: Album) => {
    const response = await updateAlbum(id, data)
    interface ApiResponse {
        code: number;
        message: string;
        data?: null;
    }
    if (response.status === 200) {
        const { code, message } = response.data as ApiResponse
        if (code === 1) {
            return message
        } else{
            throw new Error(message)
        }
    } else {
        throw new Error('更新失败')
    }
}