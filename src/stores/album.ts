import { getAlbums, getAlbum, getAlbumSize, getAlbumCount, getAlbumCountStatistics, getAlbumSizeStatistics, updateAlbum, deleteAlbum, createAlbum } from '@/api/album'
import type { Album } from '@/types/Album'
import { formatDate } from '@/utils/date'
import type { StatisticsFunc } from '@/types/func';
import type { ApiResponse } from "@/types/misc";


export const GetAlbums = async (): Promise<Album[]> => {
    const response = await getAlbums()
    const { code, message, data } = response.data as ApiResponse<Album[]>;
    if (code === 1) {
        return data as Album[];
    } else {
        throw new Error(`Error: ${message},${data}`);
    }
};

export const GetAlbum = async (albumId: number) => {
    const response = await getAlbum(albumId)
    const { code, message, data } = response.data as ApiResponse<Album>;
    if (code === 1) {
        return data as Album;
    } else {
        throw new Error(`Error: ${message},${data}`);
    }
}
export const GetAlbumSize = async (id: number | null) => {
    const reponse = await getAlbumSize(id)
    const { code, message, data } = reponse.data as ApiResponse<number>;
    if (code === 1) {
        return data as number;
    } else {
        throw new Error(`Error: ${message},${data}`);
    }
}



export const GetAlbumCount = async (id: number | null) => {
    const reponse = await getAlbumCount(id)
    const { code, message, data } = reponse.data as ApiResponse<number>
    if (code === 1) {
        return data
    } else {
        throw new Error(`Error: ${message},${data}`);
    }
}

export const GetAlbumCountStatistics: StatisticsFunc<number | null, Date, Date, Promise<{ [key: string]: number }>>
    = async (id, start_time, end_time): Promise<{ [key: string]: number; }> => {
        const reponse = await getAlbumCountStatistics(id, { "start-time": formatDate(start_time), "end-time": formatDate(end_time) });
        const { code, message, data } = reponse.data as ApiResponse<{ [key: string]: number }>
        if (code === 1) {
            return data as { [key: string]: number; };
        } else {
            throw new Error(`Error: ${message},${data}`);
        }
    }


export const GetAlbumSizeStatistics: StatisticsFunc<number | null, Date, Date, Promise<{ [key: string]: number }>>
    = async (id, start_time, end_time): Promise<{ [key: string]: number; }> => {
        const reponse = await getAlbumSizeStatistics(id, { "start-time": formatDate(start_time), "end-time": formatDate(end_time) });
        const { code, message, data } = reponse.data as ApiResponse<{ [key: string]: number }>;
        if (code === 1) {
            return processData(data as { [key: string]: number; });
        } else {
            throw new Error(`Error: ${message},${data}`);
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
        } else {
            throw new Error(message)
        }
    } else {
        throw new Error('更新失败')
    }
}

export const DeleteAlbum = async (id: number) => {
    const response = await deleteAlbum(id)
    interface ApiResponse {
        code: number;
        message: string;
        data?: null;
    }
    if (response.status === 200) {
        const { code, message } = response.data as ApiResponse
        if (code === 1) {
            return message
        } else {
            throw new Error(message)
        }
    } else {
        throw new Error('删除失败')
    }
}

export const CreateAlbum = async (data: Album) => {
    const response = await createAlbum(data)
    interface ApiResponse {
        code: number;
        message: string;
        data?: null;
    }
    if (response.status === 201) {
        const { code, message } = response.data as ApiResponse
        if (code === 1) {
            return message
        } else {
            throw new Error(message)
        }
    }
    else {
        throw new Error('创建失败')
    }
}