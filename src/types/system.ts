export interface ServerConfig {
    port: string;
    token: string;
    [property: string]: any;
}
export interface DBConfig {
    max_open_conns: number;
    max_idle_conns: number;
    [property: string]: any;
}

export interface ImageConfig {
    auto_delete_tmp: boolean;
    compression_quality: number;
    image_list_defalut_size: number;
    key_length: number;
    max_size: number;
    path: string;
    url: string;
    [property: string]: any;
}

export interface Config {
    server: ServerConfig;
    db: DBConfig;
    image: ImageConfig;
    [property: string]: any;
}