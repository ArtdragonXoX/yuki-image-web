import type { Format } from '@/types/Format';
import type { ImageList } from '@/types/Image';

export interface Album {
    format_support?: Format[];
    id?: number;
    name?: string;
    image?: ImageList;
    max_height?: number;
    max_width?: number;
    create_time?: string;
    update_time?: string;
    [property: string]: any;
}