import { instance } from '@/utils/requests'
import type { time } from 'echarts/core';

export const getAlbums = async (params: { [key: string]: any }) => {
    return instance({
        url: '/album',
        method: 'get',
        params: params,
    })
}

export const getAlbumCount = async (id: number|null) => {
    const url = id !== null ? `/album/count/${id}` : '/album/count';
    return instance({
        url: url,
        method: "get",
    })
};

export const getAlbumSize = async (id: number|null) => {
    const url = id !== null ? `/album/size/${id}` : '/album/size';
    return instance({
        url: url,
        method: "get",
    })
};

export const getAlbumStatistics=async(id:number|null,params:{ [key: string]: string })=>{
    const url = id !== null ? `/album/statistics/${id}` : '/album/statistics';
    return instance({
        url: url,
        method: "get",
        params: params,
    })
};