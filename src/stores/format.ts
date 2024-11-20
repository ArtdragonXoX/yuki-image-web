import { getFormat, getFormatSupport, addFormatSuppot, deleteFormatSupport } from '@/api/format';
import type { Format, FormatSupport } from '@/types/Format'

export const GetFormat = async (id: number | null) => {
    const response = await getFormat(id)
    type ApiResponse = { code: number; message: string; data?: Format[] | Format }
    const apiResponse = response.data as ApiResponse;
    if (response.status === 200) {
        if (apiResponse.code === 1) {
            return apiResponse.data || null;
        } else {
            const errorData = apiResponse ? apiResponse.data?.toString() : 'No data';
            throw new Error(`Error: ${apiResponse?.message.toString() || 'Unknown'}, ${errorData}`);
        }
    } else {
        throw new Error(`Error: ${apiResponse?.message.toString() || 'Unknown'}`);
    }
};

export const GetFormatSupport = async (id: number) => {
    const response = await getFormatSupport(id)
    type ApiResponse = { code: number; message: string; data?: Format[] }
    const apiResponse = response.data as ApiResponse
    if (response.status === 200) {
        if (apiResponse.code === 1) {
            return apiResponse.data || [];
        } else {
            const errorData = apiResponse ? apiResponse.data?.toString() : 'No data';
            throw new Error(`Error: ${apiResponse?.message.toString() || 'Unknown'}, ${errorData}`);
        }
    } else {
        throw new Error(`Error: ${apiResponse?.message.toString() || 'Unknown'}`);
    }
}

export const AddFormatSupport = async (data: FormatSupport) => {
    const response = await addFormatSuppot(data)
    type ApiResponse = { code: number; message: string }
    const apiResponse = response.data as ApiResponse
    if (response.status === 201) {
        if (apiResponse.code === 1) {
            return true;
        }
        return false;
    } else {
        throw new Error(`Error: ${apiResponse?.message.toString() || 'Unknown'}`);
    }
}

export const DeleteFormatSupport = async (data: FormatSupport) => {
    const response = await deleteFormatSupport(data)
    type ApiResponse = { code: number; message: string }
    const apiResponse = response.data as ApiResponse
    if (response.status === 200) {
        if (apiResponse.code === 1) {
            return true;
        }
        return false;
    } else {
        throw new Error(`Error: ${apiResponse?.message.toString() || 'Unknown'}`);
    }
}