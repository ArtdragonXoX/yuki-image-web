import { instanceNotApi } from '@/utils/requests'
import type { Admin } from '@/types/Admin'

export const login = (data: Admin) => {
    return instanceNotApi({
        url: '/admin/login',
        method: 'post',
        data,
    })
}

export const register = (data: Admin) => {
    return instanceNotApi({
        url: '/admin/register',
        method: 'post',
        data,
    })
}
