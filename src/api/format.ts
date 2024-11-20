import { instance } from '@/utils/requests'

export const getFormatSupport = async (id: number) => {
    return instance({
        url: `/album/format/${id}`,
        method: 'get',
    })
}

export const getFormat = async (id: number | null) => {
    const url = id ? `/format/${id}` : '/format'
    return instance({
        url: url,
        method: 'get',
    })
}

export const addFormatSuppot = async (data: { [key: string]: any }) => {
    return instance({
        url: '/album/format',
        method: 'post',
        data,
    });
}

export const deleteFormatSupport = async (data: { [key: string]: any }) => {
    return instance({
        url: '/album/format',
        method: 'delete',
        data,
    });
}