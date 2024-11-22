import { instance } from "@/utils/requests";

export const getConfig = async () => {
    return instance({
        url: '/system/conf',
        method: 'get',
    })
}

export const updateConfig = async (data: { [key: string]: string | number }) => {
    return instance({
        url: '/system/conf',
        method: 'put',
        data,
    })
}

export const updateToken = async () => {
    return instance({
        url: '/system/token',
        method: 'put',
    })
}