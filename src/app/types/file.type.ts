import { Tag } from "./tag.type";
import { User } from "./user.type";

export type File = {
    name: string;
    size: string;
    path: string;
    icon: string;
    banner: string;
    logo: string;
    description: string;
    tags: Tag[];
    extension: Tag;
    owner: User;
    date: string;
}