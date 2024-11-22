import { getConfig, updateConfig, updateToken } from "@/api/system";
import type { ApiResponse } from "@/types/misc";
import type { Config } from "@/types/system";

export const GetConfig = async () => {
    const response = await getConfig();
    const res = response.data as ApiResponse<Config>;
    if (res.code === 1) {
        return res.data as Config;
    }
    else {
        throw new Error(`Error: ${res.message}, ${res.data}`);
    }
};

export const UpdateConfig = async (data: Config) => {
    const response = await updateConfig(data);
    const res = response.data as ApiResponse<string>;
    if (res.code === 1) {
        return res.data as string;
    }
    else {
        throw new Error(`Error: ${res.message}, ${res.data}`);
    }
}

export const UpdateToken = async () => {
    const response = await updateToken() as unknown as ApiResponse<string>;
    if (response.code === 1) return response.data;
    else throw new Error(`Error: ${response.message}, ${response.data}`)
}