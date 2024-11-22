import { getConfig, updateConfig, updateToken } from "@/api/system";
import type { ApiResponse } from "@/types/misc";
import type { Config } from "@/types/system";

export const GetConfig = async () => {
    const response = await getConfig();
    const {code,message,data} = response.data as ApiResponse<Config>;
    if (code === 1) {
        return data as Config;
    }
    else {
        throw new Error(`Error: ${message},${data}`);
    }
};

export const UpdateConfig = async (body: Config) => {
    const response = await updateConfig(body);
    const {code,message,data} = response.data as ApiResponse<Config>;
    if (code === 1) {
        return data as Config;
    }
    else {
        throw new Error(`Error: ${message},${data}`);
    }
}

export const UpdateToken = async () => {
    const {code,message,data} = await updateToken() as unknown as ApiResponse<string>;
    if (code === 1) return data as string;
    else throw new Error(`Error: ${message},${data}`);
}