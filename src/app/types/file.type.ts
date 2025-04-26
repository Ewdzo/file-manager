import { Tag } from "./tag.type";

export type File = {
    name: string;
    size: string;
    path: string;
    icon: string;
    banner: string;
    logo: string;
    description: string;
    tags: Tag[];
}