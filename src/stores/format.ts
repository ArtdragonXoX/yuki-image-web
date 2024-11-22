import { getFormat, getFormatSupport, addFormatSuppot, deleteFormatSupport } from '@/api/format';
import type { Format, FormatSupport } from '@/types/Format'
import type { ApiResponse } from '@/types/misc';
export const GetFormat = async (id: number | null) => {
    const response = await getFormat(id)
    const { code, message, data } = response.data as ApiResponse<Format>;

    if (code === 1) {
        return data as Format | Format[];
    } else {
        throw new Error(`Error: ${message},${data}`);
    }
};

export const GetFormatSupport = async (id: number) => {
    const response = await getFormatSupport(id)
    const { code, message, data } = response.data as ApiResponse<FormatSupport[]>;
    if (code === 1) {
        return data as FormatSupport[];
    } else {
        throw new Error(`Error: ${message},${data}`);
    }
};

export const AddFormatSupport = async (body: FormatSupport) => {
    const response = await addFormatSuppot(body);
    const { code, message, data } = response.data as ApiResponse<null>
    if (code === 1) {
        return true;
    } else {
        throw new Error(`Error: ${message},${data}`);
    }
};

export const DeleteFormatSupport = async (body: FormatSupport) => {
    const response = await deleteFormatSupport(body);
    const { code, message, data } = response.data as ApiResponse<null>
    if (code === 1) {
        return true;
    } else {
        throw new Error(`Error: ${message},${data}`);
    }
};