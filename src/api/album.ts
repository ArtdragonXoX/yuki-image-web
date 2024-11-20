import { instance } from '@/utils/requests'

export const getAlbums = async () => {
    return instance({
        url: '/album',
        method: 'get',
    })
}

export const getAlbum = async (id: number) => {
    return instance({
        url: `/album/${id}`,
        method: 'get',
    })
}

export const getAlbumCount = async (id: number | null) => {
    const url = id !== null ? `/album/count/${id}` : '/album/count';
    return instance({
        url: url,
        method: "get",
    })
};

export const getAlbumSize = async (id: number | null) => {
    const url = id !== null ? `/album/size/${id}` : '/album/size';
    return instance({
        url: url,
        method: "get",
    })
};

export const getAlbumCountStatistics = async (id: number | null, params: { [key: string]: string }) => {
    const url = id !== null ? `/album/count/statistics/${id}` : '/album/count/statistics';
    return instance({
        url: url,
        method: "get",
        params: params,
    })
};

export const getAlbumSizeStatistics = async (id: number | null, params: { [key: string]: string }) => {
    const url = id !== null ? `/album/size/statistics/${id}` : '/album/size/statistics';
    return instance({
        url: url,
        method: "get",
        params: params,
    })
};

export const updateAlbum = async (id: number, data: { [key: string]: any }) => {
    return instance({
        url: `/album/${id}`,
        method: 'put',
        data,
    });
}