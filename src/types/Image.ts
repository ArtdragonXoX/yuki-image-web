export interface Image {
    album_id: number;
    key: string;
    mimetype: string;
    name: string;
    origin_name: string;
    pathname: string;
    size: number;
    time: string;
    url: string;
    [property: string]: any;
}

export interface ImageList {
    image?: Image[] | null;
    page?: number;
    size?: number;
    total: number;
    [property: string]: any;
}