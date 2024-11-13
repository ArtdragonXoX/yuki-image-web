import { instance } from '@/utils/requests'

export const getAlbums = (params: { [key: string]: any }) => {
    return instance({
        url: '/album',
        method: 'get',
        params: params,
    })
}

