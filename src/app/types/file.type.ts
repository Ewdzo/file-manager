import { Category } from "./category.type";

export type File = {
    name: string;
    size: string;
    path: string;
    icon: string;
    banner: string;
    logo: string;
    description: string;
    categories: Category[];
}