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
  cast?: string[];
  score?: {
    imdb: string;
    letterboxd: string;
    rottentomatoes: string;
  };
  critics?: {
    specialized: {
      user: string;
      critic: string;
    }[];
    fans: {
      user: string;
      critic: string;
      rating: string;
    }[];
  };
};
