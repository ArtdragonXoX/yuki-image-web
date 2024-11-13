import type { Format } from '@/types/Format';
import type { ImageList } from '@/types/Image';

export interface Album {
    create_time?: string;
    format_support?: Format[];
    id?: number;
    image?: ImageList;
    max_height?: number;
    max_width?: number;
    name?: string;
    update_time?: string;
    [property: string]: any;
}