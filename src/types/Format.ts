export interface Format{
    id: number;
    name:string;
}

export interface FormatSupport {
    album_id?: number;
    album_name?: string;
    format_id?: number;
    format_name?: string;
    [property: string]: any;
}